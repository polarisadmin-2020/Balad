import { User, UserRole } from '../../core/domain/entities/User';
import { UserRepository } from '../../core/domain/repositories/UserRepository';

// In-memory implementation of the UserRepository interface
export class InMemoryUserRepository implements UserRepository {
  private apiUrl = process.env.NEXT_PUBLIC_API_URL;
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  async findById(id: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.apiUrl}/users/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.apiUrl}/users?email=${email}`);
      if (!response.ok) return null;
      const users = await response.json();
      return users[0] || null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const response = await fetch(`${this.apiUrl}/users`);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      const response = await fetch(`${this.apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) throw new Error('Failed to create user');
      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    try {
      const response = await fetch(`${this.apiUrl}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/users/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
}