import React from "react";
import InputSlider from './input_slider.js';
import { Grid } from "@material-ui/core";
import Desmos from "desmos";
import Latex from 'react-latex';

const timeSpent = {};
function recordTime(functionName, time) {
  if (!timeSpent[functionName]) timeSpent[functionName] = 0;
  timeSpent[functionName] += time;
  console.log(timeSpent); 
}

class CurveSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayed: props.displayed,
      latex: props.latex || "",
      color: props.color,
      variables: props.variables || {},
      onChange: props.onChange
    };

    this.variables = props.variables || {};
  }

  componentDidUpdate() {
    this.displayCurve();
  }

  componentWillReceiveProps(props) {
    this.setState({
      displayed: props.displayed,
    })
  }

  handleSliderChange(variable, newValue) {
    this.variables[variable] = newValue
    this.displayCurve();
    if (this.state.onChange) this.state.onChange();
  }

  getLatex(withVariables) {  
    let latex = this.state.latex;  
    const variables = this.variables;

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
    if (!this.state.displayed) return;

    const calculator = window.calculator;

    if (!calculator || !calculator.setExpression) {
      setTimeout(this.displayCurve.bind(this), 50);
      return;
    }

    const latex = this.getLatex(false);
    calculator.setExpression({
      id: "curve" + this.state.latex,
      latex: latex,
      color: this.state.color,
      dragMode: Desmos.DragModes.NONE
    });
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
          <img src={this.props.image} alt="Curve" height={75} style={{marginTop: 12}}/>
        </Grid>
        <Grid item xs={4}>
          <Latex>{`$${this.getLatex(true)}$`}</Latex>

          {Object.keys(this.variables).map((variable) =>
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
  