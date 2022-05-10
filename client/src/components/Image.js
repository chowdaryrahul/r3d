import React from "react";
function Image({ image }) {
  return (
    <div className="flex flex-wrap w-1/4 h-1/5 p-1">
      <div className="w-full">
        <img
          alt="gallery"
          className="object-fill h-20 w-96 object-center rounded-lg"
          src={image.src}
        />
      </div>
    </div>
  );
}
export default Image;
