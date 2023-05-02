import "./IndexSidebar.css";

import FaceIcon from "@mui/icons-material/Face";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ChatIcon from "@mui/icons-material/Chat";
import BlockIcon from "@mui/icons-material/Block";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HistoryIcon from "@mui/icons-material/History";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import { List, Typography } from "@mui/material";
import SidebarItem from "./SidebarItem";

export default function IndexSidebar() {
  return (
    <div className="sidebar">
      <nav className="sidebar-wrapper">
        {options.map((o, i) => (
          <List className="sidebar-menu" key={"title" + i}>
            <Typography>{o.title}</Typography>
            {o.subOptions.map((s, k) => (
              <SidebarItem
                key={"item" + k}
                navLink={s.link}
                icon={s.icon}
                itemText={s.itemTitle}
              />
            ))}
          </List>
        ))}
      </nav>
    </div>
  );
}

const options = [
  {
    title: "Keşfet",
    subOptions: [
      
      {
        itemTitle: "Arkadaş Bul",
        link: "/find-friend",
        icon: <PersonAddIcon />,
      },
      {
        itemTitle: "Arkadaşlar",
        link: "/friends",
        icon: <PeopleIcon />,
      },
    ],
  },
  {
    title: "Etkinlik",
    subOptions: [
      
      { itemTitle: "Yaklaşan Etkinlikler", link: "/upcoming-events", icon: <EventNoteIcon /> },
      { itemTitle: "Etkinlik Oluştur", link: "/create-event", icon: <EventAvailableIcon /> },
      { itemTitle: "Geçmiş Etkinlikler", link: "/past-events", icon: <HistoryIcon /> },
    ],
  },

  {
    title: "Arkadaşlar",
    subOptions: [
      { itemTitle: "Sohbet", link: "/chat", icon: <ChatIcon /> },
      { itemTitle: "Engellenenler", link: "/blockedUser", icon: <BlockIcon /> },
    ],
  },

  {
    title: "Ayarlar",
    subOptions: [
      { itemTitle: "Profil", link: "/account", icon: <FaceIcon /> },
      { itemTitle: "Profili Güncelle", link: "/profile-update", icon: <ManageAccountsIcon /> },
      { itemTitle: "Sorular", link: "/question", icon: <QuestionMarkIcon/> },
    ],
  },
];
