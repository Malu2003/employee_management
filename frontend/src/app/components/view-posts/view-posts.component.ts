import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-view-posts',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './view-posts.component.html',
  styleUrl: './view-posts.component.css'
})
export class ViewPostsComponent implements OnInit {
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
      this.loadUserPosts(+id);
    }
  }

  loadUserPosts(id: number) {
    this.loading = true;
    this.employeeService.getEmployeebyID(id).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user posts:', err);
        this.error = 'Failed to load user posts';
        this.loading = false;
      }
    });
  }

  addNewPost() {
    if (this.user) {
      this.router.navigate(['/posts', this.user.id]);
    }
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}