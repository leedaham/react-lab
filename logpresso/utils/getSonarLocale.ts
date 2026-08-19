type SonarWindow = Window & {
  SONAR?: {
    locale?: string;
  };
};

export type GetSonarLocaleOptions = {
  fallbackLocale?: string;
  debug?: boolean;
};

const readLocale = (target: Window | undefined) =>
  (target as SonarWindow | undefined)?.SONAR?.locale;

export function getSonarLocale({
  fallbackLocale = "en",
  debug = false,
}: GetSonarLocaleOptions = {}) {
  if (typeof window === "undefined") {
    return fallbackLocale;
  }

  try {
    if (debug) {
      console.log("Current window.SONAR locale:", readLocale(window));
    }

    if (window.parent !== window) {
      if (debug) {
        console.log("Attempting to access parent window.SONAR");
      }

      const parentLocale = readLocale(window.parent);
      if (parentLocale) {
        if (debug) {
          console.log("Using parent window locale:", parentLocale);
        }
        return parentLocale;
      }
    }

    const currentLocale = readLocale(window);
    if (currentLocale) {
      if (debug) {
        console.log("Using current window locale:", currentLocale);
      }
      return currentLocale;
    }

    if (debug) {
      console.log("Using fallback locale:", fallbackLocale);
    }
    return fallbackLocale;
  } catch (error) {
    if (debug) {
      console.error("Error fetching SONAR locale:", error);
    }
    return fallbackLocale;
  }
}
