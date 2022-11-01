import React, { useMemo } from "react";
import {
  UserSelections,
  useSelections,
} from "@site/src/components/user-selections/hooks";
import {
  contributors,
  OpticConfig,
  SpectralConfig,
} from "@site/src/DefineStandardOption";

import yaml from "yaml";

console.log(contributors);
export default function GeneratedOutput() {
  const [selections] = useSelections();

  const { optic, spectral } = useMemo(() => generate(selections), [selections]);

  return <pre>{yaml.stringify(spectral)}</pre>;
}

function generate(selections: UserSelections): {
  optic: OpticConfig;
  spectral: SpectralConfig;
} {
  const spectral: SpectralConfig = { rules: [], extends: [] };
  const optic: OpticConfig = { rulesets: [] };

  Object.entries(selections.exclusiveSelections).forEach(
    ([category, config]) => {
      const lookup = contributors.find(
        (i) => i.exclusive && i.id === config.id && i.category === category
      );
      if (lookup) lookup.mutateConfig(spectral, optic);
    }
  );

  selections.nonExclusiveSelections.forEach((config) => {
    console.log(config.id);
    const lookup = contributors.find((i) => !i.exclusive && i.id === config.id);
    console.log(lookup);
    if (lookup) lookup.mutateConfig(spectral, optic);
  });

  return { optic, spectral };
}
