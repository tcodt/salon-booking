import React from "react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { useUserProfile } from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import { FaRegCreditCard, FaUser, FaUserAlt } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { logoutUser } from "../../services/authService";
import { Outlet, useNavigate } from "react-router";
import { Button, Menu, MenuItem } from "@mui/material";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineManageSearch } from "react-icons/md";
import { CiBag1 } from "react-icons/ci";

const Dashboard: React.FC = () => {
  const { data: user, isPending, isError, error, refetch } = useUserProfile();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  if (isPending) return <Loading />;

  if (isError) {
    console.log(error);
    return (
      <div className="text-red-500">
        {" "}
        <button className="text-blue-500" onClick={() => refetch()}>
          بارگذاری دوباره
        </button>{" "}
        خطا در بارگذاری اطلاعات
      </div>
    );
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <section className="p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {open ? (
                <IoClose color="gray" size={30} />
              ) : (
                <LuMenu color="gray" size={30} />
              )}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              // sx={{ width: "200px" }}
            >
              <MenuItem
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                {" "}
                <FaUserAlt size={20} color="gray" /> پروفایل
              </MenuItem>
              <MenuItem
                onClick={() => navigate("user-profile")}
                className="flex items-center gap-2"
              >
                <MdOutlineManageSearch size={20} color="gray" /> مدیریت رزرو
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                {" "}
                <CiBag1 size={20} color="gray" /> کیف پول من
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                className="flex items-center gap-2"
              >
                {" "}
                <FaRegCreditCard size={20} color="gray" /> گزارشات مالی
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <TbLogout2 size={20} color="gray" /> خروج
              </MenuItem>
            </Menu>
          </div>

          <ThemeToggle />
        </div>
        <div className="p-2 bg-white shadow-md border-2 border-orange-500 rounded-full">
          <FaUser className="w-10 h-10 text-gray-500" />
        </div>
      </div>

      {/* Sub Routes */}
      <Outlet />
    </section>
  );
};

export default Dashboard;
