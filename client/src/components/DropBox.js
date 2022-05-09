import { useDropzone } from "react-dropzone";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

function DropBox({ onDrop }) {
  const maxNameLength = 60;
  const maxFileSizeBytes = 3000000;

  function fileValidator(file) {
    if (file instanceof DataTransferItem) return;
    if (file.name.length > maxNameLength) {
      return {
        code: "name-too-large",
        message: `Name is larger than ${maxNameLength} characters`,
      };
    }
    if (file.size > maxFileSizeBytes) {
      return {
        code: "file-too-large",
        message: `File size is larger than ${maxFileSizeBytes} bytes`,
      };
    }

    return null;
  }
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/vnd.ms-pki.stl": [".stl"],
    },
    onDrop,
    validator: fileValidator,
    maxFiles: 5,
    noClick: true,
    noKeyboard: true,
  });

  //@TODO Create popups for these
  const rejected = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      {" "}
      <section className="dropbox overflow-auto p-8 w-full h-full flex flex-col">
        <div className="container mx-auto dropbox" {...getRootProps()}>
          <div className="max-w-7xl mx-auto">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-36">
              <input {...getInputProps()} />
              <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Drag and drop your</span>&nbsp;
                <span>files in box (Max 5) or</span>
              </p>
              <div className="container mx-auto px-4">
                <button
                  type="button"
                  className="mx-auto px-4 py-2 flex justify-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={open}
                >
                  Select File
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default DropBox;
