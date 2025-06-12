import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  username: string;
  password: string; 
  createdAt: Date | string;
  authStrategy: string | null;
  profile?: any;
  posts?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = '/api/users'; 

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeebyID(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    
    const userData = {
      username: employee.username,
      password: employee.password,
      createdAt: employee.createdAt || new Date().toISOString(),
      authStrategy: employee.authStrategy
    };
    return this.http.post<Employee>(this.apiUrl, userData);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
   
    const userData = {
      username: employee.username,
      password: employee.password,
      createdAt: employee.createdAt,
      authStrategy: employee.authStrategy
    };
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, userData);
  }
}