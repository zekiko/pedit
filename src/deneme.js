import React from "react"

const cagriList = [
    { name: "çağrı", surname: "zeki" },
    { name: "kamur", surname: "an" },
    { name: "mamur", surname: "kan" },
    { name: "lol", surname: "over" },

]

const Circle = () => {
    const [position, setPosition] = React.useState({
      x: 50,
      y: 50,
      coords: {},
    });
    
    // Use useRef to create the function once and hold a reference to it.
    const handleMouseMove = React.useRef(e => {
      setPosition(position => {
        const xDiff = position.coords.x - e.pageX;
        const yDiff = position.coords.y - e.pageY;
        return {
          x: position.x - xDiff,
          y: position.y - yDiff,
          coords: {
            x: e.pageX,
            y: e.pageY,
          },
        };
      });
      console.log("mousemove")
    });
  
    const handleMouseDown = e => {
      // Save the values of pageX and pageY and use it within setPosition.
      const pageX = e.pageX; 
      const pageY = e.pageY;
      setPosition(position => Object.assign({}, position, {
        coords: {
          x: pageX,
          y: pageY,
        },
      }));
      document.addEventListener('mousemove', handleMouseMove.current);
      console.log("mousedown")
    };
  
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove.current);
      // Use Object.assign to do a shallow merge so as not to 
      // totally overwrite the other values in state.
      setPosition(position =>
        Object.assign({}, position, {
          coords: {},
        })
      );
      console.log("mouseup")
    };
  
    return (
      <circle
        cx={position.x}
        cy={position.y}
        r={25}
        fill="white"
        stroke="black"
        strokeWidth="1"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >cagriList</circle>
    );
  };
  
  const App2 = () => {
    return (
      <svg
        style={{
          border: '1px solid green',
          height: '400px',
          width: '100%',
        }}
      >
        <Circle />
        <Circle />
      </svg>
    );
  };
  
  export default App2;