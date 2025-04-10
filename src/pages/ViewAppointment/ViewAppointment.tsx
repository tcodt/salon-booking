import React from "react";
import { useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import { useServiceById } from "../../hooks/services/useServiceById";

const ViewAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const appointmentId = Number(id);
  const { data: appointmentData, isPending } = useServiceById(appointmentId);

  console.log(appointmentData);
  if (isPending) return <Loading />;

  return <div>ViewAppointment</div>;
};

export default ViewAppointment;
