import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import MovieList from "../components/MovieList";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { API_KEY } from "../app/config";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { PaginationItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const CenterPagination = styled(Pagination)(({ theme }) => ({
  ul: {
    justifyContent: "center",
  },
}));

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { pageId } = useParams();

  const handleChange = (event) => {
    setGenreId(event.target.value);
  };

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/discover/movie?api_key=${API_KEY}&page=${pageId}&with_genres=${genreId}`
        );
        setMovies(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, [pageId, genreId]);

  useEffect(() => {
    const getGenres = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/genre/movie/list?api_key=${API_KEY}`
        );
        setGenres(res.data.genres);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getGenres();
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          minHeight: "100vh",
          minWidth: "90vw",
          mt: 10.5,
        }}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <>
                    <Stack direction="row" spacing={5}>
                      <Typography fontSize={40} fontWeight={750}>
                        Movies
                      </Typography>

                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="genre-select">Genre</InputLabel>
                          <Select
                            labelId="genre-select"
                            id="genre"
                            value={genreId}
                            label="Genre"
                            onChange={handleChange}
                          >
                            {genres.map((genre) => (
                              <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Stack>
                    <Divider sx={{ borderBottomWidth: 2, mt: 1 }} />
                    <MovieList
                      movies={movies}
                      spacing={12}
                      xs={6}
                      md={3}
                      lg={2}
                    />
                    <CenterPagination
                      size="large"
                      sx={{ mt: 10, mb: 5 }}
                      count={10}
                      color="error"
                      renderItem={(item) => (
                        <PaginationItem
                          component={Link}
                          to={`/movies/${item.page}`}
                          {...item}
                        />
                      )}
                    />
                  </>
                )}
              </>
            )}
          </Box>
        </Stack>
      </Container>
    </>
  );
}

export default MoviesPage;
