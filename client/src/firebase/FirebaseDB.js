import { uploadBytesResumable, getDownloadURL } from "firebase/storage";

let uploadTask;

const onUploadStateChange = (snapshot) => {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log("Upload is " + progress + "% done");
  switch (snapshot.state) {
    case "paused":
      console.log("Upload is paused");
      break;
    case "running":
      console.log("Upload is running");
      break;
    default:
  }
};

const onUploadError = (error) => {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/firebaseStorage/web/handle-errors
  switch (error.code) {
    case "firebaseStorage/unauthorized":
      // User doesn't have permission to access the object
      break;
    case "firebaseStorage/canceled":
      // User canceled the upload
      break;
    case "firebaseStorage/unknown":
      // Unknown error occurred, inspect error.serverResponse
      break;
    default:
  }
};

const onUploadSuccess = () => {
  // Upload completed successfully, now we can get the download URL
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    // console.log("File available at", downloadURL);
  });
};

const uploadImageWithMetadata = async (ref, file, metadata) => {
  // 'file' comes from the Blob or File API
  uploadTask = uploadBytesResumable(ref, file, metadata).then((snapshot) => {
    console.log("Uploaded file with metadata");
  });
};

const uploadImage = async (ref, file) => {
  // 'file' comes from the Blob or File API
  uploadTask = uploadBytesResumable(ref, file);
  registerStateChangeEvents(uploadTask);
  return uploadTask;
};

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
const registerStateChangeEvents = (uploadTaskImp) => {
  uploadTaskImp.on(
    "state_changed",
    (snapshot) => onUploadStateChange(snapshot),
    (error) => onUploadError(error),
    () => onUploadSuccess()
  );
};

export { uploadImage, uploadImageWithMetadata };
