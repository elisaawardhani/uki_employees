import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/api/employees'
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl)
  }

}
