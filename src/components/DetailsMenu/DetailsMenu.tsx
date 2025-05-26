import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsThreeDotsVertical } from "react-icons/bs";

interface MenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface DetailsMenuProps {
  menuItems: MenuItem[];
}

const DetailsMenu: React.FC<DetailsMenuProps> = ({ menuItems }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ direction: "flex", justifyContent: "end" }}
      >
        <BsThreeDotsVertical
          size={20}
          className="text-gray-500 dark:text-white"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          className: "bg-white dark:bg-gray-800",
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
            sx={{
              fontSize: "14px",
              direction: "flex",
              gap: "5px",
            }}
            className="dark:text-white"
          >
            {item.icon && <span style={{ fontSize: "20px" }}>{item.icon}</span>}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DetailsMenu;
