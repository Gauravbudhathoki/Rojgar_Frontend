export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}
