import { tutorialSeries } from "./tutorialSeries";
import ProgressRouter from "@/components/ProgressRouter";

export default function ForEveryoneRouter() {
  return (
    <ProgressRouter
      storageKey="forEveryone"
      tutorialSeries={tutorialSeries}
    />
  );
}