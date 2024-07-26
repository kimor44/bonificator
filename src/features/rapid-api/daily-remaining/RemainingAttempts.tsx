"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { getCallApisRemaining } from "@/lib/rapid-api/helpers";

export const RemainingAttempts = () => {
  const [attempts, setAttempts] = useState<number>(0);

  const getAttemptsReaming = async () => {
    const remaining = await getCallApisRemaining();
    setAttempts(remaining);
  };

  getAttemptsReaming();

  const classes = attempts < 10 && "text-red-700";
  return (
    <div>
      Attempts remaining :{" "}
      <span className={cn(classes, "font-bold, font-bold")}>{attempts}</span>
    </div>
  );
};
