import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Container, Grid } from "@material-ui/core";
import Latex from 'react-latex';
import Desmos from "desmos";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import CurveSlider from "./curve_slider.js";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import x1 from '../assets/images/x1.png';
import x from '../assets/images/x.png';
import x2 from '../assets/images/x2.png';
import x3 from '../assets/images/x3.png';

const timeSpent = {};
function recordTime(functionName, time) {
  if (!timeSpent[functionName]) timeSpent[functionName] = 0;
  timeSpent[functionName] += time;
  console.log(timeSpent); 
}


class Curves extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accordianIndex: 0,
      combinedCurves: 'combined',
      curveTypes: [
        {
          name: "Polynomial",
          curves: [
            {
              visible: false,
              image: x1,
              latex: "Y=(~~m~~(X+~~a~~)^{-1})+~~b~~",
              color: "DA9171",
              variables: {
                m: 1,
                a: 1,
                b: 0
              }
            }, {
              visible: true,
              image: x,
              latex: "Y=(~~m~~(X+~~a~~))+~~b~~",
              color: "9B51E0",
              variables: {
                m: 1,
                a: 1,
                b: 0
              }
            }, {
              visible: false,
              image: x2,
              latex: "Y=(~~m~~(X+~~a~~)^{2})+~~b~~",
              color: "32F3A4",
              variables: {
                m: 1,
                a: 1,
                b: 0
              }
            }, {
              visible: false,
              image: x3,
              latex: "Y=(~~m~~(X+~~a~~)^{3})+~~b~~",
              color: "17C3D1",
              variables: {
                m: 1,
                a: 1,
                b: 0
              }
            }
          ]
        },
        {
          name: "Periodic",
          curves: [
            {
              visible: false,
              image: x1,
              latex: "Y=(~~m~~(X+~~a~~)^{-1})+~~b~~",
              variables: {
                m: 1,
                a: 1,
                b: 0
              }
            }, {
              visible: false,
              image: x,
              latex: "Y=(~~m~~(X+~~a~~))+~~b~~",
              variables: {
                m: 1,
                a: 1,
                b: 0
              }
            }, {
              visible: false,
              image: x2,
              latex: "Y=(~~m~~(X+~~a~~)^{2})+~~b~~",
              variables: {
                m: 1,
                a: 1,
                b: 0
              }
            }, {
              visible: false,
              image: x3,
              latex: "Y=(~~m~~(X+~~a~~)^{3})+~~b~~",
              variables: {
                m: 1,
                a: 1,
                b: 0
              }
            }
          ]
        },
        {
          name: "Logarithmic",
          curves: []
        }
      ]
    };
  }

  componentDidMount() {
    this.setCombinedFunction();
  }

  setAccordian(index) {
   this.setState({
     accordianIndex: this.state.accordianIndex === index ? -1 : index
   });
  }

  handleCurveClick(curveType, curve) {
    const curveTypes = this.state.curveTypes;
    const curveTypeIndex = curveTypes.map((ct) => ct.name).indexOf(curveType);
    const curveIndex = curveTypes[curveTypeIndex].curves.map((c) => c.latex).indexOf(curve.latex);
    curveTypes[curveTypeIndex].curves[curveIndex].visible = !curveTypes[curveTypeIndex].curves[curveIndex].visible;
    this.setState({curveTypes: curveTypes});
    this.setCombinedFunction();
  }

  setCombinedFunction() {
    let constant = 0;
    let expressions = [];

    for (const curveType of this.state.curveTypes) {
      for (const curve of curveType.curves) {
        if (!curve.visible) continue;

        let latex = curve.latex.split("Y=")[1];
        for (const variable of Object.keys(curve.variables)) {
          const regexp = new RegExp(`~~${variable}~~`, 'g');
          if (variable.toString() === "b") { 
            latex = latex.split("+~~b~~")[0];
            constant += curve.variables[variable];
          } else {  
            latex = latex.replace(regexp, curve.variables[variable]);
          }
        }
        expressions.push(latex);
      }      
    }

    this.setState({combinedFunction: "Y=" + constant + "+" + expressions.join("+")});
  }

  handleCombined(event, value) {
    if (!value) return;
    this.setState({combinedCurves: value});
  }

  setCalculator() {
    const calculator = window.calculator;

    if (!calculator ||!calculator.getExpressions) {
      setTimeout(this.setCalculator.bind(this), 100);
      return;
    }

    const combined = this.state.combinedCurves === "combined";
    const expressions = calculator.getExpressions();
    const hiddenExpressions = expressions.filter((expression) => {
      if (!combined && expression.id === "combined") return true;
      if (expression.id.indexOf("curve") == -1) return false;
      for (const curveType of this.state.curveTypes) {
        for (const curve of curveType.curves) {
          if ("curve" + curve.latex === expression.id) {
            return combined || !curve.visible;
          }
        }
      }
      return false;          
    });  
    calculator.removeExpressions(hiddenExpressions);

    if (combined) {
      calculator.setExpression({
        id: 'combined',
        latex: this.state.combinedFunction,
        color: 'FFF',
        dragMode: Desmos.DragModes.NONE
      });
    }   
  }

  render() {
    this.setCalculator();

    const displayCurves = this.state.combinedCurves === 'constituents';
    return (
      <Container>
        {this.state.curveTypes.map((curveType, index) => 
          <Accordion expanded={this.state.accordianIndex === index} onChange={() => this.setAccordian(index)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"    
            >
              <Typography>{curveType.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                {curveType.curves.filter((curve) => curve.visible).map((curve) => 
                  <Grid item xs={12}>
                    <CurveSlider
                      displayed={displayCurves}
                      image={curve.image}
                      latex={curve.latex}
                      variables={curve.variables}
                      onChange={this.setCombinedFunction.bind(this)}
                    ></CurveSlider>
                  </Grid>
                )}
                {
                  curveType.curves.map((curve) => 
                    <Grid item xs={2} onClick={() => this.handleCurveClick(curveType.name, curve)}>
                      <img src={curve.image} height={50} alt="Curve"></img>
                    </Grid>
                  )
                }
              </Grid>              
            </AccordionDetails>
          </Accordion>
        )} 

        <Grid container spacing={3} style={{marginTop: 30}}> 
          <Grid item xs={12}>
            <Typography>Combined Function</Typography>
          </Grid>
          <Grid item xs={12}>
            <Latex>{this.state.combinedFunction}</Latex>
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={this.state.combinedCurves}
              exclusive
              onChange={this.handleCombined.bind(this)}
              aria-label="combine curves"
            >
              <ToggleButton value="constituents" aria-label="constituents">
                Constituents
              </ToggleButton>
              <ToggleButton value="combined" aria-label="combined">
                Combined
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>  
      </Container>
    );
  }
}

export default Curves;