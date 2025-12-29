import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export const useHomeTour = () => {
  useEffect(() => {
    // Check if the user already seen the tour
    const hasSeenTour = localStorage.getItem("home-tour-seen");
    document.body.classList.add("driver-active");

    if (hasSeenTour) return;

    // Wait until DOM elements exist
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
          description: "با کلیک روی این دکمه می‌توانید تم سایت را تغییر دهید.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#notif",
        popover: {
          title: "اعلان ها",
          description:
            "با کلیک روی این دکمه می‌توانید اعلان های سایت را مشاهده کنید.",
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

    setTimeout(() => {
      driverObj.drive();
    }, 300);
  }, []);
};
