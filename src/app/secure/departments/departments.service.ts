import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Department } from './departments.model';
import { PaginatedApiResponse } from 'src/app/_shared/models/paginated-api-response.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(
    private http: HttpClient,
    @Inject('BASELINE_API_URL') public apiUrl: string,
    @Inject('CUSTOMER_ID') public customerId: string // TODO: Ajustar
  ) {}

  findAll(queryParams: string): Observable<PaginatedApiResponse<Department>> {
    return this.http
      .get<any>(`${this.apiUrl}/v1/customers/${this.customerId}/departments${queryParams}`)
      .pipe(
        map((response: any) => JSON.parse(JSON.stringify(response)))
    );
  }
}
