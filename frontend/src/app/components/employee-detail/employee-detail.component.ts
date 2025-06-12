import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf,NavbarComponent],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee = {
    id: 0,
    username: "",
    password: "",
    createdAt: new Date().toISOString(),
    authStrategy: "local"
  };
  isEdit: boolean = false;
  loading: boolean = false;
  error: string = '';

  constructor(
    private service: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('Loading employee with ID:', id);
      this.service.getEmployeebyID(+id).subscribe({
        next: (emp) => {
          console.log('Employee loaded:', emp);
          if (emp) {
            this.employee = {
              id: +emp.id,
              username: emp.username,
              password: emp.password,
              createdAt: emp.createdAt,
              authStrategy: emp.authStrategy || "local",
              profile: emp.profile,
              posts: emp.posts
            };
            this.isEdit = true;
          }
        },
        error: (err) => {
          console.error('Error loading employee:', err);
          this.error = 'Failed to load employee';
        }
      });
    }
  }

  saveEmployee(form: NgForm) {
    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.loading = true;
    this.error = '';

    // Ensure required fields are set according to your backend
    if (!this.employee.createdAt) {
      this.employee.createdAt = new Date().toISOString();
    }
    if (!this.employee.authStrategy) {
      this.employee.authStrategy = "local";
    }
    
    // Your backend requires password, so ensure it's set
    if (!this.employee.password && !this.isEdit) {
      this.error = 'Password is required';
      this.loading = false;
      return;
    }

    console.log('Saving employee:', this.employee);
    console.log('Is edit mode:', this.isEdit);

    if (this.isEdit) {
      this.service.updateEmployee(this.employee.id, this.employee).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.loading = false;
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.loading = false;
          this.error = 'Failed to update employee: ' + (err.error?.message || err.message);
        }
      });
    } else {
      this.service.addEmployee(this.employee).subscribe({
        next: (response) => {
          console.log('Create successful:', response);
          this.loading = false;
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          console.error('Create failed:', err);
          this.loading = false;
          this.error = 'Failed to create employee: ' + (err.error?.message || err.message);
        }
      });
    }
  }

  cancel() {
    const cn = window.confirm("Do you want to go back? ALL YOUR changes WILL REMAIN UNSAVED");
    if (cn) {
      this.router.navigate(['/employees']);
    }
  }
}