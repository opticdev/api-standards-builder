/*
If you make a breaking change to the type, make sure you update the version key
 */

import { useLocalStorage } from "usehooks-ts";

const version: number = 0;
const localStorageKey = `user-selections-v${version}`;

type SelectionWithConfig<Config> = {
  id: string;
  config?: {} & Config;
};

export type UserSelections = {
  exclusiveSelections: {
    [key: string]: SelectionWithConfig<any>;
  };
  nonExclusiveSelections: SelectionWithConfig<any>[];
};

/*
Hooks the buttons can use
 */

export function useSelections(): [
  UserSelections,
  {
    resetAll: () => void;
    setExclusiveSelection: (
      key: string,
      config: SelectionWithConfig<any>
    ) => void;
    unsetExclusiveSelection: (key: string) => void;
    setNonExclusiveSelection: (config: SelectionWithConfig<any>) => void;
    unsetNonExclusiveSelection: (id: string) => void;
  }
] {
  const [selections, setSelections] = useLocalStorage<UserSelections>(
    localStorageKey,
    {
      exclusiveSelections: {},
      nonExclusiveSelections: [],
    }
  );

  console.log(selections);

  return [
    selections,
    {
      setExclusiveSelection: (
        key: string,
        config: SelectionWithConfig<any>
      ) => {
        setSelections((prev) => ({
          ...prev,
          exclusiveSelections: { ...prev.exclusiveSelections, [key]: config },
        }));
      },
      unsetExclusiveSelection: (key: string) => {
        setSelections((prev) => {
          const copy = JSON.parse(JSON.stringify(prev));
          delete copy.exclusiveSelections[key];
          return copy;
        });
      },
      setNonExclusiveSelection: (item) => {
        setSelections((prev) => {
          return {
            ...prev,
            nonExclusiveSelections: [
              ...prev.nonExclusiveSelections.filter((i) => i.id !== item.id),
              item,
            ],
          };
        });
      },
      resetAll: () => {
        setSelections({ nonExclusiveSelections: [], exclusiveSelections: {} });
      },
      unsetNonExclusiveSelection: (key) => {
        setSelections((prev) => {
          return {
            ...prev,
            nonExclusiveSelections: prev.nonExclusiveSelections.filter(
              (i) => i.id !== key
            ),
          };
        });
      },
    },
  ];
}
