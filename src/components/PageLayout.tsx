import React, { PropsWithChildren, useContext } from "react";

const PageContext = React.createContext<{ category: string }>(undefined as any);

export default function (
  props: PropsWithChildren<{
    type: string;
    frontMatter: { name: string; category_slug: string };
  }>
) {
  return (
    <PageContext.Provider value={{ category: props.frontMatter.category_slug }}>
      <div className="tailwind">{props.children}</div>
    </PageContext.Provider>
  );
}

export function usePageCategory() {
  return useContext(PageContext).category;
}
