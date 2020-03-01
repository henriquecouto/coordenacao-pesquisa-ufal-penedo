import { storage } from "./firebase";

export const getFile = async address => {
  try {
    const result = await storage.ref(address).getDownloadURL();
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const saveFile = async (address, file, callback) => {
  const ref = storage
    .ref()
    .child(address)
    .put(file);

  ref.on(
    "state_changed",
    snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    error => {
      console.log(error);
    },
    () => {
      ref.snapshot.ref.getDownloadURL().then(callback);
    }
  );
};
