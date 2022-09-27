import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import MovieList from "../components/MovieList";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { API_KEY } from "../app/config";
import Divider from "@mui/material/Divider";

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topratedMovies, setTopratedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTrendingMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}&page=1`
        );
        setTrendingMovies(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getTrendingMovies();
  }, []);

  useEffect(() => {
    const getPopularMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/movie/popular?api_key=${API_KEY}&page=1`
        );
        setPopularMovies(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getPopularMovies();
  }, []);

  useEffect(() => {
    const getTopratedMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get(
          `/movie/top_rated?api_key=${API_KEY}&page=1`
        );
        setTopratedMovies(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getTopratedMovies();
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
                    <Typography
                      fontSize={37}
                      fontWeight={750}
                      fontFamily={"Trebuchet MS"}
                    >
                      Trending Now
                    </Typography>
                    <Divider sx={{ borderBottomWidth: 2 }} />
                    <MovieList
                      movies={trendingMovies}
                      spacing={5}
                      xs={6}
                      md={4}
                      lg={1.5}
                    />
                    <Typography
                      fontSize={37}
                      fontWeight={750}
                      fontFamily={"Trebuchet MS"}
                      mt={5}
                    >
                      Popular
                    </Typography>
                    <Divider sx={{ borderBottomWidth: 2 }} />
                    <MovieList
                      movies={popularMovies}
                      spacing={5}
                      xs={6}
                      md={4}
                      lg={1.5}
                    />
                    <Typography
                      fontSize={37}
                      fontWeight={750}
                      fontFamily={"Trebuchet MS"}
                      mt={5}
                      fontweight={1200}
                    >
                      Top Rated
                    </Typography>
                    <Divider sx={{ borderBottomWidth: 2 }} />
                    <MovieList
                      movies={topratedMovies}
                      spacing={5}
                      xs={6}
                      md={4}
                      lg={1.5}
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

export default HomePage;
