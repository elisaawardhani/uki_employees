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
  idSortingAsc: boolean = false
  nameSortingAsc: boolean = false
  deptSortingAsc: boolean = false

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

  sortId(){
    this.idSortingAsc = !this.idSortingAsc
    this.employees = this.employees.sort((a, b) => {
      if(this.idSortingAsc) return a.id.localeCompare(b.id)
      return b.id.localeCompare(a.id)
    });
  }

  sortName(){
    this.nameSortingAsc = !this.nameSortingAsc
    this.employees = this.employees.sort((a, b) => {
      if(this.nameSortingAsc) return a.name.localeCompare(b.name)
      return b.name.localeCompare(a.name)
    });
  }

  sortDept(){
    this.deptSortingAsc = !this.deptSortingAsc
    this.employees = this.employees.sort((a, b) => {
      if(this.deptSortingAsc) return a.department.localeCompare(b.department)
      return b.department.localeCompare(a.department)
    });
  }

}
