import React from "react";
import { useServices } from "../../hooks/useBooking";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";

const ManageEmployees: React.FC = () => {
  const { data: services, isPending, isError, error } = useServices();

  if (isPending) return <Loading />;

  if (isError) {
    toast.error("مشکلی پیش آمد!");
    console.log(error);
  }

  console.log(services);

  return <div>ManageEmployees</div>;
};

export default ManageEmployees;
