import { Button, ButtonProps} from "@mui/material";
import React from "react";

interface IButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const ButtonComponent: React.FC<IButtonProps> = ({children, ...props}) => {
  return (
    <Button {...props}>{children}</Button>
  )
}

export default ButtonComponent;