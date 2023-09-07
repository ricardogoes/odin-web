import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CepData } from '../models/cep-data.model';

@Injectable({
  providedIn: 'root',
})
export class CEPService {
  constructor(
    private http: HttpClient
  ) {}

  findCEP(cep: string): Observable<CepData> {
    return this.http
      .get<any>(
        `https://viacep.com.br/ws/${cep.replace('-','')}/json`
      )
      .pipe(
        map((response) => JSON.parse(JSON.stringify(response)))
      );
  }
}
