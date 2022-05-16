import React, { useState, useContext } from "react";
import UploadDialog from "../components/UploadDialog";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../firebase/Auth";
import queries from "../queries";

const Create = () => {
  const { user, userUpdate, isValidUser } = useContext(AuthContext);
  console.log(user);
  const [createItem, { data, loading, error }] = useMutation(
    queries.CREATE_ITEM
  );
  const navigate = useNavigate();
  const [create, setCreate] = useState({
    title: "",
    user_id: `${user.uid}`,
    user_name: `${user.displayName}`,
    category: "",
    tags: "",
    description: "",
    uploadDate: new Date(),
    license: "",
    price: 0,
    printer: "",
    printer_brand: "",
    rafts: "",
    supports: "",
    resolution: "",
    infill: "",
    filament_brand: "",
    filament_color: "",
    filament_material: "",
    images: [],
  });
  const handleSubmit = async (e) => {
    const images = JSON.parse(localStorage.getItem("images"));
    console.log(images);
    setCreate({ ...create, uploadDate: new Date() });
    setCreate({ ...create, images: images });
    e.preventDefault();
    await createItem({ variables: { ...create } }).then(() => navigate("/"));
  };
  console.log(create);

  return (
    <div className="flex-auto flex-col md:flex-row w-screen h-full min-h-screen">
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl flex flex-inline justify-center font-bold text-gray-900">
              Create your own project{" "}
            </h1>
          </div>
        </header>
        <div>
          <form>
            {error && <p style={{ color: "red" }}>{error.message}</p>}

            <div className="shadow px-8 py-8 overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="title"
                      className="block text-medium font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={create.title}
                      onChange={(e) =>
                        setCreate({ ...create, title: e.target.value })
                      }
                      id="title"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="user_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      UserName
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      value={create.user_name}
                      id="username"
                      autoComplete="family-name"
                      readOnly={true}
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tags(#)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={create.tags}
                      onChange={(e) =>
                        setCreate({ ...create, tags: e.target.value })
                      }
                      id="tags"
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={create.description}
                      onChange={(e) =>
                        setCreate({ ...create, description: e.target.value })
                      }
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      onChange={(e) =>
                        setCreate({ ...create, category: e.target.value })
                      }
                      className="mt-1 block w-full py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value={"houses"}>Houses</option>
                      <option value={"groceries"}>Groceries</option>
                      <option value={"items"}>Items</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    {/* <label
                      htmlFor="upload_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload Date
                    </label>
                    <input
                      type="date"
                      name="upload_date"
                      value={create.upload_date}
                      onChange={(e) =>
                        setCreate({ ...create, upload_date: e.target.value })
                      }
                      id="upload_date"
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    /> */}
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="license"
                      className="block text-sm font-medium text-gray-700"
                    >
                      License
                    </label>
                    <input
                      type="text"
                      name="license"
                      id="license"
                      value={create.license}
                      onChange={(e) =>
                        setCreate({ ...create, license: e.target.value })
                      }
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={create.price}
                      onChange={(e) =>
                        setCreate({ ...create, price: Number(e.target.value) })
                      }
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="printer"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Printer
                    </label>
                    <input
                      type="text"
                      name="printer"
                      id="printer"
                      value={create.printer}
                      onChange={(e) =>
                        setCreate({ ...create, printer: e.target.value })
                      }
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="printer_brand"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Printer Brand
                    </label>
                    <input
                      type="text"
                      name="printer_brand"
                      id="printer_brand"
                      value={create.printer_brand}
                      onChange={(e) =>
                        setCreate({ ...create, printer_brand: e.target.value })
                      }
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="rafts"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Rafts
                    </label>
                    <input
                      type="text"
                      name="rafts"
                      id="rafts"
                      value={create.rafts}
                      onChange={(e) =>
                        setCreate({ ...create, rafts: e.target.value })
                      }
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 py-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="supports"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Supports
                    </label>
                    <input
                      type="text"
                      name="supports"
                      id="supports"
                      value={create.supports}
                      onChange={(e) =>
                        setCreate({ ...create, supports: e.target.value })
                      }
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="resolution"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Resolution
                    </label>
                    <input
                      type="text"
                      name="resolution"
                      id="resolution"
                      value={create.resolution}
                      onChange={(e) =>
                        setCreate({ ...create, resolution: e.target.value })
                      }
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="infill"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Infill
                    </label>
                    <input
                      type="text"
                      name="infill"
                      id="infill"
                      value={create.infill}
                      onChange={(e) =>
                        setCreate({ ...create, infill: e.target.value })
                      }
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="filament_brand"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Filament Brand
                    </label>
                    <input
                      type="text"
                      name="filament_brand"
                      id="filament_brand"
                      value={create.filament_brand}
                      onChange={(e) =>
                        setCreate({ ...create, filament_brand: e.target.value })
                      }
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="filament_color"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Filament Color
                    </label>
                    <input
                      type="text"
                      name="filament_color"
                      id="filament_color"
                      value={create.filament_color}
                      onChange={(e) =>
                        setCreate({ ...create, filament_color: e.target.value })
                      }
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="filament_material"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Filament Material
                    </label>
                    <input
                      type="text"
                      name="filament_material"
                      id="filament_material"
                      value={create.filament_material}
                      onChange={(e) =>
                        setCreate({
                          ...create,
                          filament_material: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="min-h-full"></div>
                </div>
              </div>
              <main>
                <div className=" mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                    <UploadDialog />
                  </div>
                </div>
              </main>
              <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                <button
                  onClick={(e) => handleSubmit(e)}
                  style={{ width: "-webkit-fill-available" }}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
