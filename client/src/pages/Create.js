import React from "react";

const Create = () => {
  return (
    <div className="flex-auto flex-col md:flex-row h-screen w-screen">
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Create</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}

            <div className="px-4 py-6 sm:px-0">
              <div className="flex flex-col px-6 py-12 items-center border-4 border-dashed border-gray-200 rounded-lg h-96 ">
                <svg
                  className="h-8 w-8 text-gray-500"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLineCap="round"
                  strokeLineJoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <circle cx="12" cy="13" r="3" />{" "}
                  <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />{" "}
                  <line x1="15" y1="6" x2="21" y2="6" />{" "}
                  <line x1="18" y1="3" x2="18" y2="9" />
                </svg>
                <p className="text-2xl text-gray-800 "> Drop image to upload</p>
                <p className="mb-2 text-gray-800"> Or </p>
                <label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 ring-offset-2 ring-indigo-500">
                  select Image
                  <input
                    type="file"
                    name="file"
                    multiple
                    class="sr-only"
                  ></input>
                </label>
                <p className=" mb-4  px-4 py-6 text-xs text-gray-600">
                  Image type : png,Jpeg,ico
                </p>
              </div>
            </div>

            {/* /End replace */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
