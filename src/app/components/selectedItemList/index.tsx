import { InventoryItem } from "@/app/types";

interface SelectedItemListProps {
  selectedItems: InventoryItem[];
  handleItemRemoval: (itemIndex: number) => void;
}

const SelectedItemList: React.FC<SelectedItemListProps> = ({
  selectedItems,
  handleItemRemoval,
}) => {
  return (
    <>
      <h2 className="font-bold text-2xl my-4">
        Selected items ({selectedItems.length})
      </h2>
      <div className="grid grid-cols-6 gap-4">
        {selectedItems.map((item: InventoryItem, itemIndex: number) => {
          return (
            <div
              key={itemIndex}
              className="mb-2 border-2 border-green-500 rounded-md p-4"
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
                onClick={() => handleItemRemoval(itemIndex)}
                className="bg-red-500 text-white px-4 py-1 rounded-md mt-4 text-sm"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SelectedItemList;
