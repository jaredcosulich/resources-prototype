import React from "react";
import Typography from "@material-ui/core/Typography";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { Drawer } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputSlider from './input_slider.js';
import BasicTable from './basic_table.js';
import CurveSlider from "./curve_slider.js";

class ControlsDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accordianIndex: 1,
      rows: props.rows   
    };
  }

  setAccordian(index) {
   this.setState({
     accordianIndex: this.state.accordianIndex === index ? -1 : index
   });
  }

  render() {
    return (
      <Drawer anchor={'left'} open={true} variant={'permanent'}>
        <Accordion expanded={this.state.accordianIndex === 0} onChange={() => this.setAccordian(0)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"    
          >
            <Typography>Data & Plots</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BasicTable rows={this.state.rows}></BasicTable>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={this.state.accordianIndex === 1} onChange={() => this.setAccordian(1)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Explore & Fit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6">
              Polynomial
            </Typography>

            <CurveSlider></CurveSlider>
          </AccordionDetails>
        </Accordion>  
        <Accordion expanded={this.state.accordianIndex === 2} onChange={() => this.setAccordian(2)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Is My Curve Close Enough?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <InputSlider></InputSlider> 
          </AccordionDetails>
        </Accordion>      
      </Drawer>
    );
  }
} 

export default ControlsDrawer;
  