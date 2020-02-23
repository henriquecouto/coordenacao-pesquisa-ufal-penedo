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
    return { status: false, error };
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
    return { status: false, error };
  }
};

const onSnapshot = (snapshot, next, one = false) => {
  let result;
  if (one) {
    result = snapshot.docs[0].data();
  } else {
    result = snapshot.docs.map(v => ({ id: v.id, ...v.data() }));
  }
  return next(result);
};

export const loadLoggedUser = async (callback, uid) => {
  return db
    .collection("users")
    .where("uid", "==", uid)
    .onSnapshot(snapshot => onSnapshot(snapshot, callback, true));
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

export const loadResearchGroups = callback => {
  const unsubscribe = db
    .collection("research-groups")
    .orderBy("name", "asc")
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};

export const loadPibic = (callback, start = 0, limit = 10) => {
  const unsubscribe = db
    .collection("pibic")
    .orderBy("name", "asc")
    .startAt(start)
    .limit(limit)
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};
