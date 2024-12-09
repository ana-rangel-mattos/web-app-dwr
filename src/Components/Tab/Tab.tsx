import { Tab, TabProps} from "@mui/material";
import React from "react";

interface ITabProps extends TabProps {
}

const TabComponent: React.FC<ITabProps> = ({children, ...props}) => {
  return (
    <Tab {...props} />
  )
}

export default TabComponent;