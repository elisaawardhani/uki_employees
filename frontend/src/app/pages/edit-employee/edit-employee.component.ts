import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private employeeService:EmployeeService
  ) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
       id: new FormControl(),
       name: new FormControl(),
       department: new FormControl()
    });
  }

  onSubmit(): void {
    const employee = this.employeeForm.value
    this.employeeService.addEmployee(employee as Employee).subscribe({
      next: (response) => {
        alert("Employee Add Successfully")
      },
      error: (error) => {
        alert("Failed to Add Employee")
      }
    })
  }
}
