import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';

// Use case for getting a user by ID following the clean architecture pattern
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }
}