import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostsService, Post } from '../../services/posts.service';
import { EmployeeService } from '../../services/employee.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  
  post: Post = {
    title: '',
    description: ''
  };
  
  userId: number = 0;
  username: string = '';
  loading: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private postsService: PostsService,
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

  savePost(form: NgForm) {
    if (form.invalid) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.postsService.createPost(this.userId, this.post).subscribe({
      next: (response) => {
        console.log('Post created:', response);
        this.loading = false;
        this.success = 'Post created successfully!';
        setTimeout(() => {
          this.router.navigate(['/employees']);
        }, 2000);
      },
      error: (err) => {
        console.error('Post creation failed:', err);
        this.loading = false;
        this.error = 'Failed to create post: ' + (err.error?.message || err.message);
      }
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}