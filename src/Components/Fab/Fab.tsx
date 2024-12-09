import { Fab, FabProps} from "@mui/material";
import React from "react";

interface IFabProps extends FabProps {
  children: React.ReactNode;
}

const FabComponent: React.FC<IFabProps> = ({children, ...props}) => {
  return (
    <Fab {...props}>{children}</Fab>
  )
}

export default FabComponent;