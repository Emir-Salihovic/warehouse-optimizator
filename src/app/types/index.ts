export interface InventoryItem {
  name: string;
  size: number;
  value: number;
  priority: number;
  dependencies: string[];
}

export enum Severity {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}

export interface AlertOptions {
  message: string;
  open: boolean;
  severity: Severity;
  hideAfter: number;
}
