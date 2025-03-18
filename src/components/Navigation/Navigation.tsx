import React, { useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { LuNotebookText } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router";

const Navigation: React.FC = () => {
  const [value, setValue] = useState<number>(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setValue(0);
        break;
      case "/home":
        setValue(1);
        break;
      case "/reserve":
        setValue(2);
        break;
      default:
        setValue(1);
    }
  }, [location.pathname]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
          switch (newValue) {
            case 0:
              navigate("/dashboard");
              break;
            case 1:
              navigate("/home");
              break;
            case 2:
              navigate("/reserve");
              break;
            default:
              navigate("/home");
          }
        }}
        sx={{
          "& .Mui-selected": {
            color: "orange !important", // تغییر رنگ متن و آیکون آیتم فعال به نارنجی
          },
        }}
      >
        <BottomNavigationAction
          label="داشبورد"
          icon={<FaRegUser size={25} color={value === 0 ? "orange" : "gray"} />}
          sx={{ color: value === 0 ? "orange" : "gray" }}
        />
        <BottomNavigationAction
          label="خانه"
          icon={
            <GrHomeRounded size={25} color={value === 1 ? "orange" : "gray"} />
          }
          sx={{ color: value === 1 ? "orange" : "gray" }}
        />
        <BottomNavigationAction
          label="رزرو"
          icon={
            <LuNotebookText size={25} color={value === 2 ? "orange" : "gray"} />
          }
          sx={{ color: value === 2 ? "orange" : "gray" }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;
