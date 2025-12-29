import React from "react";
import { getGreeting } from "../../utils/greetings";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router"; // اصلاح شده
import OfferCarousel from "../../components/OfferCarousel/OfferCarousel";
import PackagesList from "../../components/PackagesList/PackagesList";
import CommentForm from "../../components/CommentForm/CommentForm"; // فرم جدید
import { useGetProfile } from "../../hooks/profile/useGetProfile";
import { useGetComments } from "../../hooks/comments/useGetComments";
import { useThemeColor } from "../../context/ThemeColor";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Dots from "../../components/Dots/Dots";

const HomePage: React.FC = () => {
  const { data: userProfile } = useGetProfile();
  const greetingUser = getGreeting(userProfile?.first_name);
  const { themeColor } = useThemeColor();

  const { data: comments = [], isLoading: commentsLoading } = useGetComments();

  // فقط نظرات تأییدشده با امتیاز معتبر (۱ تا ۵) - جدیدترین اول
  const approvedComments = comments
    .filter((c) => c.rating >= 1 && c.rating <= 5)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 6); // حداکثر ۶ نظر نمایش بده

  return (
    <section className="space-y-8 pb-12">
      {/* سلام کاربر */}
      <motion.h3
        className="text-2xl font-bold text-gray-800 dark:text-white mt-4"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {greetingUser}
      </motion.h3>

      {/* نوار جستجو */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="جستجوی سرویس، آرایشگر یا ..."
          className={`w-full h-12 px-4 pr-12 bg-white dark:bg-gray-700 rounded-xl border-2 border-transparent focus:border-${themeColor}-500 outline-none transition-all shadow-sm text-base font-medium text-gray-800 dark:text-white`}
        />
        <CiSearch
          size={26}
          className={`absolute left-4 top-3 text-${themeColor}-500`}
        />
      </motion.div>

      {/* کاروسل پیشنهادات */}
      <OfferCarousel />

      {/* باکس رزرو نوبت */}
      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-3">رزرو نوبت آنلاین</h3>
        <p className="text-white/90 mb-6 leading-relaxed">
          همین حالا وقت خود را رزرو کنید و از خدمات حرفه‌ای ما لذت ببرید.
        </p>
        <Link
          to="/reserve"
          className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-md"
        >
          رزرو کن
        </Link>
      </motion.div>

      {/* لیست پکیج‌ها */}
      <PackagesList />

      {/* بخش نظرات مشتریان */}
      <div className="mt-12">
        <motion.h3
          className="text-2xl font-bold text-center mb-10 text-gray-800 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          نظرات مشتریان ما
        </motion.h3>

        {/* فرم ارسال نظر - فقط برای کاربران لاگین شده */}
        {
          userProfile && (
            <CommentForm businessId={1} />
          ) /* اگر چند بیزینس داری، id رو داینامیک کن */
        }

        {/* نمایش نظرات */}
        {commentsLoading ? (
          <div className="flex justify-center py-12">
            <Dots />
          </div>
        ) : approvedComments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              هنوز هیچ نظری ثبت نشده است.
            </p>
            {userProfile && (
              <p className="text-sm text-gray-400 mt-2">
                شما می‌توانید اولین نظر را ثبت کنید!
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {approvedComments.map((comment, index) => (
              <motion.div
                key={comment.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    {userProfile?.first_name + " " + userProfile?.last_name}
                  </h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={20}
                          className={
                            i < comment.rating
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }
                        />
                      ))}
                    </div>
                    <span className="mr-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      ({comment.rating} از ۵)
                    </span>
                  </div>
                </div>

                {/* متن نظر */}
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed mb-5">
                  "{comment.content}"
                </p>

                {/* تاریخ */}
                <p className="text-xs text-gray-500 dark:text-gray-500 text-left">
                  {new Date(comment.created_at).toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* فوتر */}
      <footer className="mt-16 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} تمامی حقوق محفوظ است.
        </p>
      </footer>
    </section>
  );
};

export default HomePage;
