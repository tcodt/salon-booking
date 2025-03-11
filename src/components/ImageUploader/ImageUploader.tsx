import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file selectiom
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  // Handle file upload
  // const handleUpload = () => {
  //   if (selectedFile) {
  //     console.log("Uploading file:", selectedFile.name);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-40 h-40 bg-white rounded-full relative flex items-center justify-center outline-4 outline-orange-500">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-full"
            />
          ) : (
            <FaUser color="gray" size={70} />
          )}
          <div className="p-3 bg-orange-500 text-white text-lg absolute bottom-2 right-0 rounded-full">
            <FaPencil />
          </div>
        </div>
      </label>

      {/* Upload Button */}
      {/* {selectedFile && (
        <button
          onClick={handleUpload}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Upload
        </button>
      )} */}
    </div>
  );
};

export default ImageUploader;
