export interface Comment {
  id: number;
  target_type: "service" | "business";
  content: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
  user: number;
  service?: number;
  business?: number;
}
