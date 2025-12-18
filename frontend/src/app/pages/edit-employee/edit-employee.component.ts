import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      department: new FormControl()
    });

    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId != null) {
      this.loadEmployee(this.employeeId)
    }

    this.employeeForm = new FormGroup({
      id: new FormControl({value: '', disabled: this.employeeId}),
      name: new FormControl(),
      department: new FormControl()
    });
  }

  loadEmployee(id: string): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (response) => {
        this.employee = response.data
        this.employeeForm.patchValue(this.employee);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load employee data.'
      }
    })
  }

  onSubmit(): void {
    const employee = this.employeeForm.value
    if (this.employeeId != null) {
      this.employeeService.editEmployee(this.employeeId, employee as Employee).subscribe({
        next: (response) => {
          alert("Employee Data Edited Successfully.")
          this.router.navigate(['/home'])
        },
        error: (error) => {
          alert("Failed to Edit Employee Data.")
        }
      })
    } else {
      this.employeeService.addEmployee(employee as Employee).subscribe({
        next: (response) => {
          alert("Employee Data Added Successfully.")
          this.employeeForm.reset();
        },
        error: (error) => {
          alert("Failed to Add Employee Data.")
        }
      })
    }
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        alert("Employee Data Deleted Successfully.")
        this.router.navigate(['/home'])
      },
      error: (error) => {
        this.errorMessage = 'Failed to Delete Employee Data.'
      }
    })
  }
}
