import React from "react";
import Typography from "@material-ui/core/Typography";
import InputSlider from './input_slider.js';
import { Container } from "@material-ui/core";
import x1 from '../assets/images/x-1.png';

class CurveSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <img src={x1} alt="x-1" />
        <InputSlider></InputSlider> 
      </Container>
    );
  }
} 

export default CurveSlider;
  