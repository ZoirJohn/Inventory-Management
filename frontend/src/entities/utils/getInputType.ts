import { HTMLInputTypeAttribute } from "react";

export default function getInputType(name: string): HTMLInputTypeAttribute {
  name = name.toLowerCase();
  switch (true) {
    case name.includes("bool"):
      return "checkbox";
    case name.includes("int"):
      return "number";
    default:
      return "string";
  }
}
