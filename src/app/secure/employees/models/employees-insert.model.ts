export interface EmployeeToInsertRequest {
  customer_id: string;
  department_id?: string;
  first_name: string;
  last_name: string;
  document: string;
  email: string;
  logged_username: string;
}
