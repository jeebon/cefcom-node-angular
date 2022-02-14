import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLoginRequestData, UserRegRequestData, UserResponseData } from 'src/app/interfaces/user';
import { CommonResponse } from 'src/app/interfaces/http-responses';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserResponseData>;
  public currentUser: Observable<UserResponseData>;

  private apiUser = `${environment.server_url}/api/${environment.api_version}/users`;
  private api = `${environment.server_url}/api/${environment.api_version}/auth`;

  constructor(
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<UserResponseData>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserResponseData {
    return this.currentUserSubject.value;
  }

  login(request: UserLoginRequestData) {
    return this.http.post<UserResponseData>(`${this.api}/login`, request, { observe: 'response' })
      .pipe(tap(data => {
        if (data.status == 200) {
          localStorage.setItem('currentUser', JSON.stringify(data.body));
          this.currentUserSubject.next(data.body);
        }
      }));
  }

  signup(request: UserRegRequestData) {
    return this.http.post<CommonResponse>(`${this.apiUser}`, request, { observe: 'body' });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
