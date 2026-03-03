import { WebHaptics, defaultPatterns } from "web-haptics";

const webHaptics = new WebHaptics();

type HapticType =
  | "light"
  | "medium"
  | "heavy"
  | "selection"
  | "success"
  | "error"
  | "warning";

export function haptic(type: HapticType) {
  webHaptics.trigger(defaultPatterns[type]);
}
