import React from "react";
import InputSlider from './input_slider.js';
import { Grid } from "@material-ui/core";
import x1 from '../assets/images/x-1.png';

class CurveSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <img src={x1} alt="x^(-1)" height={50} />
        </Grid>
        <Grid item xs={8}>
          <InputSlider></InputSlider> 
        </Grid>
      </Grid>
    );
  }
} 

export default CurveSlider;
  