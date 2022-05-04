import React from "react";
import UploadFile from "../components/UploadFile";

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
         <UploadFile/>          
        </main>
      </div>
    </div>
  );
};

export default Create;
