import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
  webClientId: '163468415654-r115e5j6jteotrtb11m9hjge256fbinq.apps.googleusercontent.com', scopes: ['https://www.googleapis.com/auth/contacts.readonly']
})
export async function SignInWithGoogle() {
  //
  const googleAuth = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(googleAuth.idToken);

  // Sign-in the user with the credential
  return { fb: await auth().signInWithCredential(googleCredential), google: googleAuth };
}
export const LoginGoogle = GoogleSignin;
