"use client";

import { useEffect, useState } from "react";
import { remainingAttemptsAction } from "./remaining-attempts.action";
import { cn } from "@/lib/utils";

export const RemainingAttempts = () => {
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    const getAttempts = async () => {
      const attempts = await remainingAttemptsAction();
      const finalAttempts = attempts.attempts;
      setAttempts(finalAttempts);
    };

    getAttempts();
  }, []);
  const classes = attempts < 10 && "text-red-700";
  return (
    <div>
      Attempts remaining :{" "}
      <span className={cn(classes, "font-bold, font-bold")}>{attempts}</span>
    </div>
  );
};
