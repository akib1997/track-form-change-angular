import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly paths = {
    user: `${environment.api}/user`,
    users: `${environment.api}/users`,
  };
  constructor(private httpClient: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.paths.users}/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.paths.users}`);
  }
}
