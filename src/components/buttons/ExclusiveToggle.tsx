import React, { useCallback, useState } from "react";
import {
  CheckCircleIcon,
  MinusCircleIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/solid";
import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import { useSelections } from "@site/src/components/user-selections/hooks";
import { JsonSchemaConfigForm } from "@site/src/components/JsonSchemaConfigForm";

export function ExclusiveToggle(props: {
  name: string;
  category: string;
  id: string;
  config: {
    defaultValue: any;
    configSchema: object;
  };
}) {
  const [selections, actions] = useSelections();

  const { category } = props;

  const selection =
    selections.exclusiveSelections[category] &&
    selections.exclusiveSelections[category].id === props.id;

  const selected = Boolean(selection);

  const selectedValue = selection && selections.exclusiveSelections[category];

  const addIt = useCallback(() => {
    actions.setExclusiveSelection(category, {
      id: props.id,
      config: props.config?.defaultValue,
    });
  }, [props.id, category, actions]);

  const unsetIt = useCallback(() => {
    actions.unsetExclusiveSelection(category);
  }, [category, actions]);

  const changeConfig = useCallback(
    (config) => {
      actions.setExclusiveSelection(category, { id: props.id, config });
    },
    [category, actions]
  );

  if (selected) {
    return (
      <>
        <button
          onClick={unsetIt}
          className="bg-gray-100 hover:bg-gray-50 flex flex-row text-black font-bold py-2 pr-4 pl-2 rounded  mb-3"
          style={{ border: "1px solid black" }}
        >
          <CheckCircleIcon height={15} width={15} style={{ marginRight: 10 }} />
          <span>
            Stop using <u>{props.name}</u>
          </span>
        </button>

        {props.config && (
          <div>
            <JsonSchemaConfigForm
              onValidChange={changeConfig}
              schema={props.config.configSchema}
              defaultValue={selectedValue.config || props.config.defaultValue}
            />
          </div>
        )}
      </>
    );
  } else {
    return (
      <button
        onClick={addIt}
        className="bg-gray-800 hover:bg-gray-700 flex flex-row text-white font-bold py-2 pr-4 pl-2 rounded mb-3 "
      >
        <DotsCircleHorizontalIcon
          height={15}
          width={15}
          style={{ marginRight: 10 }}
        />
        <span>
          Use <u>{props.name}</u> Standard
        </span>
      </button>
    );
  }
}
