export class CreateUserDto {
    email: string;
    password: string;
    roles: string[];
  }
  
  export class UpdateUserDto {
    email?: string;
    password?: string;
    roles?: string[];
  }