import React, { useRef, useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Comments from "../components/Comments.js";
import Like from "../components/Like.js";
import { AuthContext } from "../firebase/Auth";
import Page404 from "./Page404.js";
import AddToCart from "../components/AddToCart.js";

import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";

const STLLoader = require("three-stl-loader")(THREE);

const ItemView = (props) => {
  const { isValidUser, user } = useContext(AuthContext);
  const refContainer = useRef();
  const [renderer, setRenderer] = useState();
  // const [stl, setStl] = useState(null);
  let stl = null;
  let dataURL = null;

  let { _id } = useParams();
  let { loading, error, data } = useQuery(queries.FETCH_ITEM, {
    fetchPolicy: "cache-and-network",
    variables: { _id: _id },
  });

  let itemData = null;
  let likedIdx = false;

  const isStl = (fname) => {
    const ext = fname.slice(((fname.lastIndexOf(".") - 1) >>> 0) + 2);
    if (ext.includes("stl") && !stl) {
      stl = fname;
      // setStl(fname);
      return true;
    } else {
      return false;
    }
  };

  // const getSTLBytes = async () => {
  //   const link = data.fetchItem.multiple_images_of_obj[0];
  //   console.log(link);
  //   const httpsReference = ref(firebaseStorage, link);
  //   await getBytes(httpsReference).then((data) => {
  //     console.log(data);
  //     setStl(data);
  //   });
  // };

  useEffect(() => {
    const { current: container } = refContainer;

    console.log("use effect called");
    console.log(stl);
    console.log(container, renderer, stl);
    if (container && !renderer) {
      console.log("rendering STL");
      // const sceneWidth = container.clientWidth;
      // const sceneHeight = container.clientHeight || 600;
      const sceneWidth = 400;
      const sceneHeight = 400;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        // alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(sceneWidth, sceneHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);

      setRenderer(renderer);

      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = 70;
      camera.position.y = 0;

      const controls = new OrbitControls(camera, renderer.domElement);
      // How far you can orbit vertically, upper and lower limits.
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI;

      controls.enablePan = true; // Set to false to disable panning (ie vertical and horizontal translations)

      controls.enableDamping = true; // Set to false to disable damping (ie inertia)
      controls.dampingFactor = 0.25;

      // How far you can dolly in and out ( PerspectiveCamera only )
      controls.minDistance = 0;
      controls.maxDistance = Infinity;

      controls.rotateSpeed = 0.05;

      controls.enableZoom = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.75;

      const scene = new THREE.Scene();
      scene.add(new THREE.HemisphereLight(0xffffff, 1.5));
      scene.add(camera);

      const loader = new STLLoader();

      const material = new THREE.MeshPhongMaterial({
        color: 0xff5533,
        specular: 100,
        shininess: 100,
        // vertexColors: true,
      });

      loader.load(stl, function (geometry) {
        const mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

        let middle = new THREE.Vector3();
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(middle);

        mesh.geometry.applyMatrix(
          new THREE.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z)
        );

        // var largestDimension = Math.max(
        //   geometry.boundingBox.max.x,
        //   geometry.boundingBox.max.y,
        //   geometry.boundingBox.max.z
        // );
        // camera.position.z = largestDimension * 1.5;

        dataURL = renderer.domElement.toDataURL();

        var animate = function () {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
      });
    }
  }, [renderer]);

  itemData = data && data.fetchItem && (
    <div className=" gap-1 border">
      <header className="fmt-1 text-4xl text-black-900 text-left">
        {data.fetchItem.title}
      </header>
      <br />
      <div className="  overflow-scroll">
        <div className="grid grid-cols-2 gap-4">
          <Carousel className="border p-3  ">
            {data.fetchItem.multiple_images_of_obj.map((image, idx) =>
              isStl(image) ? (
                <div key={idx}>
                  <div ref={refContainer}>STL File</div>
                  <img src={image} alt="3D STL " />
                </div>
              ) : (
                <div
                  key={idx}
                  className="flex flex-nowrap lg:48 overflow-x-auto whitespace-wrap justify-content-center scroll-auto p-4 h-60 w-100 "
                >
                  <img src={image} alt="3d photos" />
                </div>
              )
            )}
          </Carousel>
          <div>
            <p className="fmt-1 text-2xl text-black-900 text-center border">
              Details:
            </p>
            <p className="border">Posted by: {data.fetchItem.user_name}</p>
            <p className="border">Category: {data.fetchItem.category}</p>
            <p className="border">Tags: {data.fetchItem.tags}</p>
            <p className="border">Description: {data.fetchItem.description}</p>
            <p className="border">Upload Date: {data.fetchItem.upload_date}</p>
            <p className="border">License: {data.fetchItem.license}</p>
            <p className="border">Price: {data.fetchItem.price}</p>

            <p className="border">Print Settings: </p>

            <p className="border">
              Printer: {data.fetchItem.print_settings.printer}
            </p>
            <p className="border">
              Printer Brand: {data.fetchItem.print_settings.printer_brand}
            </p>
            <p className="border">
              Rafts: {data.fetchItem.print_settings.rafts}
            </p>
            <p className="border">
              Supports: {data.fetchItem.print_settings.supports}
            </p>
            <p className="border">
              Resolution: {data.fetchItem.print_settings.resolution}
            </p>
            <p className="border">
              Infill: {data.fetchItem.print_settings.infill}
            </p>
            <p className="border">
              Filament Brand: {data.fetchItem.print_settings.filament_brand}
            </p>
            <p className="border">
              Filament Color: {data.fetchItem.print_settings.filament_color}
            </p>
            <p className="border">
              Filament Material:{" "}
              {data.fetchItem.print_settings.filament_material}
            </p>
          </div>
        </div>
        <div>
          <p className="font-bold text-xl mb-2 text-gray-700 text-base ">
            {data.fetchItem.likeDetails.map((likes, idx) => {
              if (isValidUser && likes.user_id === user.uid) {
                likedIdx = true;
              }
            })}
          </p>
          {likedIdx === false ? (
            <Like likeFlag="toLike" itemDataToLike={data.fetchItem} />
          ) : (
            <Like likeFlag="toUnlike" itemDataToLike={data.fetchItem} />
          )}
          <br />
          <AddToCart itemToAddInCart={data.fetchItem._id} />
          <br />
          <Comments itemDataForComm={data.fetchItem} />
        </div>
      </div>
    </div>
  );

  if (error) {
    return <Page404 />;
  }

  return (
    <div className="grid grid-col-2">
      {/* <div ref={refContainer}>STL File</div> */}
      <div>{itemData}</div>
    </div>
  );
};

export default ItemView;
