import React from "react";
import { InventoryItem } from "../../types";

interface WarehouseItemListProps {
  warehouseItems: InventoryItem[];
  handleItemSelection: (itemIndex: number) => void;
}

const WarehouseItemList: React.FC<WarehouseItemListProps> = ({
  warehouseItems,
  handleItemSelection,
}) => {
  return (
    <>
      <h2 className="font-bold text-2xl">
        Warehouse Items ({warehouseItems.length})
      </h2>
      <div className="grid grid-cols-6 gap-4">
        {warehouseItems.map((item: InventoryItem, itemIndex: number) => {
          return (
            <div
              key={itemIndex}
              className="my-4 border-2 border-blue-400 rounded-md p-4"
            >
              <div>
                <span className="font-bold text-lg">{item.name}</span>
              </div>
              <div>
                <span className="text-sm">Priority: {item.priority}</span>
              </div>
              <div>
                <span className="text-sm">Size: {item.size}</span>
              </div>
              <div>
                <span className="text-sm">Value: {item.value}</span>
              </div>
              {item?.dependencies.length > 0 && (
                <div>
                  <span className="text-sm">
                    Dependencies:{" "}
                    {item.dependencies.map((el: string) => el + " ")}
                  </span>
                </div>
              )}
              <button
                onClick={() => handleItemSelection(itemIndex)}
                className="bg-blue-400 text-white px-4 py-1 rounded-md mt-4 text-sm"
              >
                Select
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WarehouseItemList;
