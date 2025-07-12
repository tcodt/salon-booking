export type DashboardResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: number;
    status: string;
    user: number;
    service: {
      id: number;
      name: string;
      price: string;
      description: string;
      duration: string;
      business: {
        id: number;
        name: string;
        business_type: string;
        address: string;
        telephone_number: string;
        phone_number: string;
        is_coffee_shop: boolean;
        is_parking: boolean;
        instagram_link: string;
        owner: number;
      };
      employee: {
        id: number;
        user: {
          id: number;
          first_name: string;
          last_name: string;
          phone_number: string;
          is_owner: boolean;
          is_active: boolean;
          is_staff: boolean;
          image: string;
        };
        skill: string;
      };
    };
    employee: {
      id: number;
      user: {
        id: number;
        first_name: string;
        last_name: string;
        phone_number: string;
        is_owner: boolean;
        is_active: boolean;
        is_staff: boolean;
        image: string;
      };
      skill: string;
    };
    get_status: string;
    employee_name: string;
  }>;
};
