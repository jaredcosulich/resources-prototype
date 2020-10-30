import './style.css';
import React from "react";
import ReactDOM from "react-dom";
import Desmos from "desmos";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import { Accordion, AccordionSummary, AccordionDetails, Container } from "@material-ui/core";
import { Drawer } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BasicTable from './basic_table.js';

const useStyles = makeStyles({
  root: {
    width: 250
  },
  input: {
    width: 42
  }
});

function Graph() {
  return (
    <div id='calculator' style={{height: '600px', marginLeft: '360px'}}></div>
  );
}

function InputSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider"
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

function App() {
  const classes = useStyles();

  return (
    <Container>
      <Drawer anchor={'left'} open={true} variant={'permanent'}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
             <BasicTable></BasicTable>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Transform</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <InputSlider></InputSlider> 
          </AccordionDetails>
        </Accordion>      
      </Drawer>
      <Graph></Graph>
    </Container>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));

const elt = document.getElementById("calculator");
elt.style.marginBottom = "30px";
const calculator = Desmos.GraphingCalculator(elt, {
  expressionsCollapsed: true
});

calculator.setMathBounds({
  left: -2,
  right: 10,
  bottom: -2,
  top: 10
});

calculator.setExpression({
  id: "pointA",
  latex: "A=(2,4)",
  dragMode: Desmos.DragModes.NONE,
  pointStyle: Desmos.Styles.POINT
});

calculator.setExpression({
  id: "pointB",
  latex: "B=(4,2)",
  dragMode: Desmos.DragModes.NONE,
  pointStyle: Desmos.Styles.POINT
});

calculator.setExpression({
  id: "pointC",
  latex: "C=(7,1)",
  dragMode: Desmos.DragModes.NONE,
  pointStyle: Desmos.Styles.POINT
});

calculator.setExpression({
  id: "curveA",
  latex: "y=-1.1+8(.1x+1)^{-e}",
  color: Desmos.Colors.BLUE
});


