import {Avatar, AvatarProps} from "@mui/material";
import React from "react";

interface IAvatarProps extends AvatarProps {
}

const AvatarComponent: React.FC<IAvatarProps> = ({...props}) => {
  return (
    <Avatar {...props} />
  )
}

export default AvatarComponent;