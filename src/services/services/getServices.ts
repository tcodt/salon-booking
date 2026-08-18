import { GetServices, GetServicesItem } from "../../types/services";
import api from "../../utils/api";

/** Owner panel only */
export const getOwnerServices = async (): Promise<GetServices> => {
  const response = await api.get("/business/services/");
  return Array.isArray(response.data) ? response.data : [];
};

/**
 * Customer catalog for a joined salon.
 *
 * Swagger has NO customer list for services.
 * Safe source: GET /packages/user/{random_code}/ → each package.services[]
 *
 * Do NOT call:
 * - /business/services/          → 403 for customers
 * - /business/customer/business/ → 404 on your API
 */
export const getCustomerServices = async (
  randomCode: string,
): Promise<GetServices> => {
  const code = randomCode.trim();
  if (!code) return [];

  const map = new Map<number, GetServicesItem>();

  try {
    const res = await api.get(`/packages/user/${encodeURIComponent(code)}/`);
    const packages = Array.isArray(res.data) ? res.data : [];

    for (const pkg of packages) {
      // Full nested Service objects
      const nested = Array.isArray(pkg?.services) ? pkg.services : [];
      for (const s of nested) {
        if (s && typeof s === "object" && typeof s.id === "number") {
          map.set(s.id, s as GetServicesItem);
        }
      }

      // Some APIs only send service_ids without expanding services
      const ids = Array.isArray(pkg?.service_ids) ? pkg.service_ids : [];
      for (const id of ids) {
        if (typeof id === "number" && !map.has(id)) {
          map.set(id, {
            id,
            name: `سرویس #${id}`,
            description: "",
            duration: "",
            price: "",
            business: pkg?.business,
            employee: undefined as unknown as GetServicesItem["employee"],
          });
        }
      }
    }
  } catch (err) {
    console.warn("packages/user failed for customer services", err);
  }

  return Array.from(map.values());
};
