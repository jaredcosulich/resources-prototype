import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    width: 210,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value === '' ? '' : Number(event.target.value);
    setSliderValue(newValue);
  };

  const handleBlur = () => {
    if (value < -500) {
      setSliderValue(-500);
    } else if (value > 500) {
      setSliderValue(500);
    }
  };

  const setSliderValue = (newValue) => {
    setValue(newValue);
    props.onChange(props.title, newValue);
  } 

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          {props.title}
        </Grid>
        <Grid item xs>
          <Slider
            min={-20}
            max={20}
            step={0.1}
            value={typeof value === 'number' ? value : 0}
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
              step: 0.1,
              min: -20,
              max: 20,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}