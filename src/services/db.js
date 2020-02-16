import { db } from "./firebase";
import { getLoggedUser } from "./auth";

export const addData = async (collection, data) => {
  try {
    const { displayName, uid } = getLoggedUser();
    await db.collection(collection).add({
      ...data,
      user: uid,
      username: displayName,
      registrationDate: new Date()
    });
    return { status: true };
  } catch (error) {
    return { etatus: false, error };
  }
};

const onSnapshot = (snapshot, next) => {
  const result = snapshot.docs.map(v => ({ id: v.id, ...v.data() }));
  return next(result);
};
