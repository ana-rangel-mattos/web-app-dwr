import { IconButton, IconButtonProps} from "@mui/material";
import React from "react";

interface IIconButtonProps extends IconButtonProps {
}

const IconButtonComponent: React.FC<IIconButtonProps> = ({...props}) => {
  return (
    <IconButton {...props}/>
  )
}

export default IconButtonComponent;