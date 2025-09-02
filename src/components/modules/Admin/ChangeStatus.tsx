"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // <-- make sure this exports your const + type
import {
  isValidStatusTransition,
  ParcelStatus,
} from "@/utils/statusChangerValidation";

interface StatusSelectorProps {
  currentStatus: ParcelStatus;
  onStatusChange: (newStatus: ParcelStatus) => void;
}

export function ParcelStatusSelector({
  currentStatus,
  onStatusChange,
}: StatusSelectorProps) {
  const [status, setStatus] = useState<ParcelStatus>(currentStatus);

  // ✅ collect all statuses
  const allStatuses: ParcelStatus[] = Object.values(ParcelStatus);

  // ✅ filter valid transitions
  const validNextStatuses = allStatuses.filter((s) =>
    isValidStatusTransition(currentStatus, s)
  );

  const handleChange = (value: string) => {
    const newStatus = value as ParcelStatus;
    setStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <div className="w-[220px]">
      <Select value={status} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {/* show current status but disabled */}
          <SelectItem value={currentStatus} disabled>
            {currentStatus}
          </SelectItem>
          {validNextStatuses.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
