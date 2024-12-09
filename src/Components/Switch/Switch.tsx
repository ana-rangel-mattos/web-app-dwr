import { Switch, SwitchProps} from "@mui/material";
import React from "react";

interface ISwitchProps extends SwitchProps {
  children: React.ReactNode;
}

const SwitchComponent: React.FC<ISwitchProps> = ({...props}) => {
  return (
    <Switch {...props}/>
  )
}

export default SwitchComponent;