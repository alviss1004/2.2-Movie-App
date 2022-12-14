import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
  Chip,
  Avatar,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";
import { API_KEY } from "../app/config";

function TvDetailPage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const getMovie = async () => {
        setLoading(true);
        try {
          const res = await apiService.get(
            `/tv/${params.id}?api_key=${API_KEY}&language=en-US`
          );
          setMovie(res.data);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getMovie();
      window.scrollTo(0, 0);
    }
  }, [params]);

  return (
    <Container sx={{ mt: 10 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/tvshows/1"
        >
          Tvshows
        </Link>
        <Typography color="text.primary">{movie?.original_name}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {movie && (
                  <Stack
                    minWidth="80%"
                    flexDirection={{ xs: "column", md: "row" }}
                    sx={{ borderRadius: "10px" }}
                    justifyContent="center"
                  >
                    <Stack
                      my={3}
                      minWidth="350px"
                      sx={{
                        borderRadius: "10px",
                      }}
                    >
                      <Box>
                        <img
                          alt={`${movie.original_name}`}
                          height="500px"
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          style={{ borderRadius: "10px" }}
                        />
                      </Box>
                    </Stack>

                    <Stack
                      my={3}
                      pl={{ xs: 0, md: 1 }}
                      minHeight="100%"
                      minWidth="400px"
                      justifyContent="space-between"
                    >
                      <Stack
                        justifyContent="space-between"
                        alignItems="center"
                        flexDirection="row"
                      >
                        <Typography
                          variant="h3"
                          fontFamily={"Tahoma"}
                          letterSpacing={2}
                          fontWeight={600}
                        >
                          {`${movie.original_name}`}
                        </Typography>
                      </Stack>
                      <Stack
                        flexDirection={"row"}
                        justifyContent="space-between"
                      >
                        <Typography variant="h6">
                          Rating:
                          <Rating
                            name="half-rating"
                            defaultValue={movie.vote_average / 2}
                            precision={0.5}
                            sx={{ mx: 1 }}
                          />{" "}
                          {Math.round(movie.vote_average * 10) / 10}/10
                        </Typography>
                        <Typography variant="h6">
                          Status: {movie.status}
                        </Typography>
                      </Stack>
                      <Divider />
                      <Stack my={{ xs: 2, md: 0 }}>
                        <Typography variant="body">
                          {`${movie.overview}`}
                        </Typography>
                      </Stack>
                      <Divider />
                      <Stack>
                        <Stack
                          my={{ xs: 2, md: 1 }}
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography mr={1} variant="body">
                            Genres:
                          </Typography>
                          {movie.genres.map((item) => (
                            <Chip
                              key={`${item.id}`}
                              label={`${item.name}`}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                        <Stack
                          my={{ xs: 2, md: 1 }}
                          flexDirection="row"
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <Typography mr={1} variant="body">
                            Produced by:
                          </Typography>
                          {movie.production_companies
                            .filter((item) => item.logo_path !== null)
                            .map((company) => (
                              <Chip
                                key={`${company.id}`}
                                avatar={
                                  <Avatar
                                    alt="Natacha"
                                    src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
                                  />
                                }
                                label={`${company.name}`}
                                size="small"
                                variant="filled"
                              />
                            ))}
                        </Stack>
                        <Stack
                          my={{ xs: 2, md: 1 }}
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography mr={1} variant="body">
                            First Aired: {movie.first_air_date}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                )}
                {!movie && (
                  <Typography variant="h6">404 Movie not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default TvDetailPage;
