import { Box, Button, Stack, Typography, Chip } from "@mui/material";
import { FMultiCheckbox, FRadioGroup } from "./form";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export const FILTER_GENRE_OPTIONS = [];

function MovieFilter({ resetFilter, genres }) {
  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Genres
        </Typography>
        {genres.map((genre) => (
          <Stack direction="row" spacing={1}>
            <Chip label={genre.name} />
          </Stack>
        ))}
        <FMultiCheckbox
          name="genres"
          options={FILTER_GENRE_OPTIONS}
          sx={{ width: 1 }}
        />
      </Stack>

      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default MovieFilter;
