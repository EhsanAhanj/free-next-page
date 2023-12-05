import React from "react";

export type TextInputProps =
  | {
      type: "text";
      value: string;
      shape: number;
    }
  | { type: "multi"; value: any[]; line: boolean };

const TextInput: React.FC<TextInputProps> = ({ value }) => {
  return <div>TextInput</div>;
};

export default TextInput;
