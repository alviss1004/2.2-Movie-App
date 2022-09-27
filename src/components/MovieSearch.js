import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { FTextField } from "./form";

function MovieSearch() {
  return (
    <FTextField
      name="searchQuery"
      sx={{
        width: 300,
        backgroundColor: "#333133",
        ":hover": {
          filter: "brightness(130%)",
        },
      }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default MovieSearch;
