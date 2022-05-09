import React from "react";
function FileInfo({ image }) {
  return (
    <div className="flex flex-wrap w-1/4">
      <div className="w-full p-1 md:p-2 ">
        <div className="border-2 border-indigo-500 overflow-scroll h-full rounded">
          <span className="shadow text-xs hover:text-sm">{image.name}</span>
          <br />
          <span className="shadow text-xs font-medium">File Size:</span>
          <span className="shadow text-xs hover:text-sm"> {image.size}</span>
        </div>
      </div>
    </div>
  );
}
export default FileInfo;
