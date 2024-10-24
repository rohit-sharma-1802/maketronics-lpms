import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel } from "@mui/material";

const BootstrapInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.mode === "light" ? "#bdbdbd" : "#8a8a8a",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputBase-root":{
    padding: "0px",
    marginTop:"20px"
  },
  "& .MuiOutlinedInput-input": {
    padding: "0", 
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.mode === "light" ? "#555" : "#ccc",
    zIndex: 1, // Ensure label is on top of input text
  },
}));

export default function MultiInputField({ label, handleChange, heading, values, options, length, index }) {
  const handleAutocompleteChange = (event, value) => {
    if(length && value.length > length)
      return;
    handleChange(label, value, heading, index);
  };

  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel shrink>{label}</InputLabel>
      <Autocomplete
        multiple
        freeSolo
        id="multi-input-field"
        options={options ? options : []}
        value={values}
        onChange={handleAutocompleteChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <BootstrapInput
            {...params}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </FormControl>
  );
}
