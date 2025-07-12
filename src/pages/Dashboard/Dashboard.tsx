import React from "react";
import { useGetDashboardToday } from "../../hooks/dashboard/useGetDashboardToday";

const Dashboard: React.FC = () => {
  const { data, error, isError } = useGetDashboardToday();

  console.log("Dashboard Data: ", data);

  if (isError) return <div>{error.message}</div>;

  return <div>Dashboard</div>;
};

export default Dashboard;
