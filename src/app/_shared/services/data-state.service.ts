import { Injectable, PLATFORM_ID, Inject, TransferState, makeStateKey, StateKey } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataStateService {

  private isServer = false;

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isServer = isPlatformServer(platformId);
  }

  checkAndGetData(url: string, getDataObservable: Observable<any>, defaultValue: any = []) {
    const key = makeStateKey(url);

    if (this.transferState.hasKey(key)) {
      return of(this.transferState.get(key, defaultValue));
    } else {
      return getDataObservable.pipe(
        tap((data) => {
          if (this.isServer) {
            this.transferState.set(key, data);
          }
        })
      );
    }
  }

  getDynamicStateKey(key: string) {
    return makeStateKey(key);
  }
}
