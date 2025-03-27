import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  currentImage,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (currentImage) {
      console.log("Current Image: ", currentImage);
      setPreviewUrl(currentImage);
    }
  }, [currentImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file selectiom
    const file = e.target.files?.[0];
    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-40 h-40 bg-slate-100 rounded-full relative flex items-center justify-center">
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
    </div>
  );
};

export default ImageUploader;
