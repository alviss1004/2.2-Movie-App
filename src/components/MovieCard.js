import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <motion.div whileHover={{ scale: 1.15 }}>
      <Card
        onClick={() => {
          navigate(`/movie/${movie.id}`);
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="100%"
            image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
        </CardActionArea>
      </Card>
    </motion.div>
  );
}

export default MovieCard;
