import { InventoryItem } from "../types";

export const calculateCurrentWarehouseSize = (
  warehouseItems: InventoryItem[]
): number => {
  return warehouseItems.reduce(
    (total: number, item: InventoryItem) => total + item.size,
    0
  );
};
