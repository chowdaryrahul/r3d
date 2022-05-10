import React from "react";
import UploadDialog from "../components/UploadDialog";

const Create = () => {
  return (
    <div className="flex-auto flex-col md:flex-row w-screen h-full min-h-screen">
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Create</h1>
          </div>
        </header>
        <main>
          <div className=" mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <UploadDialog />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
