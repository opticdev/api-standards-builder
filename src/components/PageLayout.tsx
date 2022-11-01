import React, { PropsWithChildren, useContext } from "react";

export default function (
  props: PropsWithChildren<{
    type: string;
    frontMatter: { name: string; category_slug: string };
  }>
) {
  return <div className="tailwind">{props.children}</div>;
}
