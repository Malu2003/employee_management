export class CreateUserDto {
  username: string;
  password?: string;
  createdAt?: string;
  authStrategy?: string | null;
}