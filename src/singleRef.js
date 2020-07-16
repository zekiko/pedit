import React, { useState, useEffect, useRef } from 'react'

import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    myDiv: {
        backgroundColor: "grey",
    }
});

const width = 80;
const height = 80;
var currentItem = {}

function DraggableHooks(props) {
    const [isDragging, setIsDragging] = useState(false)
    const [newPosition, setNewPosition] = useState(props.item.position)
//console.log("propstan gelen liste: ", props.list)
console.log("dropped item from alt: ", props.item)
    const classes = useStyles();
    // Im putting both the dragging/position states into one ref
    // in this example, but you can organize it however you'd like.
    const stateRef = useRef(null)
    currentItem = props.item
    // Update the ref's value whenever the position/isDragging
    // state changes.
    useEffect(
        () => {
            stateRef.current = { newPosition, isDragging }
        },
        [newPosition, isDragging]
    )

    useEffect(
        () => {
            if (isDragging) {
                window.addEventListener('mousemove', handleMouseMove)
                window.addEventListener('mouseup', handleMouseUp)
            }
        }, [isDragging])

    var rect = props.refData.getBoundingClientRect()//bugy when open===false
    // console.log("rect for ref: ", rect)             

    function handleMouseUp() {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        setIsDragging(false)
        console.log("handlemouseUP")

        props.updateItemStates()
    }

    function handleMouseMove(event) {
        // Now we read the dragging/position state from the
        // ref, which should always hold the latest state
        event.preventDefault()
        const { isDragging, newPosition } = stateRef.current
        var newX;
        var newY;

        if (isDragging) {
            newX = newPosition[0] + event.movementX
            newY = newPosition[1] + event.movementY

            //Borders check
            if (newX <= 0) {
                newX = 5;
                currentItem.position[0] = newX
                handleMouseUp()
            }
            else if (newY <= 0) {
                newY = 5;
                currentItem.position[1] = newY
                handleMouseUp()
            }
            else if (newX + width >= rect.width) {
                newX = rect.width - width - 5;
                currentItem.position[0] = newX
                handleMouseUp()
            }
            else if (newY + height >= rect.height) {
                newY = rect.height - height - 5;
                currentItem.position[1] = newY
                handleMouseUp()
            }
            else if (newX <= 5 & newY <= 5) {
                newX = 5;
                newY = 5;
                currentItem.position[0] = newX
                currentItem.position[1] = newY
                handleMouseUp()
            }
            else if (newX + width >= rect.width - 5 & newY <= 5) {
                newX = rect.width - width - 5;
                newY = 5;
                currentItem.position[0] = newX
                currentItem.position[1] = newY
                handleMouseUp()
            }
            else if (newX + width >= rect.width - 5 & newY + height >= rect.height - 5) {
                newX = rect.width - width - 5;
                newY = rect.height - height - 5;
                currentItem.position[0] = newX
                currentItem.position[1] = newY
                handleMouseUp()
            }
            else if (newX <= 5 & newY + height >= rect.height - 5) {
                newX = 5;
                newY = rect.height - height - 5;
                currentItem.position[0] = newX
                currentItem.position[1] = newY
                handleMouseUp()
            } else {

                //Other items check
                props.list.filter(i => i.type === "right" & i.itemName != currentItem.itemName)
                    .map((item, index) => {
                        console.log(item.itemName, " ", item.position, "---", currentItem.itemName, [newX, newY])
                        if (currentItem.position[0] + width <= item.position[0]) { //current item is on left of item
                            if (newX + width + 5 >= item.position[0]) { //current item wants to go right
                                if ((newY + height >= item.position[1]) & (newY <= item.position[1] + height)) { //current item is inside item
                                    newX = item.position[0] - width - 5
                                    console.log("soldan sağa")
                                }
                            }
                        } else if (currentItem.position[1] >= item.position[1] + height) { //current item is on bottom of item
                            if (newY - 5 <= item.position[1] + height) { //current item wants to go top
                                if (newX + width >= item.position[0] & newX <= item.position[0] + width) { //current item is inside item
                                    newY = item.position[1] + height + 5
                                    console.log("aşağıdan yukarıya")
                                }
                            }
                        } else if (currentItem.position[0] >= item.position[0] + width) { //current item is on right of item
                            if (newX - 5 <= item.position[0] + width) { //current item wants to go left
                                if (newY + height >= item.position[1] & newY <= item.position[1] + height) { //current item is inside item
                                    newX = item.position[0] + width + 5
                                    console.log("sağdan sola")
                                }
                            }
                        } else if (currentItem.position[1] + height <= item.position[1]) { //current item is on top of item
                            if (newY + height + 5 >= item.position[1]) { //current item wants to go bottom
                                if (newX + width >= item.position[0] & newX <= item.position[0] + width) { //current item is inside item
                                    newY = item.position[1] - height - 5
                                    console.log("yukarıdan aşağıya")
                                }
                            }
                        }

                    })
            }
            setNewPosition([newX, newY])
            currentItem.position[0] = newX
            currentItem.position[1] = newY
        }
    }


    return (
        <div
            //ref={stateRef.current[index]}
            className={classes.myDiv}
            style={{
                position: 'absolute',
                left: newPosition[0],
                top: newPosition[1],
                border: "1px solid black",
                width: width,
                height: height,
                //borderRadius: "100%",
                alignItems: "center",
                //backgroundColor: "grey",
                cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={() => (setIsDragging(true), console.log("mousedown"))}
            draggable={false}
            
        >
            {props.item.itemName}
            <br></br>
            {newPosition[0]} -- {newPosition[1]}
            <br></br>
            {isDragging ? "yeah" : "noi"}


        </div>
    )
}

export default DraggableHooks;
