import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieList({ movies, loading, xs, md, lg, spacing }) {
  return (
    <Grid container spacing={spacing} mt={0.5}>
      {movies.map((movie, index) => (
        <Grid key={movie.id} item xs={xs} md={md} lg={lg}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieList;
