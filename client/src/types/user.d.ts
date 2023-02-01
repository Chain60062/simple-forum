export interface UserType {
  profile_id: string;
  avatar: string;
  profile_name: string;
  is_verified: boolean;
  nickname: string;
  email: string;
  created_at: string;
}

export interface UserContextType {
  loggedUser: UserType | null;
  setLoggedUser: (loggedUser: UserType) => void;
}

