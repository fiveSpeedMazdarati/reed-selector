import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { UserRepository } from './user.repository';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private repository = inject(UserRepository);

  getUsers(): Observable<User[]> {
    return this.repository.getUsers();
  }

  getUser(id: number): Observable<User> {
    return this.repository.getUser(id);
  }
}
