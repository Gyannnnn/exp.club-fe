export interface HabitType {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface UserTypes {
  message: string;
  user: {
    id: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userBio: string;
    joinedAt: Date;
    habits: HabitType[];
    streak: number;
    lastCheckIn: Date;
    following: string;
    followers: string;
  };
}

export interface userResponse {
  id: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userBio: string;
  joinedAt: Date;
  streak: number;
  lastCheckIn: Date;
}

export interface users {
  message: "Users fetched successfully";
  users: userResponse[];
}

export interface HabitResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Habits {
  message: "Habits fetched successfully";
  habits: HabitResponse[];
}
export interface feed{
    id: string
    name: string
    description: string
    category: string
    createdAt: Date
    updatedAt:Date
    userId: string
    user: {
      id: string
      userName:string
      userBio: string
    }
}

export interface FeedRes {
  message: string;
  habits: feed[];
}


export interface ProfileHabit{
  message:string
  habits: HabitType[]
}