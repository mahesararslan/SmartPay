import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-6 bg-white rounded-xl bg-[#ededed] mx-5 sm:mx-0"
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
