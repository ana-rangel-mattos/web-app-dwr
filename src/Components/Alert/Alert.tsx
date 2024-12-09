import { Alert, AlertProps} from "@mui/material";
import React from "react";

interface IAlertProps extends AlertProps {
  children: React.ReactNode;
}

const AlertComponent: React.FC<IAlertProps> = ({children, ...props}) => {
  return (
    <Alert {...props}>{children}</Alert>
  )
}

export default AlertComponent;