import { Container, ContainerProps} from "@mui/material";
import React from "react";

interface IContainerProps extends ContainerProps {
  children: React.ReactNode;
}

const ContainerComponent: React.FC<IContainerProps> = ({children, ...props}) => {
  return (
    <Container {...props}>{children}</Container>
  )
}

export default ContainerComponent;