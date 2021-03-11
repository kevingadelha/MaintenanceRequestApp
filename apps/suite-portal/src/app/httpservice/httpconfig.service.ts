import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { MaintenanceRequest } from '@suiteportal/api-interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class HTTPConfigService {
  constructor(private http: HttpClient) { }
  apiUrl = 'api/maintenance-requests';

  addMaintenanceRequest(maintenanceRequest: MaintenanceRequest): Observable<MaintenanceRequest> {
    console.warn(maintenanceRequest);
    var result = this.http.post<MaintenanceRequest>(this.apiUrl, maintenanceRequest, httpOptions);
console.warn(result);
    return result;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/