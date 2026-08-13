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

/**
 * Filter by business id.
 * If items have NO business field at all, return them unchanged
 * (API may already be scoped / omit business on list payloads).
 */
export function filterByBusinessId<T>(
  items: T[] | undefined,
  businessId: number | null | undefined,
): T[] {
  if (!items?.length) return [];
  if (!businessId) return [];

  const anyHasBusiness = items.some(
    (item) => getEntityBusinessId(item) != null,
  );

  if (!anyHasBusiness) {
    return items;
  }

  return items.filter((item) => getEntityBusinessId(item) === businessId);
}
