import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Position } from './models/positions.model';
import { PaginatedApiResponse } from 'src/app/_shared/models/paginated-api-response.model';
import { PositionToInsertRequest } from './models/positions-insert.model';
import { PositionToUpdateRequest } from './models/positions-update.model';
import { DataStateService } from 'src/app/_shared/services/data-state.service';

@Injectable({
  providedIn: 'root',
})
export class PositionsService {

  constructor(
    private dataStateService: DataStateService,
    private http: HttpClient,
    @Inject('BASELINE_API_URL') public apiUrl: string,
    @Inject('CUSTOMER_ID') public customerId: string // TODO: Ajustar
  ) {
  }

  findAll(queryParams: string): Observable<PaginatedApiResponse<Position>> {
    console.log('findAll');
    const url = `${this.apiUrl}/v1/customers/${this.customerId}/positions${queryParams}`;

    return this.dataStateService.checkAndGetData(
      url,
      this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response)))),
      []
    );
  }

  findById(positionId: string): Observable<Position> {
    const url = `${this.apiUrl}/v1/positions/${positionId}`;

    return this.dataStateService.checkAndGetData(
      url,
      this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response)))),
      []
    );
  }

  activate(positionId: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/v1/positions/${positionId}/status?action=ACTIVATE`,
      null,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  deactivate(positionId: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/v1/positions/${positionId}/status?action=DEACTIVATE`,
      null,
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  update(positionId: string, request: PositionToUpdateRequest): Observable<Position> {
    return this.http.put<any>(
      `${this.apiUrl}/v1/positions/${positionId}`,
      JSON.stringify(request),
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }

  insert(request: PositionToInsertRequest): Observable<Position> {
    return this.http.post<any>(
      `${this.apiUrl}/v1/positions`,
      JSON.stringify(request),
      { headers: new HttpHeaders().set('Content-Type', 'application/json') }
    );
  }
}
