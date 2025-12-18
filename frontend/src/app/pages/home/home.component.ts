import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees: Employee[] = []
  errorMessage: string = ''

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.loadEmployees()
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response.data
      },
      error: (error) => {
        this.errorMessage = 'Failed to load employees data.'
      }
    })
  }

}
