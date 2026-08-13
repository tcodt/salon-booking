import { isAxiosError } from "axios";
import api from "../../utils/api";
import { BusinessMeResponse } from "../../types/business";

function pickBusiness(
  data: unknown,
  fallbackCode: string,
): BusinessMeResponse | null {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;

  // Some APIs nest under .business
  const raw =
    d.business && typeof d.business === "object"
      ? (d.business as Record<string, unknown>)
      : d;

  const id = typeof raw.id === "number" ? raw.id : null;
  if (id == null || id <= 0) return null;

  return {
    ...(raw as unknown as BusinessMeResponse),
    id,
    name: String(raw.name ?? "").trim() || `سالن ${fallbackCode}`,
    random_code: String(raw.random_code ?? fallbackCode),
  };
}

/**
 * Join customer to salon by code.
 * Requires JWT (Swagger: مشتری باید لاگین باشد).
 */
export const resolveBusiness = async (
  randomCode: string,
): Promise<BusinessMeResponse> => {
  const code = randomCode.trim();
  if (!code) {
    throw Object.assign(new Error("کد خالی است"), {
      response: { status: 400, data: { detail: "کد را وارد کنید" } },
    });
  }

  const encoded = encodeURIComponent(code);

  // 1) POST resolve (creates the join on backend)
  try {
    const resolveRes = await api.post(`/business/resolve/${encoded}/`);
    const fromPost = pickBusiness(resolveRes.data, code);
    if (fromPost) return fromPost;
  } catch (err) {
    if (isAxiosError(err)) {
      const status = err.response?.status;
      // Real client errors → bubble up for toast
      if (
        status === 400 ||
        status === 404 ||
        status === 401 ||
        status === 403
      ) {
        throw err;
      }
      // 5xx / network: still try GET detail below
      console.warn("resolve POST failed, trying GET detail", status);
    } else {
      throw err;
    }
  }

  // 2) GET business by code (detail)
  try {
    const detailRes = await api.get(`/business/customer/business/${encoded}/`);
    const fromGet = pickBusiness(detailRes.data, code);
    if (fromGet) return fromGet;

    // 200 with empty / unusable body
    throw Object.assign(new Error("empty business payload"), {
      response: {
        status: 404,
        data: { detail: "آرایشگاهی با این کد یافت نشد." },
      },
    });
  } catch (err) {
    if (isAxiosError(err) || (err as { response?: unknown })?.response) {
      throw err;
    }
    throw err;
  }
};
