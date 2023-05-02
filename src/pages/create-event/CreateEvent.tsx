import firebase from "../../firebase/config";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Map, Marker, Popup } from "react-map-gl";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./CreateEvent.css";
import { Box, Button, TextField } from "@mui/material";
import moment from "moment";
import { FeatureCollection } from "geojson";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const key = process.env.REACT_APP_MAPBOX_TOKEN;
const dateTime = new Date();
const usersRef = firebase.firestore().collection("users");

export default function CreateEventPage() {
  const id = uuidv4();
  const { user } = useSelector((state: RootState) => state.auth);
  const [showPopup, setShowPopup] = useState(false);
  const [lat, setLat] = useState(41.00908049);
  const [lng, setLng] = useState(28.96107621);
  const [place, setPlace] = useState<any[]>([]);
  const [description, setDescription] = useState("");
  const [peopleCount, setPeopleCount] = useState("2");
  const [date, setDate] = useState<Date | null | string>(dateTime);
  const [success, setSuccess] = useState(false);

  const handleAddClick = (e: mapboxgl.MapMouseEvent) => {
    console.log(e);
    setShowPopup(false);

    setLat(e.lngLat.lat);
    setLng(e.lngLat.lng);

    setShowPopup(true);
  };

  const createEvent = () => {
    firebase
      .firestore()
      .doc(`/events/${id}`)
      .set({
        user: user!.id,
        name: user!.firstName,
        lng: lng,
        lat: lat,
        info: description,
        peopleCount: peopleCount,
        place: place[6],
        createdAt: date,
        eventId: id,
        participants: [user.id],
      });

    usersRef.doc(user.id).update({
      created_events: firebase.firestore.FieldValue.arrayUnion({
        event: id,
        event_info: description,
      }),
    });

    setSuccess(true);
  };

  const getMarkerInfo = async (lngtd: number, latd: number) => {
    await fetch(
      `http://api.mapbox.com/geocoding/v5/mapbox.places/${lngtd},${latd}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=${key}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data: FeatureCollection) =>
        setPlace(Object.values(data.features[0]))
      );
  };

  useEffect(() => {
    getMarkerInfo(lng, lat);
  }, [lng, lat]);

  if (!key) {
    throw new Error("token has not set");
  }

  return (
    <div className="map">
      <Map
        initialViewState={{
          longitude: 28.961076211616387,
          latitude: 41.02908049,
          zoom: 9.5,
        }}
        doubleClickZoom={false}
        onDblClick={handleAddClick}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={key}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker color="red" longitude={lng} latitude={lat} />
        {showPopup && (
          <Popup maxWidth="500px" longitude={lng} latitude={lat} offset={15}>
            <Box>
              <TextField
                sx={{ color: "black" }}
                value={place[6]}
                fullWidth
                variant="outlined"
                type="text"
              />

              <TextField
                sx={{ marginTop: 5, left: 0, color: "black" }}
                label="Açıklama"
                id="event-desc"
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.currentTarget.value)
                }
              />

              <TextField
                type="datetime-local"
                defaultValue={moment(date).format("MM/DD/YYYY, HH:mm")}
                sx={{ marginTop: 5, marginLeft: 10, color: "black" }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDate(moment(e.target.value).format("MM/DD/YYYY, HH:mm"))
                }
                inputProps={{
                  min: new Date().toISOString().slice(0, 16),
                }}
              />

              <TextField
                sx={{ marginTop: 5, color: "black" }}
                value={peopleCount}
                label="Kişi Sayısı"
                id="event-desc"
                inputProps={{
                  min: 2,
                }}
                type="number"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPeopleCount(e.target.value)
                }
              />

              <Button
                onClick={createEvent}
                sx={{ marginTop: 6.25, marginLeft: 12 }}
                variant="contained"
              >
                Etkinlik Oluştur
              </Button>
            </Box>
          </Popup>
        )}
      </Map>
      {success && (
        <Dialog open={success} onClose={() => setSuccess(false)}>
          <DialogTitle>BİLDİRİM</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Etkinlik başarıyla oluşturulmuştur
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
