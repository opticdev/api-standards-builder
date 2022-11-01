import React, { useCallback, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import { useSelections } from "@site/src/components/user-selections/hooks";
import { usePageCategory } from "@site/src/components/PageLayout";
import { JsonSchemaConfigForm } from "@site/src/components/JsonSchemaConfigForm";

export function ExclusiveToggle(props: {
  name: string;
  id: string;
  configSchema: object;
}) {
  const category = usePageCategory();
  const [selections, actions] = useSelections();

  const selection =
    selections.exclusiveSelections[category] &&
    selections.exclusiveSelections[category].id === props.id;

  const addIt = useCallback(() => {
    actions.setExclusiveSelection(category, { id: props.id, config: {} });
  }, [props.id, category, actions]);

  const unsetIt = useCallback(() => {
    actions.unsetExclusiveSelection(category);
  }, [, category, actions]);

  const selected = Boolean(selection);

  if (selected) {
    return (
      <>
        <button
          onClick={unsetIt}
          className="bg-gray-100 hover:bg-gray-50 flex flex-row text-black font-bold py-2 pr-4 pl-2 rounded "
          style={{ border: "1px solid black" }}
        >
          <XIcon height={15} width={15} style={{ marginRight: 10 }} />
          <span>
            Stop using <u>{props.name}</u>
          </span>
        </button>

        <div>
          <JsonSchemaConfigForm schema={props.configSchema} />
        </div>
      </>
    );
  } else {
    return (
      <button
        onClick={addIt}
        className="bg-gray-800 hover:bg-gray-700 flex flex-row text-white font-bold py-2 pr-4 pl-2 rounded "
      >
        <PlusIcon height={15} width={15} style={{ marginRight: 10 }} />
        <span>
          Use <u>{props.name}</u> Standard
        </span>
      </button>
    );
  }
}
