import { Component,OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EmployeeService,Employee } from '../../services/employee.service';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-employee-list',
  imports: [NgFor,RouterOutlet,RouterLink,NgIf,NavbarComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
     employees:Employee[]=[];
     confirmDeleteId: number | null = null;
     showPostsModal: boolean = false;
     selectedUserId: number = 0;
     constructor(private service:EmployeeService,public router:Router){}

   
  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
  this.service.getEmployees().subscribe((employees: Employee[]) => {
    this.employees = employees;
  });
}

deleteEmployee(id: number) {
  const confirmed = window.confirm('Are you sure you want to delete this employee?');
  if (confirmed) {
    this.service.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
}

  cancelDelete() {
    this.confirmDeleteId = null;
  }


  goToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }

  updateEmployee(id:number){
    // Navigate to complete user details page
    this.router.navigate(['/user-details', id]);
  }

  goToProfile(id: number) {
    this.router.navigate(['/profile', id]);
  }

  // Show posts options
  showPostsOptions(id: number) {
    this.selectedUserId = id;
    this.showPostsModal = true;
  }

  viewPosts() {
    this.router.navigate(['/view-posts', this.selectedUserId]);
    this.closeModal();
  }

  addNewPost() {
    this.router.navigate(['/posts', this.selectedUserId]);
    this.closeModal();
  }

  closeModal() {
    this.showPostsModal = false;
    this.selectedUserId = 0;
  }

  // ADD THIS METHOD FOR WELCOME NAVIGATION
  goToWelcome() {
    this.router.navigate(['/welcome']);
  }
}