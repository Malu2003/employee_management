import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Profile {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  createProfile(userId: number, profile: Profile): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/profiles`, profile);
  }
}