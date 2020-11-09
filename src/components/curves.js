import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Container, Grid } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import CurveSlider from "./curve_slider.js";
import x1 from '../assets/images/x1.png';
import x from '../assets/images/x.png';
import x2 from '../assets/images/x2.png';
import x3 from '../assets/images/x3.png';

class Curves extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accordianIndex: 0,
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
              visible: true,
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
  }

  render() {
    const calculator = window.calculator;


    if (calculator) {
      const expressions = calculator.getExpressions();
      
      const hiddenExpressions = expressions.filter((expression) => {
        for (const curveType of this.state.curveTypes) {
          for (const curve of curveType.curves) {
            if (curve.latex === expression.id) {
              return !curve.visible;
            }
          }
        }
        return false;          
      });
      calculator.removeExpressions(hiddenExpressions);  
    }

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
                      image={curve.image}
                      latex={curve.latex}
                      variables={curve.variables}
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
      </Container>
    );
  }
}

export default Curves;