export interface SliderItems {
  id: number;
  title: string;
  sub_title: string;
  image?: File | string;
  is_active: boolean;
  created_at: string;
}

export type SliderResponse = SliderItems[];
