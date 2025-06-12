import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfileService, Profile } from '../../services/profile.service';
import { EmployeeService } from '../../services/employee.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  profile: Profile = {
    firstName: '',
    lastName: '',
    age: 0,
    dob: ''
  };
  
  userId: number = 0;
  username: string = '';
  loading: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private profileService: ProfileService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = +id;
      // Get employee info to display username
      this.employeeService.getEmployeebyID(this.userId).subscribe({
        next: (emp) => {
          this.username = emp.username;
        },
        error: (err) => {
          console.error('Error loading employee:', err);
          this.error = 'Failed to load employee information';
        }
      });
    }
  }

  saveProfile(form: NgForm) {
    if (form.invalid) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.profileService.createProfile(this.userId, this.profile).subscribe({
      next: (response) => {
        console.log('Profile created:', response);
        this.loading = false;
        this.success = 'Profile created successfully!';
        setTimeout(() => {
          this.router.navigate(['/employees']);
        }, 2000);
      },
      error: (err) => {
        console.error('Profile creation failed:', err);
        this.loading = false;
        this.error = 'Failed to create profile: ' + (err.error?.message || err.message);
      }
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}