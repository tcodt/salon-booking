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
import { useGetAvailableTimes } from "../../hooks/slots/useGetAvailableTimes";
import { useAddAppointment } from "../../hooks/appointments/useAddAppointment";
import {
  getEmployeeDisplayName,
  getEmployeeLabel,
  GetEmployeesItem,
} from "../../types/employees";

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Build employee list from selected service.employee (customer path) */
function employeesFromService(
  service: {
    employee?: unknown;
  } | null,
): GetEmployeesItem[] {
  if (!service?.employee) return [];

  const raw = service.employee;
  const list = Array.isArray(raw) ? raw : [raw];

  return list
    .map((emp, index) => {
      if (!emp || typeof emp !== "object") return null;
      const e = emp as Record<string, unknown>;
      const id =
        typeof e.id === "number"
          ? e.id
          : typeof e.employee_id === "number"
            ? e.employee_id
            : index + 1;

      return {
        id,
        skill: typeof e.skill === "string" ? e.skill : "",
        user: (e.user as GetEmployeesItem["user"]) ?? "آرایشگر",
      } satisfies GetEmployeesItem;
    })
    .filter(Boolean) as GetEmployeesItem[];
}

const Reserve: React.FC = () => {
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { themeColor } = useThemeColor();
  const { joinedBusiness, hasJoinedBusiness, isReady } = useJoinedBusiness();
  const { userType } = useUserType();
  const isCustomer = userType !== "owner";

  const {
    data: services = [],
    isLoading: servicesLoading,
    isError: servicesError,
  } = useGetServices();

  const {
    data: availableSlots = [],
    isLoading: slotsLoading,
    isError: slotsError,
  } = useGetAvailableTimes(selectedDate, serviceId);

  const addAppointmentMutation = useAddAppointment();

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId) ?? null,
    [services, serviceId],
  );

  const employees = useMemo(() => {
    const fromService = employeesFromService(selectedService);
    if (fromService.length) return fromService;

    // Fallback: unique employees mentioned on slots
    const map = new Map<number, GetEmployeesItem>();
    availableSlots.forEach((slot) => {
      if (typeof slot.employee_id === "number") {
        map.set(slot.employee_id, {
          id: slot.employee_id,
          skill: "",
          user: slot.employee_name || `کارمند ${slot.employee_id}`,
        });
      }
    });
    return Array.from(map.values());
  }, [selectedService, availableSlots]);

  // Auto-select single employee
  useEffect(() => {
    if (employees.length === 1) {
      setEmployeeId(employees[0].id);
    } else if (
      employeeId &&
      employees.length &&
      !employees.some((e) => e.id === employeeId)
    ) {
      setEmployeeId(null);
    }
  }, [employees, employeeId]);

  // Reset slot when date/service changes
  useEffect(() => {
    setSelectedSlotId(null);
  }, [serviceId, selectedDate]);

  const freeSlots = useMemo(() => {
    return availableSlots.filter((s) => s.is_available !== false);
  }, [availableSlots]);

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
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-${themeColor}-50 text-${themeColor}-600`}
        >
          <LuStore size={28} />
        </div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          ابتدا به یک سالن متصل شوید
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          برای رزرو، کد سالن را وارد کنید.
        </p>
        <Button type="button" onClick={() => navigate("/join-salon")}>
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
          queryClient.invalidateQueries({ queryKey: ["available-times"] });
          navigate("/appointments-list");
        },
        onError: (error: unknown) => {
          const ax = error as AxiosError<Record<string, unknown>>;
          const data = ax.response?.data;
          let message = "ثبت رزرو ناموفق بود.";
          if (data && typeof data === "object") {
            if (typeof data.detail === "string") message = data.detail;
            else {
              const first = Object.values(data).find(
                (v) => Array.isArray(v) && v[0],
              ) as string[] | undefined;
              if (first?.[0]) message = String(first[0]);
            }
          }
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
    <div className="mx-auto max-w-lg space-y-6 pb-10">
      <PageTitle title="رزرو نوبت" />

      {joinedBusiness && (
        <div
          className={`flex items-center justify-between gap-3 rounded-2xl bg-${themeColor}-50 px-4 py-3 dark:bg-gray-800`}
        >
          <div className="min-w-0">
            <p className="text-xs text-gray-500">سالن انتخاب‌شده</p>
            <p className="truncate font-semibold text-gray-800 dark:text-white">
              {joinedBusiness.name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/join-salon")}
            className={`text-xs font-semibold text-${themeColor}-600`}
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
            {services.map((s) => (
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
          {!servicesLoading && !services.length && (
            <p className="mt-2 text-sm text-gray-500">
              خدماتی برای این سالن یافت نشد. اگر پکیج/خدمات در پنل مالک ثبت شده
              باشد، اینجا نمایش داده می‌شود.
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
            disabled={!serviceId || !employees.length}
            onChange={(e) => {
              const v = Number(e.target.value);
              setEmployeeId(Number.isFinite(v) && v > 0 ? v : null);
              setSelectedSlotId(null);
            }}
          >
            <option value="">
              {!serviceId ? "ابتدا سرویس را انتخاب کنید" : "انتخاب آرایشگر"}
            </option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {getEmployeeLabel(emp)}
              </option>
            ))}
          </select>
          {serviceId && !employees.length && (
            <p className="mt-2 text-sm text-gray-500">
              آرایشگری روی این سرویس ثبت نشده است.
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">
            تاریخ
          </label>
          <input
            type="date"
            className="primary-input"
            value={selectedDate}
            min={todayISO()}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
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

        {serviceId && slotsError && (
          <p className="rounded-xl bg-rose-50 py-4 text-center text-sm text-rose-600">
            خطا در دریافت زمان‌های آزاد
          </p>
        )}

        {serviceId &&
          !slotsLoading &&
          !slotsError &&
          freeSlots.length === 0 && (
            <p className="rounded-xl bg-gray-50 py-6 text-center text-sm text-gray-500 dark:bg-gray-800/50">
              برای این تاریخ زمانی آزاد نیست
            </p>
          )}

        <div className="flex flex-col gap-2">
          {freeSlots.map((slot) => {
            const selected = selectedSlotId === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlotId(slot.id)}
                className={`rounded-2xl border bg-white p-4 text-right shadow-sm transition dark:bg-gray-800 ${
                  selected
                    ? `border-${themeColor}-500 ring-2 ring-${themeColor}-200`
                    : "border-transparent hover:border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    شروع:{" "}
                    <span className="font-medium text-gray-800 dark:text-white">
                      {slot.start_time ?? "—"}
                    </span>
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    تاریخ:{" "}
                    <span className="font-medium text-gray-800 dark:text-white">
                      {slot.date ?? selectedDate}
                    </span>
                  </span>
                </div>
                {slot.employee_name && (
                  <p className="mt-1 text-xs text-gray-400">
                    {getEmployeeDisplayName(slot.employee_name)}
                  </p>
                )}
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
