import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserResponse } from '../models/UserResponse.model';
import { FullUser } from '../models/FullUser.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private headers = {
    'app-id': '64fc4a747b1786417e354f31'
  }

  constructor(private http: HttpClient) { }

  getUsers(limit: number, page: number) {
    console.log(`${this.apiUrl}?limit='${limit}&page=${page}`);
    return this.http.get<UserResponse>(`${this.apiUrl}?limit=${limit}&page=${page}`, {
      headers: this.headers
    });
  }

  getAllUsers() {
    return this.http.get<UserResponse>(this.apiUrl, {
      headers: this.headers
    });
  }

  getUserById(id: string) {
    return this.http.get<FullUser>(`${this.apiUrl}/${id}`, {
      headers: this.headers
    })
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}/create`, user, {
      headers: this.headers,
    });
  }

  updateUser(id: string, user: User) {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, {
      headers: this.headers,
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.headers
    });
  }
}
