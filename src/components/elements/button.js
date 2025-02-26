"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

const ActionButton = ({ children, ...other }) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" {...other} disabled={pending}>
      {pending ? "waiting" : children}
    </button>
  );
};

export default ActionButton;
