import { storage } from "./firebase";

export const getFile = async address => {
  try {
    const result = await storage.ref(address).getDownloadURL();
    return result;
  } catch (e) {
    console.log(e);
  }
};
