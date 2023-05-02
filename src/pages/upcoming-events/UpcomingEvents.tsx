import firebase from "../../firebase/config";
import "mapbox-gl/dist/mapbox-gl.css";
import { Fragment, useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import image1 from "../../assets/images/aktivite1.jpeg";
import image2 from "../../assets/images/aktivite2.jpeg";
import image3 from "../../assets/images/aktivite3.jpeg";
import image4 from "../../assets/images/aktivite4.png";
import image5 from "../../assets/images/aktivite5.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { User } from "../../store/types";
import moment from "moment";

const key = process.env.REACT_APP_MAPBOX_TOKEN;
const initialSet = {
  info: "",
  createdAt: new Timestamp(0, 0),
  lat: 0,
  lng: 0,
  name: "",
  peopleCount: "",
  place: "",
  user: "",
  eventId: "",
  participants: [],
};

const images = [image1, image2, image3, image4, image5];
moment.locale("tr");

export default function UpcomingEvents() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [events, setEvents] = useState<typeof event[]>([]);
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState(initialSet);
  const [eventCreator, setEventCreator] = useState<User>(user);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const ref = firebase.firestore().collection(`events`);
  const refUser = firebase.firestore().collection("users");

  const handleClose = () => {
    setOpen(false);
  };

  function getEvents() {
    ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((snap) => {
        const createDate = new Date(snap.data().createdAt);
        const currentDate = new Date();
        console.log(moment(currentDate).isAfter(createDate));
        console.log(createDate.getTime() + " <-----> " + currentDate.getTime());
        if (createDate.getTime() > currentDate.getTime())
          setEvents((oldVal) => [...oldVal, snap.data() as typeof event]);
      });
    });
  }
  async function getUsersById(id: string) {
    const user = firebase.firestore().collection("users").doc(id).get();
    if ((await user).exists) {
      setEventCreator((await user).data() as User);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  if (!key) {
    throw new Error("token has not set");
  }

  const handleMarker = async (e: typeof initialSet) => {
    setEvent(e);
    await getUsersById(e.user);
    setOpen(true);
  };

  const handleJoinEvent = async () => {
    
    if (
      Number(event.peopleCount) > Number(event.participants.length) &&
      !event.participants.includes(user.id)
    ) {
      handleClose();
      setSuccess(true);
      await firebase
        .firestore()
        .doc(`/events/${event.eventId}`)
        .update({
          participants: [...event.participants, user.id],
        });
      refUser.doc(user.id).update({
        joined_events: firebase.firestore.FieldValue.arrayUnion({
          event_creator_id: event.user,
          event_creator: event.name,
          event_info: event.info,
          event_place: event.place,
          event_time: event.createdAt,
        }),
      });
    } else {
      handleClose();
      setError(true);
    }
  };

  return (
    <div className="map">
      <Map
        initialViewState={{
          longitude: 28.961076211616387,
          latitude: 41.02908049,
          zoom: 9.5,
        }}
        doubleClickZoom={false}
        style={{ width: "100vw", height: "100vh" }}
        mapboxAccessToken={key}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {events &&
          events.map((e, i: number) => (
            <Fragment>
              <Marker
                anchor="bottom"
                onClick={() => handleMarker(e)}
                color="black"
                latitude={e.lat}
                longitude={e.lng}
              />
            </Fragment>
          ))}
      </Map>
      {open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{event.info}</DialogTitle>
          <DialogContent>
            <img
              width="100%"
              height="50%"
              src={images[Math.floor(Math.random() * images.length)]}
              alt=""
            />
            <DialogContentText>
              <b>Etkinliği Düzenleyen Kişi</b>: {eventCreator.firstName}
            </DialogContentText>

            <DialogContentText>
              <b>Etkinlik Tarihi</b>: {moment(event.createdAt).format("LLLL")}
            </DialogContentText>

            <DialogContentText>
              <b>Kontenjan</b>: {Number(event.peopleCount)}
            </DialogContentText>

            <DialogContentText>
              <b>Katılan kişi sayısı</b>: {Number(event.participants.length)}
            </DialogContentText>

            <DialogContentText>
              <b>Yer</b>: {event.place}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleJoinEvent}>
              Etkinliğe Katıl
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {success && (
        <Dialog open={success} onClose={() => setSuccess(false)}>
          <DialogTitle>BİLDİRİM</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Etkinlik için katılımınız oluşturulmuştur
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}

      {error && (
        <Dialog open={error} onClose={() => setError(false)}>
          <DialogTitle>HATA</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bu etkinliğe katılım sağlanamamaktadır.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
