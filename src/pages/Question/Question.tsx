import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import firebase from "../../firebase/config";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "./Question.css";
import { doc, updateDoc } from "firebase/firestore";
import { RootState } from "../../store";

export default function Question() {
  const [question1, setQuestion1] = useState("false");
  const [question2, setQuestion2] = useState("false");
  const [question3, setQuestion3] = useState("false");
  const [question4, setQuestion4] = useState("false");
  const [question5, setQuestion5] = useState("false");
  const [question6, setQuestion6] = useState("false");
  const [question7, setQuestion7] = useState("false");
  const [question8, setQuestion8] = useState("false");
  const [question9, setQuestion9] = useState("false");
  const [question10, setQuestion10] = useState("false");

  const [allQuestion, setAllQuestion] = useState([]);

  const { user } = useSelector((state: RootState) => state.auth);
  const ref = firebase.firestore().collection("users");

  function answerQuestion() {
    ref.doc(user.id).update({
      answer: firebase.firestore.FieldValue.arrayUnion({
        user: user.id,
        question1,
        question2,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8,
        question9,
        question10,
      }),
    });
  }


  return (
    <div>
      <Typography variant="h3">Sorular</Typography>
      <div className="parent">
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    1. Soru
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Yürüyüş Yapmayı Sever misin ?
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                CEVABINIZ
              </Typography>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={question1}
                    onChange={(e) => setQuestion1(e.target.value)}
                  >
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="Evet"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="Hayır"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </div>
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    2. Soru
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Tütün Ürünleri Kullanıyor musunuz ?
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                CEVABINIZ
              </Typography>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={question2}
                    onChange={(e) => setQuestion2(e.target.value)}
                  >
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="Evet"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="Hayır"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </div>
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    3. Soru
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Öğrenci misin ?
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                CEVABINIZ
              </Typography>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={question3}
                    onChange={(e) => setQuestion3(e.target.value)}
                  >
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="Evet"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="Hayır"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </div>
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    4. Soru
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Çalışıyor Musun ?
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                CEVABINIZ
              </Typography>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={question4}
                    onChange={(e) => setQuestion4(e.target.value)}
                  >
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="Evet"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="Hayır"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </div>
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    5. Soru
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Profesyonel olarak bir spor geçmişiniz var mı ?
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                CEVABINIZ
              </Typography>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={question5}
                    onChange={(e) => setQuestion5(e.target.value)}
                  >
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="Evet"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="Hayır"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </div>
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    6. Soru
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Favori Sporunuz ?
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                CEVABINIZ
              </Typography>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={question6}
                    onChange={(e) => setQuestion6(e.target.value)}
                  >
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="Futbol"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="Basketbol"
                    />
                    <FormControlLabel
                      value="c"
                      control={<Radio />}
                      label="Voleybol"
                    />
                    <FormControlLabel
                      value="d"
                      control={<Radio />}
                      label="Yürüyüş/Koşu"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </div>
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    7. Soru
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Spor yapmaktan en hoşlandığınız mekan ?
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                CEVABINIZ
              </Typography>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={question7}
                    onChange={(e) => setQuestion7(e.target.value)}
                  >
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="Sahil"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="Park"
                    />
                    <FormControlLabel
                      value="c"
                      control={<Radio />}
                      label="Spor Salonu"
                    />
                    <FormControlLabel
                      value="d"
                      control={<Radio />}
                      label="Sokak"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </div>
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    8. Soru
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Hedefiniz Nedir ?
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                CEVABINIZ
              </Typography>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={question8}
                    onChange={(e) => setQuestion8(e.target.value)}
                  >
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="Kilo Almak"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="Kilo Vermek"
                    />
                    <FormControlLabel
                      value="c"
                      control={<Radio />}
                      label="Vücut Geliştirme"
                    />
                    <FormControlLabel
                      value="d"
                      control={<Radio />}
                      label="Hobi Edinmek"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </div>
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    9. Soru
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Haftalık kaç saat spor yapıyorsunuz ?
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                CEVABINIZ
              </Typography>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={question9}
                    onChange={(e) => setQuestion9(e.target.value)}
                  >
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="0-5"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="5-10"
                    />
                    <FormControlLabel
                      value="c"
                      control={<Radio />}
                      label="10-15"
                    />
                    <FormControlLabel
                      value="d"
                      control={<Radio />}
                      label="15-20"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </div>
        <div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    10. Soru
                  </Typography>
                </Grid>
              </Grid>
              <Typography color="text.secondary" variant="body2">
                Aktivite yapmak istediğiniz kişinin yaş aralığı nedir ?
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ m: 2 }}>
              <Typography gutterBottom variant="body1">
                CEVABINIZ
              </Typography>
              <Stack direction="row" spacing={1}>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={question10}
                    onChange={(e) => setQuestion10(e.target.value)}
                  >
                    <FormControlLabel
                      value="a"
                      control={<Radio />}
                      label="18-20"
                    />
                    <FormControlLabel
                      value="b"
                      control={<Radio />}
                      label="20-30"
                    />
                    <FormControlLabel
                      value="c"
                      control={<Radio />}
                      label="30-40"
                    />
                    <FormControlLabel
                      value="d"
                      control={<Radio />}
                      label="40+"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>
          </Box>
        </div>
        <Button variant="contained" onClick={answerQuestion}>
          {" "}
          GÜNCELLE{" "}
        </Button>
      </div>
    </div>
  );
}
