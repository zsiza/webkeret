import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 'user1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      passwordHash: 'hash1',
      subscription: 'premium',
      joinedAt: new Date('2023-01-15'),
    },
    {
      id: 'user2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      passwordHash: 'hash2',
      subscription: 'free',
      joinedAt: new Date('2023-02-10'),
    },
    {
      id: 'user3',
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      passwordHash: 'hash3',
      subscription: 'free',
      joinedAt: new Date('2023-03-05'),
    },
    {
      id: 'user4',
      name: 'Diana Lee',
      email: 'diana@example.com',
      passwordHash: 'hash4',
      subscription: 'premium',
      joinedAt: new Date('2023-04-20'),
    },
    {
      id: 'user5',
      name: 'Evan Chen',
      email: 'evan@example.com',
      passwordHash: 'hash5',
      subscription: 'premium',
      joinedAt: new Date('2023-05-25'),
    },
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
