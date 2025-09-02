export const ParcelStatus = {
  REQUESTED: "REQUESTED",
  APPROVED: "APPROVED",
  DISPATCH: "DISPATCH",
  IN_TRANSIT: "IN_TRANSIT",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  RETURNED: "RETURNED",
} as const;

export type ParcelStatus = (typeof ParcelStatus)[keyof typeof ParcelStatus];

export function isValidStatusTransition(
  currentStatus: ParcelStatus,
  newStatus: ParcelStatus
): boolean {
  const validTransitions: Record<ParcelStatus, ParcelStatus[]> = {
    [ParcelStatus.REQUESTED]: [ParcelStatus.APPROVED, ParcelStatus.CANCELLED],
    [ParcelStatus.APPROVED]: [ParcelStatus.DISPATCH, ParcelStatus.CANCELLED],
    [ParcelStatus.DISPATCH]: [ParcelStatus.IN_TRANSIT, ParcelStatus.RETURNED],
    [ParcelStatus.IN_TRANSIT]: [ParcelStatus.DELIVERED, ParcelStatus.RETURNED],
    [ParcelStatus.DELIVERED]: [],
    [ParcelStatus.CANCELLED]: [],
    [ParcelStatus.RETURNED]: [],
  };

  return validTransitions[currentStatus].includes(newStatus);
}
