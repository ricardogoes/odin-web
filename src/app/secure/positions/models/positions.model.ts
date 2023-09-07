export interface Position {
  id: string;
  customer: {id: string, name: string};
  name: string;
  base_salary?: number;
  is_active: boolean;
  created_at: Date;
  created_by: string;
  last_updated_at: Date;
  last_updated_by: string;
}
