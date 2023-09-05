export interface PaginatedApiResponse<T> {
  page_number: number;
  page_size: number;
  total_pages: number;
  total_records: number;
  items: T[];
}
