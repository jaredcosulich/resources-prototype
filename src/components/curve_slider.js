import React from "react";
import Typography from "@material-ui/core/Typography";
import InputSlider from './input_slider.js';
import { Grid } from "@material-ui/core";
import x1 from '../assets/images/x-1.png';
import Desmos from "desmos";
import createTypography from "@material-ui/core/styles/createTypography";

class CurveSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      a: 1,
      b: 0
    };
  }

  handleSliderChange(variable, newValue) {
    this.state[variable] = newValue

    const calculator = window.calculator;
    calculator.setExpression({
      id: "curveX-1",
      latex: `y=(${this.state.a}x^{-1})+${this.state.b}`,
      dragMode: Desmos.DragModes.NONE
    })
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="left"
        alignItems="left"
      >
        <Grid item xs={3}>
          <img src={x1} alt="x^(-1)" height={75} style={{marginTop: 12}}/>
        </Grid>
        <Grid item xs={4}>
          <Typography display='inline'>
            Y=aX
            <Typography display='inline' style={{fontSize: '80%', lineHeight: 1, verticalAlign: 'top'}}>
              -1
            </Typography>
            +b
          </Typography>
          <InputSlider 
            title="a" 
            onChange={this.handleSliderChange.bind(this)}
          ></InputSlider> 
          <InputSlider 
            title="b" 
            onChange={this.handleSliderChange.bind(this)}
          ></InputSlider> 
        </Grid>
      </Grid>
    );
  }
} 

export default CurveSlider;
  