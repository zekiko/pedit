import React, { useEffect } from "react"
import { List, ListItem, ListItemText } from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    dragItem: {
        position: "relative",
        zIndex: 1000,
        //left: "0px",
        //top: "0px",
        width: "100px",
        height: "100px",
        backgroundColor: "grey",
        color: "black",
        borderRadius: "100%",
        textAlign: "center",

    }
})

const cagriList = [
    { name: "çağrı", surname: "zeki" },
    { name: "kamur", surname: "an" },
    { name: "mamur", surname: "kan" },
    { name: "lol", surname: "over" },

]

export default function Dos(props) {
    const classes = useStyles();

    const refList = React.useRef([...Array(4)].map(() => React.createRef()));

    var mousePosition;
    var offset = [0, 0];
    var div;
    var isDown = false;

    const handleMouseDown = (event, divId, item) => {
        //div = document.getElementById(divId);
        //document.body.appendChild(div);
        div = refList.current[divId].current;

        isDown = true;
        offset = [
            div.offsetLeft - event.clientX,
            div.offsetTop - event.clientY
        ];
        
        console.log("onDragStart'dasın: item: ", item)
        console.log("current div ", div)

    }

    const onDrop = () => {
        isDown = false;
        console.log("onDrop'tasın isDown: ", isDown)
    }

    const onDragOver = (event, item) => {
        event.preventDefault();
        //div = document.getElementById("bir");

        if (isDown) {
            mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            div.style.left = (mousePosition.x + offset[0]) + 'px';
            div.style.top = (mousePosition.y + offset[1]) + 'px';
        }

        console.log("onDragOver'dasın. isDown: ", isDown, " item: ", item)
    }

    const draggableList = [];

    props.list.map((item, index) => {
        draggableList.push(
            <div
                ref={refList.current[index]}
                /* id={index}
                key={index} */
                className={classes.dragItem}
                onDragStart={event => handleMouseDown(event, index, item)}
                onDrop={() => onDrop()}
                onDragOver={event => onDragOver(event, item)}
                draggable

            >
                {item.itemName}
                <br/>
                {item.type}
            </div>)
    })
    console.log("prop.list: ", props.list)
    console.log("cagriDragList: ", draggableList)

    return (
        <div>
            <List>
                {draggableList.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}

            </List>

        </div>
    )

}