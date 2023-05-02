import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import "./PastEvent.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FestivalIcon from "@mui/icons-material/Festival";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
export default function PasttEvents() {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const [pastEvent, setpastEvent] =
    useState<{ event: string; event_info: string }[]>();
  const [pastEventInfo, setPastEventInfo] = useState<object[]>([]);

  if (currentUser?.joined_events) {
    return (
      <div>
        {console.log(currentUser.joined_events)}
        <div className="cardPastEvent">
          {currentUser &&
            currentUser.joined_events.map((e, i) => (
              <div>
                <Card sx={{ width: "100%", maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {e.event_info}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <FestivalIcon className="iconss" /> {e.event_place}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <AccessTimeIcon /> {e.event_time}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="uyarı">
      <Typography sx={{ marginBottom: 3 }} variant="h4">
        Katıldığınız Herhangi Bir Etkinlik Bulunmamaktadır
      </Typography>
    </div>
  );
}
