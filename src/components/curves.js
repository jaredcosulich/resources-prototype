import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Container } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import CurveSlider from "./curve_slider.js";

class Curves extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accordianIndex: 0,
    };
  }

  setAccordian(index) {
   this.setState({
     accordianIndex: this.state.accordianIndex === index ? -1 : index
   });
  }

  render() {
    return (
      <Container>
       <Accordion expanded={this.state.accordianIndex === 0} onChange={() => this.setAccordian(0)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"    
          >
            <Typography>Polynomial</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CurveSlider></CurveSlider>

          </AccordionDetails>
        </Accordion>
        <Accordion expanded={this.state.accordianIndex === 1} onChange={() => this.setAccordian(1)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Periodic</Typography>
          </AccordionSummary>
          <AccordionDetails>
              
            <CurveSlider></CurveSlider>
          </AccordionDetails>
        </Accordion>  
        <Accordion expanded={this.state.accordianIndex === 2} onChange={() => this.setAccordian(2)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Logarithmic</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CurveSlider></CurveSlider>
        </AccordionDetails>
        </Accordion>     
      </Container>
    );
  }
}

export default Curves;