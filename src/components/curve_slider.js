import React from "react";
import Typography from "@material-ui/core/Typography";
import InputSlider from './input_slider.js';
import { Grid } from "@material-ui/core";
import x1 from '../assets/images/x-1.png';
import Desmos from "desmos";
import Latex from 'react-latex';


class CurveSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latex: props.latex || "",
      variables: props.variables || {}
    };
  }

  componentDidMount() {
    this.displayCurve();
  }

  handleSliderChange(variable, newValue) {
    this.state.variables[variable] = newValue
    this.displayCurve();
  }

  getLatex(withVariables) {  
    let latex = this.state.latex;  
    const variables = this.state.variables;

    // console.log(latex.replace(/~~([^~]+)~~/g, variables["$1"]));
    if (withVariables) {
      return latex.replace(/~~([^~]+)~~/g, "$1");
    } else {
      for (const variable of Object.keys(variables)) {
        const regexp = new RegExp(`~~${variable}~~`, 'g');
        latex = latex.replace(regexp, variables[variable]);
      }
      return latex;
    }
  }

  displayCurve() {
    const calculator = window.calculator;

    if (!calculator || !calculator.setExpression) {
      setTimeout(this.displayCurve.bind(this), 500);
      return;
    }

    const latex = this.getLatex(false);
    calculator.setExpression({
      id: this.state.latex,
      latex: latex,
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
          <Latex>{`$${this.getLatex(true)}$`}</Latex>

          {Object.keys(this.state.variables).map((variable) =>
            <InputSlider 
              title={variable} 
              value={this.state.variables[variable]}
              onChange={this.handleSliderChange.bind(this)}
            ></InputSlider> 
          )}          
        </Grid>
      </Grid>
    );
  }
} 

export default CurveSlider;
  