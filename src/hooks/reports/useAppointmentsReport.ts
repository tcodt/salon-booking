import { useQuery } from "@tanstack/react-query";
import { appointmentsReport } from "../../services/reports/appointmentsReport";

export const useAppointmentsReport = () => {
  return useQuery({
    queryKey: ["appointments-report"],
    queryFn: appointmentsReport,
  });
};
