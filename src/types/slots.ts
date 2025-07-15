export interface SlotsResponse {
  id: number;
  date: string;
  start_time: string;
  is_available: boolean;
  service: number;
}

export interface SlotsRequest {
  date: string;
  start_time: string;
  is_available: boolean;
  service: number;
}
