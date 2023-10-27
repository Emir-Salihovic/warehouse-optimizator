"use client";
import { useState } from "react";

import { AlertOptions, InventoryItem, Severity } from "./types";
import { items, total_space } from "./utils/constants";
import { calculateCurrentWarehouseSize } from "./utils/calculateWarehouseSize";
import { findLowestValueItem } from "./utils/findLowestValueItem";
import WarehouseItemList from "./components/warehouseItemList";
import { deleteParentItems } from "./utils/deleteParentIndexes";
import SizeBoard from "./components/sizeBoard";
import SelectedItemList from "./components/selectedItemList";
import Alert from "./components/alert";

const groundedItems = items.map((item: InventoryItem) => {
  return {
    ...item,
    name: item.name.toLowerCase(),
    dependencies: item?.dependencies.map((dependency: string) =>
      dependency.toLowerCase()
    ),
  };
});

export default function Home() {
  const [warehouseItems, setWarehouseItems] =
    useState<InventoryItem[]>(groundedItems);
  const [selectedItems, setSelectedItems] = useState<InventoryItem[]>([]);
  const [warehouseLimitReached, setWarehouseLimitReached] =
    useState<boolean>(false);

  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    message: "",
    open: false,
    severity: Severity.ERROR,
    hideAfter: 5000,
  });

  /**
   * @description Handles the case if an item is not present.
   */
  const handleMissingItems = (selectedItem: InventoryItem) => {
    if (!selectedItem) {
      setAlertOptions({
        severity: Severity.ERROR,
        hideAfter: 5000,
        message: "Item not found!",
        open: true,
      });
      return true;
    }
  };

  /**
   * @description Handles the case if an item is already in the inventory.
   */
  const handleItemAlreadySelected = (
    alreadySelectedItems: InventoryItem[],
    newItem: InventoryItem
  ) => {
    if (alreadySelectedItems.includes(newItem)) {
      setAlertOptions({
        severity: Severity.ERROR,
        hideAfter: 5000,
        message: "Item already added!",
        open: true,
      });
      return true;
    }
  };

  /**
   * @description Makes sure that we always end up with the most valuable
   * warehouse selection, it removes always the least important item,
   * the ones with higher priorities and lower values.
   */
  const handlePriorityItems = (newItem: InventoryItem) => {
    const alreadySelectedItems = [...selectedItems];
    const lowestValueItem = findLowestValueItem(alreadySelectedItems);

    if (!lowestValueItem) return;

    // Check if the lowest value item is a dependency of the selected item
    const isDependencyOfSelectedItem = newItem.dependencies.some(
      (dependency: string) => dependency === lowestValueItem.name
    );

    if (
      (newItem.priority < lowestValueItem.priority &&
        !isDependencyOfSelectedItem) ||
      (newItem.value > lowestValueItem.value &&
        newItem.priority <= lowestValueItem.priority &&
        !isDependencyOfSelectedItem)
    ) {
      // Replace the lowest value item with the new item
      const updatedSelectedItems = alreadySelectedItems.filter(
        (item) => item !== lowestValueItem
      );

      // Check if the removed item is a dependency for any other
      // and if so remove its parents because the rule is that
      // we cannot have parent in warehouse if its dependencies
      // are not present
      if (
        updatedSelectedItems.some((item) =>
          item.dependencies.includes(lowestValueItem.name)
        )
      ) {
        deleteParentItems(lowestValueItem.name, updatedSelectedItems);
      }

      updatedSelectedItems.push(newItem);
      setSelectedItems(updatedSelectedItems);
      return true;
    }
  };

  /**
   * @description Handles the case when the attempt to add a new item
   * should be ignored if its dependencies are not already selected.
   */
  const areDependenciesMissing = (selectedItem: InventoryItem) => {
    if (selectedItem.dependencies.length > 0) {
      const dependenciesAlreadyAdded = selectedItem.dependencies.every(
        (dependency: any) => {
          return selectedItems.some(
            (selectedItem: InventoryItem) => selectedItem.name === dependency
          );
        }
      );

      if (!dependenciesAlreadyAdded) {
        setAlertOptions({
          hideAfter: 5000,
          severity: Severity.ERROR,
          message: "Item dependencies not met!",
          open: true,
        });
        return true;
      }
    }
  };

  /**
   * @description Handles the case where we exceed the warehouse
   * space limit
   */
  const handleWarehouseLimitReached = (selectedItem: InventoryItem) => {
    const currentWarehouseSize = calculateCurrentWarehouseSize(selectedItems);

    if (currentWarehouseSize + selectedItem.size > total_space) {
      setWarehouseLimitReached(true);
      setAlertOptions({
        hideAfter: 5000,
        severity: Severity.ERROR,
        message: "Warehouse space limit reached!",
        open: true,
      });
      return true;
    }
  };

  const handleItemSelection = (itemIndex: number) => {
    const items = [...warehouseItems];

    // 1) Get the item by its index
    const selectedItem: InventoryItem = items[itemIndex];

    // 2) Check if the item exists
    const isItemMissing = handleMissingItems(selectedItem);

    // 3) Check if the item is already selected
    const isItemAlreadySelected = handleItemAlreadySelected(
      selectedItems,
      selectedItem
    );

    // 4) Check for dependency constraint
    const dependenciesMissing = areDependenciesMissing(selectedItem);

    // Return if the above checks fail
    if (isItemMissing || isItemAlreadySelected || dependenciesMissing) {
      return;
    }

    // 5) Always make sure that we give precedence to higher priority items
    // and higher value items
    const replaceLowestValueItem = handlePriorityItems(selectedItem);
    if (replaceLowestValueItem) return;

    // 6) Check for space constraint
    const isWarehouseLimitReached = handleWarehouseLimitReached(selectedItem);
    if (isWarehouseLimitReached) return;

    setSelectedItems([...selectedItems, selectedItem]);
  };

  /**
   * @description Handles the removal of an item from the selected items, including its dependencies and parent items.
   * @param {number} itemIndex - The index of the item to be removed.
   */
  const handleItemRemoval = (itemIndex: number) => {
    const updatedItems = [...selectedItems];
    const removedItem = updatedItems[itemIndex];
    updatedItems.splice(itemIndex, 1);

    // Check if the removed item is a dependency for any other item and start the recursion
    if (
      updatedItems.some((item) => item.dependencies.includes(removedItem.name))
    ) {
      deleteParentItems(removedItem.name, updatedItems);
    }

    setSelectedItems(updatedItems);
  };

  /**
   * @description Resets the warehouse by clearing selected items
   * and resetting state variables.
   */
  const handleWarehouseReset = () => {
    // 1) Reset the warehouse items to the initial state
    setWarehouseItems(items);

    // 2) Clear the selected items
    setSelectedItems([]);

    // 3) Reset the warehouse limit flag and alert options
    setWarehouseLimitReached(false);

    setAlertOptions({
      message: "",
      open: false,
      severity: Severity.ERROR,
      hideAfter: 5000,
    });
  };

  return (
    <main className="w-screen p-4 relative">
      <WarehouseItemList
        warehouseItems={warehouseItems}
        handleItemSelection={handleItemSelection}
      />

      {selectedItems.length > 0 && (
        <SelectedItemList
          selectedItems={selectedItems}
          handleItemRemoval={handleItemRemoval}
        />
      )}

      <SizeBoard
        selectedItems={selectedItems}
        warehouseLimitReached={warehouseLimitReached}
        handleWarehouseReset={handleWarehouseReset}
      />

      <Alert alertOptions={alertOptions} setAlertOptions={setAlertOptions} />
    </main>
  );
}
