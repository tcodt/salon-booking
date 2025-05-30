export interface WorkTimeType {
  id: number;
  day: string;
  opening_time: string;
  closing_time: string;
}

export type WorkTimePromise = WorkTimeType[];

export interface WorkingTimePost {
  day: string;
  opening_time: string;
  closing_time: string;
}
