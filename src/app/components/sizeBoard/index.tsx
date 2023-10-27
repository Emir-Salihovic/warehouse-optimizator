import { InventoryItem } from "@/app/types";
import { calculateCurrentWarehouseSize } from "@/app/utils/calculateWarehouseSize";
import { total_space } from "@/app/utils/constants";

interface SizeBoardProps {
  selectedItems: InventoryItem[];
  warehouseLimitReached: boolean;
  handleWarehouseReset: () => void;
}

const SizeBoard: React.FC<SizeBoardProps> = ({
  selectedItems,
  warehouseLimitReached,
  handleWarehouseReset,
}) => {
  return (
    <div className="fixed bottom-2 right-2 z-100 bg-white mr-2 border-2 border-blue-400 p-2">
      <h6 className="font-bold text-lg text-blue-400">
        Current Occupied Space: {calculateCurrentWarehouseSize(selectedItems)}
      </h6>
      <h6 className="font-bold text-lg text-red-500">
        Space Limit: {total_space}
      </h6>

      {warehouseLimitReached && (
        <button
          onClick={handleWarehouseReset}
          className="bg-blue-400 text-white px-4 py-1 rounded-md mt-4 text-sm"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default SizeBoard;
