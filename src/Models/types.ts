//User for log in
export interface UserLogIn {
  UserName: string;
  Password: string;
}

// Already logged in user
export interface userLoggedIn {
  name: string;
  id?: string;
  checked?: boolean;
  logged?: boolean;
}

// New user data
export interface NewUser {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  confPassword: string;
  country: string;
  city: string;
}

// Created user for response
export interface UserCreated {
  userName: string;
  fullName: string;
  userId: string;
  checked: boolean;
  repeted: boolean;
}

// // inMessagge
// export interface InMessage {
//   from: string;
//   to: string;
//   date: string;
//   body: string;
//   read: boolean;
// }

// outMessagge
export interface OutMessage {
  msgId?: number;  //not used for storing msge in DB
  from?: string;
  fromName: string;
  to: string;
  date: Date;
  body: string;
}

// inMessagge
export interface InMessage extends OutMessage {
  read: boolean;
}

// Object for delete message data
export interface deleteData {
  id: number;
  box: string;
}

// Object for mark message as read
export interface markAsReadData {
  msgId: number;
  mark: boolean;
}


