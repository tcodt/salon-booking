import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export const useHomeTour = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSeenTour = localStorage.getItem("home-tour-seen");
    if (hasSeenTour) return;

    const timeout = setTimeout(() => {
      // ✅ Ensure all elements exist
      const requiredSelectors = ["#theme-toggle", "#notif", "#sidebar"];
      const allExist = requiredSelectors.every((sel) =>
        document.querySelector(sel)
      );

      if (!allExist) return;

      document.body.classList.add("driver-active");

      const driverObj = driver({
        animate: true,
        showProgress: true,
        allowClose: true,
        doneBtnText: "فهمیدم!",
        prevBtnText: "قبلی",
        nextBtnText: "بعدی",

        onDestroyed: () => {
          document.body.classList.remove("driver-active");
          localStorage.setItem("home-tour-seen", "true");
        },
      });

      driverObj.setSteps([
        {
          element: "#theme-toggle",
          popover: {
            title: "تغییر تم",
            description:
              "با کلیک روی این دکمه می‌توانید تم سایت را تغییر دهید.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#notif",
          popover: {
            title: "اعلان‌ها",
            description:
              "با کلیک روی این دکمه می‌توانید اعلان‌های سایت را مشاهده کنید.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#sidebar",
          popover: {
            title: "منوی اصلی",
            description:
              "با کلیک روی این دکمه می‌توانید منوی اصلی سایت را باز و بسته کنید.",
            side: "bottom",
            align: "center",
          },
        },
      ]);

      driverObj.drive();
    }, 600); // ⏳ wait for layout + hydration

    return () => {
      clearTimeout(timeout);
      document.body.classList.remove("driver-active");
      driver()?.destroy();
    };
  }, []);
};
