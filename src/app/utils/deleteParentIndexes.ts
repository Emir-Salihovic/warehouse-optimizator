import { InventoryItem } from "../types";

/**
 * @description
 * Recursive function to delete parent items.
 * Check if the removed item is a dependency for any other
 * and if so remove its parents because the rule is that
 * we cannot have parent in warehouse if its dependencies
 * are not present
 */
export const deleteParentItems = (
  itemName: string,
  updatedItems: InventoryItem[]
) => {
  const parentIndexes = updatedItems.reduce(
    (indexes: number[], item: InventoryItem, index: number) => {
      if (item.dependencies.includes(itemName)) {
        indexes.push(index);
      }
      return indexes;
    },
    []
  );

  if (parentIndexes.length > 0) {
    parentIndexes.forEach((parentIndex: number) => {
      const parentItem = updatedItems[parentIndex];
      const parentItemName = parentItem.name;
      updatedItems.splice(parentIndex, 1); // Remove the parent item
      deleteParentItems(parentItemName, updatedItems); // Continue deleting its parent
    });
  }
};
