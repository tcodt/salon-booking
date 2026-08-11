/** Extract business id whether API returns object, nested id, or number */
export function getEntityBusinessId(entity: unknown): number | null {
  if (!entity || typeof entity !== "object") return null;
  const e = entity as Record<string, unknown>;

  if (typeof e.business_id === "number") return e.business_id;

  const business = e.business;
  if (typeof business === "number") return business;
  if (business && typeof business === "object") {
    const b = business as Record<string, unknown>;
    if (typeof b.id === "number") return b.id;
  }
  return null;
}

export function filterByBusinessId<T>(
  items: T[] | undefined,
  businessId: number | null | undefined,
): T[] {
  if (!items?.length) return [];
  if (!businessId) return [];
  return items.filter((item) => getEntityBusinessId(item) === businessId);
}
