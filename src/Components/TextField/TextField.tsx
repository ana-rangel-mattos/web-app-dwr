import { TextField } from '@mui/material';
import React from "react";

interface ITextFieldProps{
  variant?: "filled" | "outlined" | "standard";
  className?: "";
  mask?: string
}

const TextFieldComponent: React.FC<ITextFieldProps> = (props) => {
  return <TextField
    className={`general-textfield ${props.className ? props.className : ""}`}
    variant={props.variant}
    {...props} />
}

export default TextFieldComponent;