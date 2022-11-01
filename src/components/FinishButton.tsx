import React, { useMemo } from "react";
import { useSelections } from "@site/src/components/user-selections/hooks";

export default function () {
  const [selections] = useSelections();

  const count = useMemo(() => {
    return (
      Object.keys(selections.exclusiveSelections).length +
      Object.keys(selections.nonExclusiveSelections).length
    );
  }, [selections]);

  if (count === 0)
    return (
      <div className="tailwind">
        <button
          className="bg-gray-800   text-white font-bold py-2 px-4 rounded"
          disabled={true}
          style={{ cursor: "default !important" }}
        >
          (0) standards
        </button>
      </div>
    );

  return (
    <div className="tailwind">
      <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Start using ({count}) standards
      </button>
    </div>
  );
}
