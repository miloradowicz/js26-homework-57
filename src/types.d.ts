export enum UserRole {
  User = 'user',
  Editor = 'editor',
  Admin = 'admin',
}

export interface UserMutation {
  get name(): string;
  get email(): string;
  get isActive(): boolean;
  get role(): UserRole;
}

export interface User extends UserMutation {
  get id(): number;
}
