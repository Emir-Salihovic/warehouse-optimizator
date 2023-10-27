import { AlertOptions, Severity } from "@/app/types";
import { Dispatch, SetStateAction, useEffect } from "react";

interface AlertProps {
  alertOptions: AlertOptions;
  setAlertOptions: Dispatch<SetStateAction<AlertOptions>>;
}

const Alert: React.FC<AlertProps> = ({ alertOptions, setAlertOptions }) => {
  const background =
    alertOptions.severity === Severity.ERROR
      ? "bg-red-500"
      : alertOptions.severity === Severity.WARNING
      ? "bg-orange-500"
      : alertOptions.severity === Severity.INFO
      ? "bg-blue-500"
      : "bg-green-500";

  /**
   * @description Monitors the alertOptions state for changes
   * and automatically closes the alert after a timeout.
   */
  useEffect(() => {
    // Set a timeout to clear the alert after 5 seconds
    const alertOptionsTimeout = setTimeout(() => {
      setAlertOptions({
        message: "",
        open: false,
        hideAfter: 5000,
        severity: Severity.ERROR,
      });
    }, 5000);

    // Clean up by clearing the timeout when the component unmounts or when alertOptions.message changes
    return () => {
      clearTimeout(alertOptionsTimeout);
    };
  }, [alertOptions.message]);

  return (
    alertOptions.open && (
      <div className="fixed bottom-4 left-[50%] translate-x-[-50%]">
        <div
          className={`rounded-md text-white ${background} flex items-center justify-center p-4`}
        >
          {alertOptions.message}
        </div>
      </div>
    )
  );
};

export default Alert;
