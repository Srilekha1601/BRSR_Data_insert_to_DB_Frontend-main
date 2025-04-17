import { Autocomplete, TextField } from "@mui/material";

const SearchableDropdown= ({ label, options, value, onChange }) => {
  return (
    <Autocomplete
      options={options || []}
      value={value || null}
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => (typeof option === "string" ? option : option?.name || "")}
      isOptionEqualToValue={(option, value) =>
        typeof option === "string" ? option === value : option?.code === value?.code
      }
      sx={{ cursor: "pointer" }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
};

export default SearchableDropdown;
