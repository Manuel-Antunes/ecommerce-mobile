import { FirebaseAuthTypes } from '@react-native-firebase/auth'
export interface User {
  profile: FirebaseAuthTypes.User,
  level: string,
  admId: string
}

export interface UserState {
  data?: User;
}
