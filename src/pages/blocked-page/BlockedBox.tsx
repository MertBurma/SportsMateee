import { Avatar, Box, IconButton, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import "./BlockedList.css";
import firebase from "../../firebase/config";
import {useSelector} from "react-redux";
import {RootState} from "../../store";


interface BlockedProps {
    img?: string;
    username: string;

}

export default function BlockedBox(props: BlockedProps) {
    const { img, username} = props;




    return (
        <Box borderRadius={2} boxShadow={3} className="single-user-list">
            <div className="user-list-left">
                <Avatar src={img} />
                <Typography sx={{ marginLeft: 2 }} variant="body2">
                    {username}

                </Typography>
            </div>

            <div className="user-list-right">
                <IconButton color="error">

                </IconButton>
            </div>
        </Box>
    );
}
