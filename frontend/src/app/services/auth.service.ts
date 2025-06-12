import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedInStatus= false;
  constructor(private router: Router) {}
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isLoggedInStatus = true;
      return true;
    }
    return false;
  }
  Logout(){
    this.isLoggedInStatus =false;
    this.router.navigate(['/login']);
  }
}