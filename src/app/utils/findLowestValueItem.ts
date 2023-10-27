import { InventoryItem } from "../types";

// Find the lowest item in the selected items array
// Lowest value item is considered the item with the highest priority
// and lowest value properties
export const findLowestValueItem = (selectedWarehousItems: InventoryItem[]) => {
  if (selectedWarehousItems.length === 0) {
    return null; // No items in the array
  }

  let lowestValueItem = selectedWarehousItems[0];
  for (const item of selectedWarehousItems) {
    if (item.value < lowestValueItem.value) {
      lowestValueItem = item;
    }

    if (item.priority < lowestValueItem.priority) {
      lowestValueItem = item;
    }
  }
  return lowestValueItem;
};
