import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import DndContainer from "./dndContainer";
import {draggers} from "./draggableList";

import Dos from "./dndMove.js";


export default function ProcedureCreator(props) {
  

  return (
    <div >
      <CssBaseline />
    
      <DndContainer toDrag={false} list={props.list} updateList={props.updateList}>  </DndContainer>
      
    
    </div>
  );
}
