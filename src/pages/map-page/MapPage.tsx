import firebase from "../../firebase/config";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ChangeEvent, useEffect, useState } from "react";
import { Map, Marker, Popup } from "react-map-gl";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./MapPage.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import moment from "moment";
import { FeatureCollection } from "geojson";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const key = process.env.REACT_APP_MAPBOX_TOKEN;

export default function MapPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showPopup, setShowPopup] = useState(false);
  const [lat, setLat] = useState<number>(user.address.coordinates.ltd);
  const [lng, setLng] = useState<number>(user.address.coordinates.lng);
  const [place, setPlace] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);

  const handleAddClick = (e: mapboxgl.MapMouseEvent) => {
    console.log(e);
    setShowPopup(false);

    setLat(e.lngLat.lat);
    setLng(e.lngLat.lng);

    setShowPopup(true);
  };

  const setAddress = () => {
    console.log(place[8]);
    firebase
      .firestore()
      .collection(`/users/`)
      .doc(user.id)
      .update({
        address: {
          location: place[6],
          coordinates: { lng: place[7][0], ltd: place[7][1] },
        },
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

  console.log(place);

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
        {lng && lat && <Marker color="red" longitude={lng} latitude={lat} />}
        {showPopup && (
          <Popup maxWidth="500px" longitude={lng} latitude={lat} offset={15}>
            <Box>
              <Typography>{place[6]}</Typography>
              <Button onClick={setAddress}>Adresim olarak seç</Button>
            </Box>
          </Popup>
        )}
      </Map>
      {success && (
        <Dialog open={success} onClose={() => setSuccess(false)}>
          <DialogTitle>
            <b>BİLDİRİM</b>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Adresiniz Başarıyla Ayarlanmıştır
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
