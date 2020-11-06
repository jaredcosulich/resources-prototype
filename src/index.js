import './style.css';
import React from "react";
import ReactDOM from "react-dom";
import Desmos from "desmos";
import { makeStyles } from "@material-ui/core/styles";
import ControlsDrawer from './components/controls_drawer';
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 250
  }
});

function createData(x,y) {
  return { x,y };
}

const rows = [
  createData(144.52, 53.90),
  createData(126.37, 52.33),
  createData(168.51, 72.41),
  createData(126.37, 56.64),
  createData(138.87, 47.91),
  createData(98.71, 72.41),
  createData(138.87, 98.91),
];

function Graph() {
  return (
    <div id='calculator' style={{height: '600px', marginLeft: '360px'}}></div>
  );
}

function App() {
  const classes = useStyles();

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
  expressionsCollapsed: true
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
