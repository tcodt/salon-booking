import { ReservationRequest } from "../../types/appointments";
import api from "../../utils/api";

export const addAppointment = async (bookingData: ReservationRequest) => {
  const payload: ReservationRequest = {
    service_id: bookingData.service_id,
    employee_id: bookingData.employee_id,
    time_slot_id: bookingData.time_slot_id,
  };

  // Only send status if caller set it
  if (bookingData.status) {
    payload.status = bookingData.status;
  }

  const response = await api.post("/reservations/my-appointments/", payload);
  return response.data;
};
