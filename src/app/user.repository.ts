import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserRepository {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Example API

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // You can add other methods like addUser, updateUser, deleteUser, etc.
}
