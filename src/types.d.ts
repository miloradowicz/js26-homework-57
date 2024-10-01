enum UserRole {
  User = 'user',
  Editor = 'editor',
  Admin = 'admin',
}

interface User {
  get name(): string;
  get email(): string;
  get isActive(): string;
  get role(): UserRole;
}
