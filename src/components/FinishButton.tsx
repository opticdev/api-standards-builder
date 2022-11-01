import React, { useCallback, useMemo } from "react";
import { useSelections } from "@site/src/components/user-selections/hooks";
import Link from "@docusaurus/Link";

export default function () {
  const [selections, actions] = useSelections();

  const resetAll = useCallback(() => {
    actions.resetAll();
  }, [actions]);

  const count = useMemo(() => {
    return (
      Object.keys(selections.exclusiveSelections).length +
      Object.keys(selections.nonExclusiveSelections).length
    );
  }, [selections]);

  if (count === 0)
    return (
      <div className="tailwind">
        <div>
          <button
            className="bg-gray-800   text-white font-bold py-2 px-4 rounded"
            style={{ cursor: "default !important" }}
          >
            (0) standards
          </button>
        </div>
      </div>
    );

  return (
    <>
      <div className="tailwind">
        <div>
          <button
            className="text-black hover:text-blue-600  font-bold py-2 px-4 mr-2 rounded"
            onClick={resetAll}
          >
            Reset
          </button>
          <Link to="/setup">
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Start using ({count}) standards
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
