import api from "../../utils/api";
import { BusinessMeResponse } from "../../types/business";

/**
 * Resolve joins the customer to a business.
 * POST often returns empty body (Swagger: no response body),
 * so we fall back to GET /business/customer/business/{code}/.
 */
export const resolveBusiness = async (
  randomCode: string,
): Promise<BusinessMeResponse> => {
  const code = randomCode.trim();

  // 1) Join / resolve session on backend
  const resolveRes = await api.post(`/business/resolve/${code}/`);
  const resolveData = resolveRes.data;

  // If POST already returned a full business object
  if (resolveData && typeof resolveData === "object" && resolveData.name) {
    return resolveData as BusinessMeResponse;
  }

  // 2) Fetch business details by code
  try {
    const detailRes = await api.get(`/business/customer/business/${code}/`);
    if (detailRes.data && typeof detailRes.data === "object") {
      return {
        ...detailRes.data,
        random_code: detailRes.data.random_code || code,
      } as BusinessMeResponse;
    }
  } catch {
    // ignore — fall through to minimal object
  }

  // 3) Minimal safe payload so UI never reads undefined.name
  return {
    id: resolveData?.id ?? 0,
    name: resolveData?.name || `سالن ${code}`,
    slug: resolveData?.slug || "",
    random_code: code,
    business_type: resolveData?.business_type || "salon",
    address: resolveData?.address || "",
    phone_number: resolveData?.phone_number || "",
    is_active: resolveData?.is_active ?? true,
  };
};
