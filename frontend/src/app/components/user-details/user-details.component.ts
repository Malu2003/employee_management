import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user: Employee | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUserDetails(+id);
    }
  }

  loadUserDetails(id: number) {
    this.loading = true;
    this.employeeService.getEmployeebyID(id).subscribe({
      next: (user) => {
        console.log('Complete user data:', user);
        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user details:', err);
        this.error = 'Failed to load user details';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }

  goToWelcome() {
    this.router.navigate(['/welcome']);
  }

  editUser() {
    if (this.user) {
      this.router.navigate(['/employees', this.user.id]);
    }
  }
}