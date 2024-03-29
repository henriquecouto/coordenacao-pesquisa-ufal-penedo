import { auth } from "./firebase";
import { addData } from "./db";
import { saveLastUse } from "../helpers/login";

const errors = {
  "auth/user-not-found": "Não há nenhum usuário registrado com esse email.",
  "auth/invalid-email": "O email não é válido.",
  "auth/wrong-password": "A senha é inválida.",
  "auth/email-already-in-use":
    "Esse email já está sendo usado por outra conta.",
  "auth/weak-password": "A senha precisa ter 6 ou mais caracteres"
};

export const signUp = async ({ email, password, fullName, ...others }) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    const loggedUser = getLoggedUser();
    await loggedUser.updateProfile({
      displayName: fullName
    });
    await addData("users", { email, fullName, ...others });
    saveLastUse();
    return { status: true };
  } catch (error) {
    console.log(error.code, error.message);
    return { status: false, error: errors[error.code] };
  }
};

export const signIn = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    saveLastUse();
    return { status: true };
  } catch (error) {
    return { status: false, error: errors[error.code] };
  }
};

export const recoverPass = async email => {
  try {
    await auth.sendPasswordResetEmail(email);
    return { status: true };
  } catch (error) {
    console.log(error.code);
    return { status: false, error: errors[error.code] };
  }
};

export const signOut = async () => {
  await auth.signOut();
};

export const listenLogin = callback => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (user) {
      callback({ status: true, uid: user.uid });
    } else {
      callback({ status: false });
    }
  });
  return unsubscribe;
};

export const getLoggedUser = () => {
  return auth.currentUser;
};
