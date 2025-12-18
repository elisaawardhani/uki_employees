import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm:FormGroup
  employee: Employee
  errorMessage: string = ''
  employeeId: string

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId != null) {
      this.loadEmployee(this.employeeId)
    }

    this.employeeForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      department: new FormControl()
    });
  }

  loadEmployee(id: string): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (response) => {
        this.employee = response.data
        console.log('Employee name ', response.data)
      },
      error: (error) => {
        this.errorMessage = 'Failed to load employee data.'
      }
    })
  }

  onSubmit(): void {
    const employee = this.employeeForm.value
    this.employeeService.addEmployee(employee as Employee).subscribe({
      next: (response) => {
        alert("Employee Added Successfully.")
      },
      error: (error) => {
        alert("Failed to Add Employee.")
      }
    })
  }
}
