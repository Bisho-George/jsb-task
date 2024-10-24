import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import { UserResponse } from '../models/UserResponse.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(limit: number, page: number){
    return this.http.get<UserResponse>(`${this.apiUrl}?limit=${limit}&page=${page}`,{
      headers: {
        'app-id': '64fc4a747b1786417e354f31'
      }
    });
}
}
