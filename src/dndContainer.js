import React from "react";
import { List, ListItem } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles } from "@material-ui/core";

//import Dos from "./dndMove.js";

//import DraggableHooks2 from "./multipleRef";
import DraggableHooks from "./singleRef";


const useStyles = makeStyles(theme => ({
    draggableLeftItem: {
        backgroundColor: "#3f51b5",
        border: "1px solid rgb(22, 22, 22)"
    },
    draggableRightItem: {
        backgroundColor: "#b71c1c",
        border: "1px solid rgb(22, 22, 22)"
    },
    draggableContainer: {
        position: "relative",
        width: 500,
        height: 300,
        border: "3px solid rgb(22, 22, 22)",
        maxWidth: "100%"
    },
    droppableContainer: props => ({
        position: "absolute",
        width: props.droppableWidth,
        height: props.droppableHeight,
        marginTop: "0%",
        border: "1px solid rgb(22, 22, 22)"
    })
}));

const styles = { "droppableWidth": 700, "droppableHeight":500 }
export default function DndContainer(props) {

    const classes = useStyles(styles);
    const ref = React.useRef(null)

    //const [itemStates, setItemStates] = React.useState([])

    const updateItemStates = (item) => {

        /* const index = itemStates.findIndex((e) => e.itemName === item.itemName);

        if (index === -1) {
            //console.log("index ", index )
            itemStates.push(item);
        } else {
            //console.log("index, ", index)
            itemStates[index] = item;
        }
        //setItemStates(itemStates)
        console.log("itemStates: ", itemStates)         */

        props.updateList(JSON.parse(JSON.stringify(props.list)))//yedi
        // props.updateList(props.list)//yemedi
        console.log(props.list)
        // console.log("updated itemed sated")
    }

    const onDragStart = (event, item) => {
        console.log("dragstart on div: ", item.itemName);
        event.dataTransfer.setData("item", JSON.stringify(item));
    };

    const onDragOver = event => {
        event.preventDefault();
    };

    const onDrop = (event, newType) => {       
        let droppedItem = JSON.parse(event.dataTransfer.getData("item"));

        //event.target.appendChild(document.getElementById())

        console.log("dropped: ", droppedItem.itemName);

        /*         let updatedList = props.list.filter((el, index) => {
                    if (droppedItem.itemName === el.itemName) {
                        el.type = newType;
                    }
                    return el;
                }); */


        var droppedItemIndex = props.list.findIndex(i => i.itemName === droppedItem.itemName)

        let updatedList = props.list.filter((el) => {
            if (droppedItem.itemName === el.itemName) {
                el.type = newType;
            } 
            return el;
        });
        var refer = 0
        updatedList.map(el => {
            if (el.type === "right" & el.itemName !== droppedItem.itemName) {
                if (JSON.stringify(updatedList[droppedItemIndex].position) === JSON.stringify(el.position)) {//maplerken yeni array dönüyor

                    updatedList[droppedItemIndex].position[0] = el.position[0] + el.dimension.width + 5

                    if (updatedList[droppedItemIndex].position[0] + updatedList[droppedItemIndex].dimension.width >= styles.droppableWidth) {
                        updatedList[droppedItemIndex].position[0] = 5
                        refer = el.position[1] + el.dimension.height
                        console.log(refer)

                        console.log(updatedList[droppedItemIndex].position[1], updatedList[droppedItemIndex].position[1] + updatedList[droppedItemIndex].dimension.height + refer)

                        if (updatedList[droppedItemIndex].position[1] + updatedList[droppedItemIndex].dimension.height + refer >= styles.droppableHeight) {
                            updatedList[droppedItemIndex].type = "left"

                            console.log(updatedList[droppedItemIndex])
                            console.log(updatedList)
                            console.log("ekranda yer kalmadı")
                        } else {
                            updatedList[droppedItemIndex].position[1] = updatedList[droppedItemIndex].position[1] + refer + 5
                        }
                    }
                }
                console.log(el.itemName, ": ", el.position, " || ", updatedList[droppedItemIndex].itemName, ":", updatedList[droppedItemIndex].position,)
            }
        })
        console.log(updatedList)
        props.updateList(updatedList);
    };

    var itemList = [];

    const renderList = () => {
        props.list.map((item, index) => {
            itemList.push(
                <div
                    key={index}
                    onDragStart={event => onDragStart(event, item)}
                    draggable={props.toDrag}
                    className={
                        props.toDrag
                            ? classes.draggableLeftItem2
                            : classes.draggableRightItem2
                    }
                >
                    {item.itemName}
                    <br />
                    type: {item.type}
                    <br />
                    position: {item.position[0]} -- {item.position[1]}
                </div>
            );
        });
    };

    return (
        <div>
            {renderList()}
            {props.toDrag === true ? (
                <div
                    className={classes.draggableContainer2}
                    onDragOver={event => onDragOver(event)}
                /* onDrop={event => {
                  onDrop(event, "left");
                }} */
                >
                    {
                        <List>
                            {itemList.map((item, index) => (
                                <ListItem button key={index}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    }
                </div>
            ) : (
                    <div
                        ref={ref}
                        className={classes.droppableContainer}
                        onDragOver={event => onDragOver(event)}
                        onDrop={event => onDrop(event, "right")}
                        id="mm"
                    >
                        {props.list.filter(item => item.type === "right")
                            .map((item, index) => (
                                <DraggableHooks
                                    key={index}
                                    item={item}
                                    list={props.list}
                                    refData={ref.current}
                                    updateItemStates={updateItemStates}
                                    updateList={props.updateList}
                                />
                            ))}

                        {/* <DraggableHooks2 list={listProps.filter(item => item.type === "right")}/> */}

                    </div>
                )}
        </div>
    );
}

