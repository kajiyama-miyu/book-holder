import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Divider,
} from "@material-ui/core";
import {
  Home,
  Search,
  Favorite,
  TrendingUp,
  ExitToApp,
} from "@material-ui/icons";
import { useCallback } from "react";
import React from "react";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
};

const SideMenu: React.FC<Props> = (props) => {
  const router = useRouter();
  const { isOpen, handleOpen } = props;

  const changeLink = useCallback(
    (url: string) => {
      router.push(url);
    },
    [handleOpen]
  );

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const menus = [
    { label: "Home", icon: <Home />, id: "home", url: "/home" },
    { label: "Search", icon: <Search />, id: "search", url: "/search-book" },
    { label: "Favorite", icon: <Favorite />, id: "favorite", url: "/favorite" },
    { label: "TrendUp", icon: <TrendingUp />, id: "trend", url: "/trend" },
  ];

  return (
    <Drawer anchor={"left"} open={isOpen} onClose={() => handleOpen(false)}>
      <div
        onClick={() => handleOpen(false)}
        onKeyDown={() => handleOpen(false)}
        className="w-56"
      >
        <Link>
          <ListItem button onClick={() => handleLogout()}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </Link>
        <Divider />
        <List>
          {menus.map((menu) => (
            <ListItem button key={menu.id} onClick={() => changeLink(menu.url)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default SideMenu;
