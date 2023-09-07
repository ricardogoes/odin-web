import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from './models/employees.model';
import { PaginatedApiResponse } from 'src/app/_shared/models/paginated-api-response.model';
import { EmployeeToInsertRequest } from './models/employees-insert.model';
import { EmployeeToUpdateRequest } from './models/employees-update.model';
import { DataStateService } from 'src/app/_shared/services/data-state.service';
import { AddressRequest } from './models/address-request.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {

  constructor(
    private dataStateService: DataStateService,
    private http: HttpClient,
    @Inject('BASELINE_API_URL') public apiUrl: string,
    @Inject('CUSTOMER_ID') public customerId: string // TODO: Ajustar
  ) {
  }

  findAll(queryParams: string): Observable<PaginatedApiResponse<Employee>> {
    console.log('findAll');
    const url = `${this.apiUrl}/v1/customers/${this.customerId}/employees${queryParams}`;

    return this.dataStateService.checkAndGetData(
      url,
      this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response)))),
      []
    );
  }

  findById(employeeId: string): Observable<Employee> {
    const url = `${this.apiUrl}/v1/employees/${employeeId}`;

    return this.dataStateService.checkAndGetData(
      url,
      this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response)))),
      []
    );
  }

  activate(employeeId: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/v1/employees/${employeeId}/status?action=ACTIVATE`,
      null,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  deactivate(employeeId: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/v1/employees/${employeeId}/status?action=DEACTIVATE`,
      null,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  update(departmentId: string, request: EmployeeToUpdateRequest): Observable<Employee> {
    return this.http.put<any>(
      `${this.apiUrl}/v1/employees/${departmentId}`,
      JSON.stringify(request),
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  insert(request: EmployeeToInsertRequest): Observable<Employee> {
    return this.http.post<any>(
      `${this.apiUrl}/v1/employees`,
      JSON.stringify(request),
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  changeAddress(departmentId: string, request: AddressRequest): Observable<Employee> {
    return this.http.put<any>(
      `${this.apiUrl}/v1/employees/${departmentId}/addresses`,
      JSON.stringify(request),
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }
}
