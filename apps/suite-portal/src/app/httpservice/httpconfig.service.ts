import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { Account, MaintenanceRequest, TokenWrapper } from '@suiteportal/api-interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    AuthorizationToken: sessionStorage.getItem('token') ?? ""
  })
};

@Injectable()
export class HTTPConfigService {
  constructor(private http: HttpClient) { }
  apiUrl = 'api/maintenance-requests';

  addMaintenanceRequest(maintenanceRequest: MaintenanceRequest): Observable<MaintenanceRequest> {
    var result = this.http.post<MaintenanceRequest>(this.apiUrl, maintenanceRequest, httpOptions);
    return result;
  }
  
  login(account: Account): Observable<Account> {
    var result = this.http.post<Account>(this.apiUrl+"/login", account, httpOptions);
    return result;
  }
  
  verify(): Observable<TokenWrapper> {
    let token = sessionStorage.getItem('token')
    var tokenWrapper = { "token": token }
    var result = this.http.post<TokenWrapper>(this.apiUrl+"/verify", tokenWrapper, httpOptions);
    return result;
  }
  
  getOpenRequests(): Observable<MaintenanceRequest[]> {
    var result = this.http.get<MaintenanceRequest[]>(this.apiUrl, httpOptions);
    return result;
  }
  
  closeRequest(id: string): Observable<MaintenanceRequest> {
    var result = this.http.post<MaintenanceRequest>(this.apiUrl + `/${ id }/close`, httpOptions);
    return result;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/