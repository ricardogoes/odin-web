import { Address } from "src/app/_shared/models/address.model";

export interface Employee {
  id: string;
  customer: {id: string, name: string};
  department?: {id: string, name: string};
  department_name?: string;
  first_name: string;
  last_name: string;
  fullname: string;
  document: string;
  email: string;
  address?: Address;
  is_active: boolean;
  created_at: Date;
  created_by: string;
  last_updated_at: Date;
  last_updated_by: string;
}
