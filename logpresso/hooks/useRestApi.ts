import { useContext } from "react";
import { LogpressoContext } from "../providers/LogpressoProvider";

export function useRestApi() {
  const context = useContext(LogpressoContext);
  if (!context) {
    throw new Error("useRestApi must be used within a LogpressoProvider");
  }

  const { restApiService } = context;

  return {
    ...context,
    restApiService,
    call: restApiService?.fetch.bind(restApiService),
  };
}
