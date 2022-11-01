import { JSONSchema4 } from "json-schema";
import React from "react";
import { ExclusiveToggle } from "@site/src/components/buttons/ExclusiveToggle";
import { NonExclusiveToggle } from "@site/src/components/buttons/NonExclusiveToggle";
import BrowserOnly from "@docusaurus/BrowserOnly";

export const contributors: {
  id: string;
  category: string;
  exclusive: boolean;
  mutateConfig: (
    spectralConfig: SpectralConfig,
    opticConfig: OpticConfig
  ) => void;
}[] = [];

// Register the categories here so the mutators are picked up -- little bit of duplicate exec but keeps the DX nice
require("../content/standards/security.mdx");
require("../content/standards/breaking-changes.mdx");
require("../content/standards/urls.mdx");
require("../content/standards/naming.mdx");

// replace with the real one
export type SpectralConfig = { rules: any[]; extends: string[] };
export type OpticConfig = { rulesets: { [key: string]: any } };

export function DefineStandardOption(
  name: string,
  id: string,
  category: string,
  run_by: "spectral" | "optic",
  exclusive: boolean,
  // add types here soon
  contribution: (
    spectralConfig: SpectralConfig,
    opticConfig: OpticConfig
  ) => void,
  config?: {
    configSchema: JSONSchema4;
    defaultValue: any;
  }
) {
  if (exclusive) {
    contributors.push({
      id: id,
      mutateConfig: contribution,
      category,
      exclusive: true,
    });
    return () => (
      <BrowserOnly>
        {() => (
          <ExclusiveToggle
            category={category}
            name={name}
            id={id}
            config={config}
          />
        )}
      </BrowserOnly>
    );
  } else {
    contributors.push({
      id: id,
      mutateConfig: contribution,
      category,
      exclusive: false,
    });
    return () => (
      <BrowserOnly>
        {() => (
          <NonExclusiveToggle
            name={name}
            category={category}
            id={id}
            config={config}
          />
        )}
      </BrowserOnly>
    );
  }
}
