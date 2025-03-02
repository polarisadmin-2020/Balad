import { GetUserUseCase } from '../../core/application/usecases/user/GetUserUseCase';
import { UserRepository } from '../../core/domain/repositories/UserRepository';
import { InMemoryUserRepository } from '../repositories/InMemoryUserRepository';

// Simple dependency injection container
class Container {
  private repositories: {
    userRepository: UserRepository;
  };

  private useCases: {
    getUserUseCase: GetUserUseCase;
  };

  constructor() {
    // Initialize repositories
    this.repositories = {
      userRepository: new InMemoryUserRepository()
    };

    // Initialize use cases with their dependencies
    this.useCases = {
      getUserUseCase: new GetUserUseCase(this.repositories.userRepository)
    };
  }

  // Repository getters
  getUserRepository(): UserRepository {
    return this.repositories.userRepository;
  }

  // Use case getters
  getGetUserUseCase(): GetUserUseCase {
    return this.useCases.getUserUseCase;
  }
}

// Export a singleton instance
export const container = new Container();