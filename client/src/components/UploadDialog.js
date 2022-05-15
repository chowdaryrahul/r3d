import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useCallback, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import DropBox from "./DropBox";
import ShowImage from "./ShowImage";
import { firebaseStorage } from "../firebase/Firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { uploadImage } from "../firebase/FirebaseDB";

export default function UploadDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { user, userUpdate, isValidUser } = useContext(AuthContext);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      console.log(file);
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          {
            id: index,
            name: file.path,
            size: file.size,
            src: e.target.result,
            file: file,
            type: file.type,
            uploaded: false,
          },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const uploadFilesHandler = async () => {
    images.forEach((image) => {
      console.log(image);
      const imgRef = ref(firebaseStorage, `${user.uid}/${image.name}`);

      uploadImage(imgRef, image.file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUploadedFiles((prevState) => [...prevState, downloadURL]);
        });
      });
    });
  };
  console.log(uploadedFiles);

 


  localStorage.setItem("images",JSON.stringify(uploadedFiles))
  const clearFilesHandler = () => {
    setImages([]);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    console.log("Current Images");
    console.log(images);
  });

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Select files
        </button>
      </div>
      {!isOpen ? (
        <div className="px-4 py-2 flex mx-auto items-center justify-center">
          <ShowImage images={images} />
        </div>
      ) : (
        ""
      )}
      {images.length > 0 && !isOpen ? (
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={uploadFilesHandler}
            className="inline-flex mx-1 items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 pr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>Upload</span>
          </button>

          <button
            type="button"
            onClick={clearFilesHandler}
            className="inline-flex mx-1 items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 pr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Clear</span>
          </button>
        </div>
      ) : (
        ""
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Upload Files
                  </Dialog.Title>

                  <DropBox onDrop={onDrop} />

                  <ShowImage images={images} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
