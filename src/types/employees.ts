import { User } from "./users";

/** Swagger Employee.user is often a string; sometimes a full User object */
export type EmployeeUser = User | string;

export interface Employee {
  id: number;
  user: EmployeeUser;
  skill: string;
  business?: string | number;
}

export interface GetEmployeesItem {
  id: number;
  skill: string;
  user: EmployeeUser;
  business?: string | number;
}

export type GetEmployees = GetEmployeesItem[];

export type NewEmployeeType = {
  user_id: number;
  skill: string;
};

export interface NewEmployeeUserObj {
  id: number;
  name: string;
  phone: string;
}

export type NewEmployeePromiseType = {
  id: number;
  user: NewEmployeeUserObj | string;
  skill: string;
};

export function isUserObject(
  user: EmployeeUser | null | undefined,
): user is User {
  return typeof user === "object" && user !== null;
}

/** Primary label for cards / selects */
export function getEmployeeDisplayName(user?: EmployeeUser | null): string {
  if (user == null) return "بدون نام";

  // API: "علی رضایی" or "Ali"
  if (typeof user === "string") {
    const t = user.trim();
    return t || "بدون نام";
  }

  // Nested user object
  const full = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (full) return full;

  // Some payloads use name
  if ("name" in user && typeof (user as { name?: string }).name === "string") {
    const n = (user as { name: string }).name.trim();
    if (n) return n;
  }

  return "بدون نام";
}

export function getEmployeeFirstName(user?: EmployeeUser | null): string {
  if (user == null) return "بدون نام";
  if (typeof user === "string") return user.trim() || "بدون نام";
  return user.first_name?.trim() || getEmployeeDisplayName(user);
}

export function getEmployeePhone(user?: EmployeeUser | null): string {
  if (!isUserObject(user)) return "—";
  return user.phone_number || "—";
}

export function getEmployeeImage(user?: EmployeeUser | null): string | null {
  if (!isUserObject(user)) return null;
  return user.image || null;
}

export function getEmployeeIsActive(user?: EmployeeUser | null): boolean {
  if (!isUserObject(user)) return true;
  return user.is_active !== false;
}

export function getEmployeeIsOwner(user?: EmployeeUser | null): boolean {
  if (!isUserObject(user)) return false;
  return !!user.is_owner;
}

export function getEmployeeIsStaff(user?: EmployeeUser | null): boolean {
  if (!isUserObject(user)) return false;
  return !!user.is_staff;
}

export function getEmployeeUserId(user?: EmployeeUser | null): number | null {
  if (!isUserObject(user)) return null;
  return typeof user.id === "number" ? user.id : null;
}

export function getEmployeeLabel(emp: {
  id: number;
  skill?: string;
  user?: EmployeeUser | null;
}): string {
  const name = getEmployeeDisplayName(emp.user);
  return emp.skill?.trim() ? `${name} — ${emp.skill}` : name;
}
