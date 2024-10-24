import  React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const BootstrapInput = styled(InputBase)(({ theme, width }) => ({
  "label + &": {
    marginTop: theme.spacing(2.5),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "8px 10px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function UserTextField(props) {
  const { label, value, heading, type, isTextArea, readOnly, index } =
    props;
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel shrink>{label}</InputLabel>
      {type === "file" ? (
        <BootstrapInput
          required
          type="file"
          inputProps={{ accept: ".pdf" }}
          onChange={(event) => {
            props.handleChange(event, index);
          }}
          
        />
      ) : (
        <BootstrapInput
          required
          readOnly={readOnly ? readOnly : false}
          type={type ? type : "text"}
          value={value}
          minRows={isTextArea ? 3 : 1}
          multiline={isTextArea ? isTextArea : false}
          onChange={(event) => {
            props.handleChange(label, event.target.value, heading, index);
          }}
          
        />
      )}
    </FormControl>
  );
}