import { storage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const handleUpload = async (file, name, type = "img") => {
  if (file) {
    const imgName = file?.name;
    const folderPath = `pictures/${name}`;
    const fullPath = `${folderPath}/${imgName}`;
    const uploadRef = ref(storage, fullPath);
    const snapshot = await uploadBytes(uploadRef, file);
    console.log("snapshot", snapshot);
    const pathReference = ref(storage, fullPath);
    const url = await getDownloadURL(pathReference);
    return url;
  }
};
