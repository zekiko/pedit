import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import NavigationIcon from '@material-ui/icons/Navigation';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { SwipeableDrawer, Drawer, Paper, Grid, Button, Fab, Tooltip, Fade } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import ProcedureCreator from "./procedureCreator";
import { draggers } from "./draggableList";
import DndContainer from './dndContainer';

const drawerWidth = "94%";
const drawerWidth2 = "6%";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#e0e0e0",
    color: "black",
    border: "0px solid black",
    borderRadius: "4px",
    height: "15%",
  },
  appBarShift: {
    //marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    padding: "0px"
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0) + 1,
    },
  },
  drawer2: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen2: {
    width: drawerWidth2,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    padding: "0px",
  },
  drawerClose2: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  drawerOpenButton: {

    '&:hover': {


    }
  },
  x: {
    padding: 0,
  }

}));

export default function ProDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(props.openCreator);


  const [list, setList] = React.useState(draggers);

  const updateList = list2 => {
    setList(list2);
  };

  /* useEffect(() => {
    setList(draggers)
  }, [draggers]);
 */

  useEffect(() => {
    setOpen(props.openCreator)
  }, [props.openCreator])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    if (open)
      handleDrawerClose()
    else
      handleDrawerOpen()

    props.handleOpenCreator()
  }


  const renderDrawerAppBar = (
    <AppBar
      color="secondary"
      position="relative"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="secondary"
          aria-label="open drawer"
          onClick={handleClick}
          edge="start"
          className={classes.menuButton}
        >
          <Tooltip title="Close Procedure Creator">
            <ArrowForwardIosIcon />
          </Tooltip>
        </IconButton>

        <Typography variant="h6" noWrap>
          2
          </Typography>
      </Toolbar>
    </AppBar>
  );

  return (

    <div className={classes.root}>
      <CssBaseline />
      <SwipeableDrawer
        anchor="right"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} />

        {open ? renderDrawerAppBar : ""}

        <Grid container item xs={12} spacing={0} >

          <Grid container item xs={3} spacing={0} justify="flex-start" direction="column" >
            <Paper style={{ height: "100%", border: "0px solid black", margin: "1px" }} >
              <Divider />
              {/* <List>
                {draggers.map((dragger) => (
                  <ListItem button key={dragger.itemName}>
                    <ListItemIcon>{dragger.id % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={dragger.itemName} />
                  </ListItem>
                ))}
              </List> */}

              <DndContainer toDrag list={list} />

              <Divider />

            </Paper>
          </Grid>

          {open ?
            <Grid container item xs={9} spacing={0} direction="column">
              <Paper style={{ height: "100%", border: "0px solid black", margin: "1px" }}>
                <ProcedureCreator updateList={updateList} list={list}/>
              </Paper>
            </Grid>
            :
            ""}

        </Grid>
      </SwipeableDrawer>

      <Drawer
        anchor={open ? "left" : "right"}
        variant="permanent"
        className={clsx(classes.drawer2, {
          [classes.drawerOpen2]: open,
          [classes.drawerClose2]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen2]: open,
            [classes.drawerClose2]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} />


        {!open ?
          <Paper>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              fullWidth
              onClick={handleClick}
              className={classes.drawerOpenButton}
            >
              <Tooltip title="Open Procedure Creator">
                <ArrowBackIosIcon />
              </Tooltip>

            </Button >
          </Paper>
          :
          ""
        }

        <div className={classes.x}>
          <List >
            {['Status1', 'Status2', 'Status3', 'Status4'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary="" />
              </ListItem>
            ))}
          </List>
          <Divider />



          <List >
            {['Status1', 'Status2', 'Status3', 'Status4'].map((text, index) => (
              <ListItem button alignItems="center" key={text}>
                <ListItemIcon >{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary="" />
              </ListItem>
            ))}
          </List>
          <Divider />



          <List >
            {['Status1', 'Status2', 'Status3', 'Status4'].map((text, index) => (
              <ListItem button key={text} >
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary="" />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>

      </Drawer>



    </div>
  );

}

