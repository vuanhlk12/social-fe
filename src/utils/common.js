import { storage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imgUrl } from "./constant";

export const handleUpload = async (file, name, type = "img") => {
  try {
    if (file) {
      const imgName = file?.name;
      const folderPath = `pictures/${name}`;
      const fullPath = `${folderPath}/${imgName}`;
      const uploadRef = ref(storage, fullPath);
      const snapshot = await uploadBytes(uploadRef, file);
      const pathReference = ref(storage, fullPath);
      const url = await getDownloadURL(pathReference);
      return url;
    }
  } catch (e) {
    console.log("error handleUpload", e);
  }
  return imgUrl.noAvtUrl;
};
