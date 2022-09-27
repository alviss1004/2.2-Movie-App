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
import Divider from "@mui/material/Divider";
import { PaginationItem } from "@mui/material";
import { Link, useParams, useSearchParams } from "react-router-dom";

function TvShowsPage() {
  const [tvshows, setTvshows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { pageId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("filter");

  const handleChange = (event) => {
    setGenreId(event.target.value);
  };

  useEffect(() => {
    const getTvshows = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/discover/tv?api_key=${API_KEY}&page=${pageId}&with_genres=${genreId}`
        );
        setTvshows(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getTvshows();
    window.scrollTo(0, 0);
  }, [pageId, genreId]);

  useEffect(() => {
    const getGenres = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(`/genre/tv/list?api_key=${API_KEY}`);
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

  useEffect(() => {
    const searchTvs = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/search/tv?api_key=${API_KEY}&query=${q}&language=en-US&page=1`
        );
        setSearchedMovies(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    searchTvs();
  }, [q]);

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
            ) : q ? (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <>
                    <Typography
                      fontSize={37}
                      fontWeight={750}
                      fontFamily={"Trebuchet MS"}
                    >
                      Search Results (tvshows)
                    </Typography>
                    <Divider sx={{ borderBottomWidth: 2 }} />
                    <MovieList
                      movies={searchedMovies}
                      type={1}
                      spacing={5}
                      xs={6}
                      md={4}
                      lg={1.5}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <>
                    <Stack direction="row" spacing={5}>
                      <Typography fontSize={40} fontWeight={750}>
                        Tv Shows
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
                      movies={tvshows}
                      type={1}
                      spacing={8}
                      xs={6}
                      md={3}
                      lg={2}
                    />
                    <Pagination
                      size="large"
                      sx={{
                        mt: 10,
                        mb: 5,
                        display: "flex",
                        justifyContent: "center",
                      }}
                      count={10}
                      color="error"
                      defaultPage={parseInt(pageId)}
                      renderItem={(item) => (
                        <PaginationItem
                          component={Link}
                          to={`/tvshows/${item.page}`}
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

export default TvShowsPage;
