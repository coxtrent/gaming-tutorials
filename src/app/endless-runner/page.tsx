"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { tutorialSeries, tutorialSeriesName } from "./tutorialSeries";
import ProgressRouter from "@/components/ProgressRouter";

export default function ForEveryoneRouter() {
  return (
    <ProgressRouter
      storageKey={tutorialSeriesName}
      tutorialSeries={tutorialSeries}
    />
  );
}