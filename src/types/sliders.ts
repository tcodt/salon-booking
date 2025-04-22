export interface SliderItems {
  id: number;
  title: string;
  sub_title: string;
  is_active: boolean;
  created_at: string;
}

export type SliderResponse = SliderItems[];
