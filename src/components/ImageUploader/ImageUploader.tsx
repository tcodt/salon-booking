import React, { useEffect, useState, useCallback } from "react";
import { FaUser, FaPencil } from "react-icons/fa6";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  onUpload: (file: File) => void; // Changed to File
  currentImage?: string; // Existing image URL
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUpload,
  currentImage,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImage || null
  );

  // Cleanup blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Update preview when currentImage changes
  useEffect(() => {
    setPreviewUrl(currentImage || null);
  }, [currentImage]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type and size
      const ALLOWED_TYPES = ["image/jpeg", "image/png"];
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error("لطفاً یک فایل JPEG یا PNG انتخاب کنید!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("حجم تصویر باید کمتر از ۵ مگابایت باشد!");
        return;
      }

      // Set preview and pass File to parent
      setPreviewUrl(URL.createObjectURL(file));
      onUpload(file);
    },
    [onUpload]
  );

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <label className="cursor-pointer relative">
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-32 h-3w-32 bg-slate-100 border-4 border-orange-500 rounded-full flex items-center justify-center relative">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaUser color="gray" size={70} />
          )}
          <div className="p-3 bg-orange-500 text-white text-lg absolute bottom-0 right-0 rounded-full shadow-md hover:bg-orange-600 transition">
            <FaPencil />
          </div>
        </div>
      </label>
    </div>
  );
};

export default ImageUploader;
