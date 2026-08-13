import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { LuCalendarClock, LuStore } from "react-icons/lu";

import Button from "../../components/Button/Button";
import PageTitle from "../../components/PageTitle/PageTitle";
import Dots from "../../components/Dots/Dots";
import { useThemeColor } from "../../context/ThemeColor";
import { useJoinedBusiness } from "../../context/JoinedBusinessContext";
import { useUserType } from "../../context/UserTypeContext";
import { useGetServices } from "../../hooks/services/useGetServices";
import { useGetEmployees } from "../../hooks/employees/useGetEmployees";
import { useGetSlots } from "../../hooks/slots/useGetSlots";
import { useAddAppointment } from "../../hooks/appointments/useAddAppointment";
import { filterByBusinessId } from "../../utils/filterByJoinedBusiness";
import { getEmployeeLabel } from "../../types/employees";

function getSlotServiceId(slot: {
  service?: number | { id?: number };
  service_id?: number;
}): number | null {
  if (typeof slot.service_id === "number") return slot.service_id;
  if (typeof slot.service === "number") return slot.service;
  if (slot.service && typeof slot.service === "object") {
    return typeof slot.service.id === "number" ? slot.service.id : null;
  }
  return null;
}

const Reserve: React.FC = () => {
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { themeColor } = useThemeColor();
  const { joinedBusiness, hasJoinedBusiness, isReady } = useJoinedBusiness();
  const { userType } = useUserType();
  const isCustomer = userType !== "owner";

  const {
    data: servicesData = [],
    isLoading: servicesLoading,
    isError: servicesError,
  } = useGetServices();
  const { data: employeesData = [], isLoading: employeesLoading } =
    useGetEmployees();
  const { data: slots = [], isPending: slotsLoading } = useGetSlots();
  const addAppointmentMutation = useAddAppointment();

  const businessId = joinedBusiness?.id ?? null;

  const scopedServices = useMemo(() => {
    if (!isCustomer) return servicesData;
    return filterByBusinessId(servicesData, businessId);
  }, [servicesData, businessId, isCustomer]);

  /** Prefer employees linked to selected service; else scoped staff list */
  const scopedEmployees = useMemo(() => {
    if (serviceId) {
      const selected = scopedServices.find((s) => s.id === serviceId);
      if (selected?.employee) {
        const emp = selected.employee;
        const empId =
          typeof emp === "object" && emp && "id" in emp
            ? (emp as { id: number }).id
            : null;
        if (empId != null) {
          const fromList = employeesData.find((e) => e.id === empId);
          if (fromList) return [fromList];
          // Build minimal item from nested service.employee
          return [
            {
              id: empId,
              skill:
                typeof emp === "object" && "skill" in emp
                  ? String((emp as { skill?: string }).skill || "")
                  : "",
              user:
                typeof emp === "object" && "user" in emp
                  ? (emp as { user: unknown }).user
                  : typeof emp === "object" && "user" in (emp as object)
                    ? (emp as { user: unknown }).user
                    : "آرایشگر",
            },
          ] as typeof employeesData;
        }
      }
    }

    if (!isCustomer) return employeesData;
    const filtered = filterByBusinessId(employeesData, businessId);
    // Fallback: all employees returned by API (already owner-scoped or empty)
    return filtered.length ? filtered : employeesData;
  }, [serviceId, scopedServices, employeesData, businessId, isCustomer]);

  // When service changes, reset employee if not in new list
  useEffect(() => {
    setSelectedSlotId(null);
    if (
      employeeId &&
      scopedEmployees.length &&
      !scopedEmployees.some((e) => e.id === employeeId)
    ) {
      setEmployeeId(null);
    }
  }, [serviceId, scopedEmployees, employeeId]);

  const availableSlots = useMemo(() => {
    if (!serviceId) return [];
    return slots.filter((slot) => {
      if (!slot.is_available) return false;
      const sid = getSlotServiceId(slot);
      return sid === serviceId;
    });
  }, [slots, serviceId]);

  if (!isReady) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Dots />
      </div>
    );
  }

  if (isCustomer && !hasJoinedBusiness) {
    return (
      <div className="mx-auto max-w-md space-y-4 py-12 text-center">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-${themeColor}-50 text-${themeColor}-600 dark:bg-gray-800`}
        >
          <LuStore size={28} />
        </div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          ابتدا به یک سالن متصل شوید
        </h2>
        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
          برای مشاهده خدمات و رزرو نوبت، کد اختصاصی سالن را وارد کنید.
        </p>
        <Button type="button" onClick={() => navigate("/random-code-input")}>
          ورود کد کسب‌وکار
        </Button>
      </div>
    );
  }

  const handleBooking = () => {
    if (!serviceId || !employeeId || !selectedSlotId) {
      toast.error("لطفاً سرویس، آرایشگر و زمان را انتخاب کنید");
      return;
    }

    addAppointmentMutation.mutate(
      {
        service_id: serviceId,
        employee_id: employeeId,
        time_slot_id: selectedSlotId,
      },
      {
        onSuccess: () => {
          toast.success("رزرو شما با موفقیت ثبت شد");
          queryClient.invalidateQueries({ queryKey: ["appointments"] });
          queryClient.invalidateQueries({ queryKey: ["slots"] });
          navigate("/appointments-list");
        },
        onError: (error: unknown) => {
          const ax = error as AxiosError<Record<string, unknown>>;
          const data = ax.response?.data;
          let message = "ثبت رزرو ناموفق بود. دوباره تلاش کنید.";
          if (data && typeof data === "object") {
            if (typeof data.detail === "string") message = data.detail;
            else {
              const first = Object.values(data).find(
                (v) => Array.isArray(v) && v[0],
              ) as string[] | undefined;
              if (first?.[0]) message = String(first[0]);
            }
          }
          console.error("Reserve error", ax.response?.status, data);
          toast.error(message);
        },
      },
    );
  };

  const canSubmit =
    !!serviceId &&
    !!employeeId &&
    !!selectedSlotId &&
    !addAppointmentMutation.isPending;

  return (
    <div className="mx-auto max-w-lg space-y-6 pb-8">
      <PageTitle title="رزرو نوبت" />

      {/* Joined salon chip */}
      {joinedBusiness && (
        <div
          className={`flex items-center justify-between gap-3 rounded-2xl bg-${themeColor}-50 px-4 py-3 dark:bg-gray-800`}
        >
          <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              سالن انتخاب‌شده
            </p>
            <p className="truncate font-semibold text-gray-800 dark:text-white">
              {joinedBusiness.name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/random-code-input")}
            className={`shrink-0 text-xs font-semibold text-${themeColor}-600`}
          >
            تغییر سالن
          </button>
        </div>
      )}

      <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        {/* Service */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
            سرویس
          </label>
          <select
            className="primary-input"
            value={serviceId ?? ""}
            disabled={servicesLoading}
            onChange={(e) => {
              const v = Number(e.target.value);
              setServiceId(Number.isFinite(v) && v > 0 ? v : null);
              setEmployeeId(null);
              setSelectedSlotId(null);
            }}
          >
            <option value="">انتخاب سرویس</option>
            {scopedServices.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
                {s.price
                  ? ` — ${Number(s.price).toLocaleString("fa-IR")} تومان`
                  : ""}
              </option>
            ))}
          </select>
          {servicesLoading && (
            <div className="mt-2">
              <Dots />
            </div>
          )}
          {servicesError && (
            <p className="mt-1 text-xs text-red-500">خطا در دریافت خدمات</p>
          )}
          {!servicesLoading && !scopedServices.length && (
            <p className="mt-2 text-sm text-gray-500">
              سرویسی برای این سالن یافت نشد.
            </p>
          )}
        </div>

        {/* Employee */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
            آرایشگر
          </label>
          <select
            className="primary-input"
            value={employeeId ?? ""}
            disabled={employeesLoading || !serviceId}
            onChange={(e) => {
              const v = Number(e.target.value);
              setEmployeeId(Number.isFinite(v) && v > 0 ? v : null);
              setSelectedSlotId(null);
            }}
          >
            <option value="">
              {!serviceId ? "ابتدا سرویس را انتخاب کنید" : "انتخاب آرایشگر"}
            </option>
            {scopedEmployees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {getEmployeeLabel(emp)}
              </option>
            ))}
          </select>
          {employeesLoading && (
            <div className="mt-2">
              <Dots />
            </div>
          )}
          {serviceId && !employeesLoading && !scopedEmployees.length && (
            <p className="mt-2 text-sm text-gray-500">
              آرایشگری برای این سرویس ثبت نشده است.
            </p>
          )}
        </div>
      </div>

      {/* Slots */}
      <div className="space-y-3">
        <span className="flex items-center gap-2 text-base font-semibold text-gray-700 dark:text-gray-200">
          <LuCalendarClock size={22} className={`text-${themeColor}-500`} />
          زمان‌های آزاد
        </span>

        {!serviceId && (
          <p className="rounded-xl bg-gray-50 py-6 text-center text-sm text-gray-500 dark:bg-gray-800/50">
            ابتدا یک سرویس انتخاب کنید
          </p>
        )}

        {serviceId && slotsLoading && (
          <div className="py-6">
            <Dots />
          </div>
        )}

        {serviceId && !slotsLoading && availableSlots.length === 0 && (
          <p className="rounded-xl bg-gray-50 py-6 text-center text-sm text-gray-500 dark:bg-gray-800/50">
            در حال حاضر زمانی برای این سرویس آزاد نیست
          </p>
        )}

        <div className="flex flex-col gap-2">
          {availableSlots.map((slot) => {
            const selected = selectedSlotId === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlotId(slot.id)}
                className={`rounded-2xl border bg-white p-4 text-right shadow-sm transition dark:bg-gray-800 ${
                  selected
                    ? `border-${themeColor}-500 ring-2 ring-${themeColor}-200 dark:ring-${themeColor}-900`
                    : "border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    شروع:{" "}
                    <span className="font-medium text-gray-800 dark:text-white">
                      {slot.start_time}
                    </span>
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    تاریخ:{" "}
                    <span className="font-medium text-gray-800 dark:text-white">
                      {slot.date}
                    </span>
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`h-4 w-4 rounded-full border-2 border-${themeColor}-500 ${
                      selected ? `bg-${themeColor}-500` : "bg-transparent"
                    }`}
                  />
                  <span className="text-xs text-gray-500">
                    {selected ? "انتخاب شده" : "انتخاب این زمان"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        type="button"
        variant="primary"
        onClick={handleBooking}
        disabled={!canSubmit}
      >
        {addAppointmentMutation.isPending ? "در حال ثبت..." : "ثبت رزرو"}
      </Button>
    </div>
  );
};

export default Reserve;
