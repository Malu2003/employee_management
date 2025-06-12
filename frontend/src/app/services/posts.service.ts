import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  id?: number;
  title: string;
  description: string;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  createPost(userId: number, post: Post): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/posts`, post);
  }
}