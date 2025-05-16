import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUsers(): User[] {
    return [];
  }

  getUserById(id: string): User | undefined {
    return undefined;
  }
}
