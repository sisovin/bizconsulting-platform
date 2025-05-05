export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  isActive: boolean;

  authenticate(password: string): boolean;
  authorize(role: string): boolean;
}
