import Image from "./Image";
import FileInfo from "./FIleInfo";

const ShowImage = ({ images }) => {
  const show = (image, index) => {
    if (image.type.includes("image/")) {
      return <Image key={index} image={image} />;
    } else {
      return <FileInfo key={index} image={image} />;
    }
  };
  return (
    <section className="overflow-hidden text-gray-700 ">
      <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
        <div className="flex flex-wrap -m-1 md:-m-2 justify-start">
          {images.map(show)}
        </div>
      </div>
    </section>
  );
};
export default ShowImage;
