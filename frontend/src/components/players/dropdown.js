import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect({ value, onChange }) {
  const classes = useStyles();
  //   const [position, setPosition] = React.useState("");

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="simple-select-label">
          Position <i className="text-danger">required</i>
        </InputLabel>
        <Select value={value} onChange={onChange} required>
          <MenuItem value={"Setter"}>Setter</MenuItem>
          <MenuItem value={"Opposite"}>Opposite</MenuItem>
          <MenuItem value={"Middle-Blocker"}>Middle-Blocker</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
