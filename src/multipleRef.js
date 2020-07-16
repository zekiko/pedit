import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

function DraggableHooks2(props) {
    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState([0, 0])
    // Im putting both the dragging/position states into one ref
    // in this example, but you can organize it however you'd like.
    //const stateRef = useRef(null)
    const stateRef = React.useRef([...Array(4)].map(() => React.createRef()));
    console.log("stateref: ", stateRef.current)
    // Update the ref's value whenever the position/isDragging
    // state changes.
    useEffect(
        () => {
            stateRef.current = { position, isDragging }
        },
        [position, isDragging],
        console.log("1")
    )

    useEffect(() => {
        function handleMouseMove(event) {
            // Now we read the dragging/position state from the
            // ref, which should always hold the latest state

            const { isDragging, position } = stateRef.current
            console.log("2")
            if (isDragging) {
                const newX = position[0] + event.movementX
                const newY = position[1] + event.movementY
                setPosition([newX, newY])
            }
            console.log("stateref: ", stateRef.current)
        }

        function handleMouseUp() {
            setIsDragging(false)
        }

        console.log("isdragging: ", isDragging)
        
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    var draggableList = [];

    props.list.map((item, index) => {
        draggableList.push(
            <div
                ref={stateRef.current[index]}
                key={index}
                style={{
                    position: 'relative',
                    left: position[0],
                    top: position[1],
                }}
                onMouseDown={() => setIsDragging(true)}
            >
                {item.itemName}
                <br />
                {item.type}
                <br />
                {isDragging ? 'I am dragging.' : 'I am not dragging.'}
            </div>)
    })

    return (
        <div>
            {draggableList}
        </div>
    )

}

export default DraggableHooks2;
