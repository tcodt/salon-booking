import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAddComment } from "../../hooks/comments/useAddComment";
// import { useThemeColor } from "../../context/ThemeColor";
import Button from "../Button/Button";
import toast from "react-hot-toast";

interface CommentFormProps {
  serviceId?: number;
  businessId?: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ serviceId, businessId }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  //   const { themeColor } = useThemeColor();
  const addCommentMutation = useAddComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("لطفاً امتیاز ستاره‌ای انتخاب کنید");
      return;
    }
    if (!content.trim()) {
      toast.error("لطفاً نظر خود را بنویسید");
      return;
    }

    addCommentMutation.mutate({
      target_type: serviceId ? "service" : "business",
      content: content.trim(),
      rating,
      service: serviceId,
      business: businessId,
    });

    setContent("");
    setRating(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 p-5 bg-gray-50 dark:bg-gray-800 rounded-xl"
    >
      <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
        نظر شما چیست؟
      </h4>

      {/* ستاره‌ها */}
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={28}
            className={`cursor-pointer transition-colors ${
              (hoveredRating || rating) >= star
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
          />
        ))}
        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
          {rating > 0 && `(${rating} از ۵)`}
        </span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="نظر خود را اینجا بنویسید..."
        rows={4}
        className="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-${themeColor}-500 outline-none transition dark:text-white/70"
      />

      <Button type="submit" disabled={addCommentMutation.isPending}>
        {addCommentMutation.isPending ? "در حال ارسال..." : "ارسال نظر"}
      </Button>
    </form>
  );
};

export default CommentForm;
