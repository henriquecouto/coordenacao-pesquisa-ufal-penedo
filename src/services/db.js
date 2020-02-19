import { db } from "./firebase";
import { getLoggedUser } from "./auth";

export const addData = async (collection, data) => {
  try {
    const { uid } = getLoggedUser();
    await db.collection(collection).add({
      ...data,
      uid: uid,
      registrationDate: new Date()
    });
    return { status: true };
  } catch (error) {
    return { etatus: false, error };
  }
};

export const updateData = async (collection, doc, data) => {
  try {
    await db
      .collection(collection)
      .doc(doc)
      .update({
        ...data,
        lastModification: new Date()
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

export const loadResponses = async (callback, questionaryId) => {
  const { uid } = getLoggedUser();
  const unsubscribe = db
    .collection("responses")
    .where("uid", "==", uid)
    .where("questionaryId", "==", questionaryId)
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};

export const loadSubsections = callback => {
  const unsubscribe = db
    .collection("subsections")
    .orderBy("priority", "asc")
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};

export const loadQuestions = callback => {
  const unsubscribe = db
    .collection("questions")
    .orderBy("priority", "asc")
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};

export const loadSections = (callback, questionaryId) => {
  const unsubscribe = db
    .collection("sections")
    .where("questionary", "==", questionaryId)
    .orderBy("priority", "asc")
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};

export const loadQuestionaries = callback => {
  const unsubscribe = db
    .collection("questionaries")
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};
