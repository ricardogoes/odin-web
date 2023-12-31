export interface Department {
  id: string;
  customer: {id: string, name: string};
  name: string;
  is_active: boolean;
  created_at: Date;
  created_by: string;
  last_updated_at: Date;
  last_updated_by: string;
}
