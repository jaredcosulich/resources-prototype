import './style.css';
import React from "react";
import ReactDOM from "react-dom";
import Desmos from "desmos";
// import { makeStyles } from "@material-ui/core/styles";
import ControlsDrawer from './components/controls_drawer';
import { Container } from "@material-ui/core";

// const useStyles = makeStyles({
//   root: {
//     width: 250
//   }
// });

function createData(x,y) {
  return { x,y };
}

const rows = [
  createData(2.3, 847.5),
  createData(2.8, 265.3),
  createData(3.5, 173.2),
  createData(4.5, 103.6),
  createData(4.8, 188.0),
];

function Graph() {
  return (
    <div id='calculator' style={{height: '600px', marginLeft: '360px'}}></div>
  );
}

function App() {
  return (
    <Container>
      <ControlsDrawer rows={rows}></ControlsDrawer>
      <Graph></Graph>
    </Container>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));

const elt = document.getElementById("calculator");
elt.style.marginBottom = "30px";
const calculator = window.calculator = Desmos.GraphingCalculator(elt, {
  expressionsCollapsed: true,
  invertedColors: true,
});


const bounds = {left: -10, right: 10, top: 10, bottom: -10};
rows.forEach((r, index) => {
  if (r.x < bounds.left) bounds.left = r.x - (Math.abs(r.x * 0.1)); 
  if (r.x > bounds.right) bounds.right = r.x + (Math.abs(r.x * 0.1));
  if (r.y < bounds.bottom) bounds.bottom = r.y - (Math.abs(r.y * 0.1));
  if (r.y > bounds.top) bounds.top = r.y + (Math.abs(r.y * 0.1)); 

  calculator.setExpression({
    id: "point" + index,
    latex: `(${r.x},${r.y})`,
    dragMode: Desmos.DragModes.NONE,
    pointStyle: Desmos.Styles.POINT
  });
});

calculator.setMathBounds(bounds);
