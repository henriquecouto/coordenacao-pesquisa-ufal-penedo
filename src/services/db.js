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

export const loadLoggedUser = (callback, uid) => {
  return db
    .collection("users")
    .where("uid", "==", uid)
    .onSnapshot(snapshot => onSnapshot(snapshot, callback, true));
};

export const loadResponses = (callback, questionaryId) => {
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

export const loadCoordinationActivities = callback => {
  const unsubscribe = db
    .collection("coordination-activities")
    .orderBy("priority", "asc")
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};

export const loadCoordination = callback => {
  const unsubscribe = db
    .collection("coordination")
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};

export const loadPostgraduate = callback => {
  const unsubscribe = db
    .collection("post-graduations")
    .onSnapshot(snapshot => onSnapshot(snapshot, callback));
  return unsubscribe;
};

export const loadPibic = (
  callback,
  limit = 5,
  start = 0,
  after = true,
  order = "asc"
) => {
  if (after) {
    const unsubscribe = db
      .collection("pibic")
      .orderBy("title", order)
      .startAfter(start)
      .limit(limit)
      .onSnapshot(snapshot => onSnapshot(snapshot, callback));
    return unsubscribe;
  } else {
    const unsubscribe = db
      .collection("pibic")
      .orderBy("title", order)
      .startAt(start)
      .limit(limit)
      .onSnapshot(snapshot => onSnapshot(snapshot, callback));
    return unsubscribe;
  }
};
