import React from "react";

import "./IndexSidebar.css";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

interface ItemProps {
  navLink: string;
  icon: React.ReactNode;
  itemText: string;
}

export default function SidebarItem(props: ItemProps) {
  const { navLink, icon, itemText } = props;

  return (
    
      <Link className="sidebar-title" to={navLink}>
        <ListItem className="sidebar-list-item" disablePadding={true}>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText
              className="sidebar-list-item-text"
              primary={itemText}
            />
          </ListItemButton>
        </ListItem>
      </Link>
  );
}
