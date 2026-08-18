import api from "../../utils/api";

export type AvailableSlot = {
  id: number;
  date?: string;
  start_time?: string;
  end_time?: string;
  is_available?: boolean;
  service?: number;
  service_id?: number;
  employee_id?: number;
  employee_name?: string;
  [key: string]: unknown;
};

export const getAvailableTimes = async (
  date: string,
  serviceId: number,
): Promise<AvailableSlot[]> => {
  const response = await api.get("/business/available-times/", {
    params: {
      date,
      service_id: serviceId,
    },
  });

  const data = response.data;

  if (Array.isArray(data)) return data as AvailableSlot[];
  if (Array.isArray(data?.slots)) return data.slots;
  if (Array.isArray(data?.results)) return data.results;

  if (data && typeof data === "object") {
    return Object.entries(data).map(([key, value], index) => {
      if (value && typeof value === "object") {
        const v = value as AvailableSlot;
        return {
          ...v,
          id: typeof v.id === "number" ? v.id : index + 1,
          start_time: v.start_time ?? key,
        };
      }
      return {
        id: index + 1,
        start_time: key,
        is_available: Boolean(value),
      };
    });
  }

  return [];
};
