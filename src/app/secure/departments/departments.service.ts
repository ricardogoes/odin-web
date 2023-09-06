import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, StateKey, TransferState, makeStateKey } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Department } from './models/departments.model';
import { PaginatedApiResponse } from 'src/app/_shared/models/paginated-api-response.model';
import { DepartmentToInsertRequest } from './models/departments-insert.model';
import { DepartmentToUpdateRequest } from './models/departments-update.model';
import { DataStateService } from 'src/app/_shared/services/data-state.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {

  constructor(
    private dataStateService: DataStateService,
    private http: HttpClient,
    @Inject('BASELINE_API_URL') public apiUrl: string,
    @Inject('CUSTOMER_ID') public customerId: string // TODO: Ajustar
  ) {
  }

  findAll(queryParams: string): Observable<PaginatedApiResponse<Department>> {
    console.log('findAll');
    const url = `${this.apiUrl}/v1/customers/${this.customerId}/departments${queryParams}`;

    return this.dataStateService.checkAndGetData(
      url,
      this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response)))),
      []
    );
  }

  findById(departmentId: string): Observable<Department> {
    const url = `${this.apiUrl}/v1/departments/${departmentId}`;

    return this.dataStateService.checkAndGetData(
      url,
      this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response)))),
      []
    );
  }

  activate(departmentId: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/v1/departments/${departmentId}/status?action=ACTIVATE`,
      null,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  deactivate(departmentId: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/v1/departments/${departmentId}/status?action=DEACTIVATE`,
      null,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  update(departmentId: string, request: DepartmentToUpdateRequest): Observable<Department> {
    return this.http.put<any>(
      `${this.apiUrl}/v1/departments/${departmentId}`,
      JSON.stringify(request),
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  insert(request: DepartmentToInsertRequest): Observable<Department> {
    return this.http.post<any>(
      `${this.apiUrl}/v1/departments`,
      JSON.stringify(request),
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }
}
