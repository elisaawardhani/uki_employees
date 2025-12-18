import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/api/employees'
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Response<Employee[]>> {
    return this.http.get<Response<Employee[]>>(this.apiUrl)
  }

  getEmployee(id:string): Observable<Response<Employee>> {
    return this.http.get<Response<Employee>>(this.apiUrl)
  }

  addEmployee(employee:Employee): Observable<Response<any>> {
    console.log(employee)
    return this.http.post<Response<any>>(this.apiUrl, employee)
  }

  // editEmployee()

}
