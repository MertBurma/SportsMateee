import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RootState } from "../../store";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import AccountCircle from "@mui/icons-material/AccountCircle";
import firebase from "../../firebase/config";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import "./Profile.css";
import WcIcon from "@mui/icons-material/Wc";
import HeightIcon from "@mui/icons-material/Height";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import {
  Typography,
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Input,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import "./Profile.css";
import MapBox, { AddressMinimap, SearchBox } from "@mapbox/search-js-react";
import Loader from "../loader/Loader";
import { SuggestionResponse, RetrieveResponse } from "@mapbox/search-js-core";
import { useNavigate } from "react-router-dom";
const key = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Profile() {
  const storage = getStorage();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>(user?.firstName!);
  const [email, setEmail] = useState<string>(user?.email!);
  const [addressString, setAddressString] = useState<string>();
  const [gender, setGender] = useState<string>(user?.gender!);
  const [phoneNumber, setPhoneNumber] = useState<string>(user?.phoneNumber!);
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [image, SetImage] = useState<any | null>("");

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await firebase
        .firestore()
        .collection(`users`)
        .doc(user?.id)
        .update({
          email: email,
          firstName: firstName,
          address: {
            location: user.address.location,
            coordinates: {
              lng: user.address.coordinates.lng,
              ltd: user.address.coordinates.ltd,
            },
          },
          height: height,
          gender: gender,
          phoneNumber: phoneNumber,
          weight: weight,
        });
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (image) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${image.name}`
        );
        // @ts-ignore
        const snap = await uploadBytes(imgRef, image);
        const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

        await updateDoc(doc(firebase.firestore(), "users", user.id), {
          avatar: url,
          avatarPath: snap.ref.fullPath,
        });
        SetImage("");
        console.log(snap.ref.fullPath);
        console.log(url);
      };
      uploadImg();
    }
  }, [image]);

  if (!key) {
    throw new Error("Map access key is missing...");
  }

  console.log(user.address.location);

  if (user) {
    return (
      <div>
        <Box component="form" onSubmit={handleUpdate}>
          <Typography variant="h3">Düzenle</Typography>
          <div>
            <div className="container">
              <div className="container-left">
                <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
                  <AccountCircle
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    value={firstName}
                    id="name"
                    label="İsim"
                    variant="standard"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFirstName(e.target.value)
                    }
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
                  <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    id="Email"
                    label="Email"
                    variant="standard"
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
                  <PhoneIphoneIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    id="input-with-sx"
                    label="Telefon Numarası"
                    variant="standard"
                    value={phoneNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPhoneNumber(e.target.value)
                    }
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
                  <AddLocationIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <Typography>{user?.address?.location}</Typography>
                  <Button onClick={() => navigate("/map")}>Adres Seç</Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
                  <HeightIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    id="input-with-sx"
                    label="Boy"
                    variant="standard"
                    value={height}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setHeight(e.target.value)
                    }
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
                  <MonitorWeightIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    id="input-with-sx"
                    label="Ağırlık"
                    variant="standard"
                    value={weight}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setWeight(e.target.value)
                    }
                  />
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "flex-end", mb: 3, ml: 1 }}
                >
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Cinsiyet
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Kadın"
                        control={<Radio />}
                        label="Kadın"
                      />
                      <FormControlLabel
                        value="Erkek"
                        control={<Radio />}
                        label="Erkek"
                      />
                      <FormControlLabel
                        value="Diğer"
                        control={<Radio />}
                        label="Diğer"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <div className="butonn">
                  <Button type="submit" variant="contained">
                    Güncelle
                  </Button>
                </div>
              </div>

              <div className="container-right">
                <div className="dadd">
                  <img src={user.avatar} className="profilePic" alt="" />

                  <label htmlFor="icon-button-file">
                    <input
                      className="fotoyükleme"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="photo"
                      type="file"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SetImage(e.target.files[0])
                      }
                    />
                  </label>

                  <div className="butonn">
                    <Button variant="contained">
                      <Input
                        className="fotoyükleme"
                        id="icon-button-file"
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          SetImage(e.target.files[0])
                        }
                      ></Input>
                      <PhotoCameraIcon className="icons" />
                      Yükle
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
    );
  }

  return <Loader />;
}
