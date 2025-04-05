import React, { useEffect, useState, useCallback } from "react";
import { FaUser, FaPencil } from "react-icons/fa6";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  onUpload: (imageData: string) => void; // Changed to string for base64
  currentImage?: string; // Existing image URL or base64 string
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
      if (!file.type.startsWith("image/")) {
        toast.error("لطفاً یک فایل تصویری انتخاب کنید!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("حجم تصویر باید کمتر از ۵ مگابایت باشد!");
        return;
      }

      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(URL.createObjectURL(file)); // For preview
        onUpload(base64String); // Send base64 to parent
      };
      reader.onerror = () => {
        toast.error("خطا در بارگذاری تصویر!");
      };
      reader.readAsDataURL(file);
    },
    [onUpload]
  );

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <label className="cursor-pointer relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="w-40 h-40 bg-slate-100 border-4 border-orange-500 rounded-full flex items-center justify-center relative">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaUser color="gray" size={70} />
          )}
          <div className="p-3 bg-orange-500 text-white text-lg absolute bottom-2 right-2 rounded-full shadow-md hover:bg-orange-600 transition">
            <FaPencil />
          </div>
        </div>
      </label>
    </div>
  );
};

export default ImageUploader;
