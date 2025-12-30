import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import MovieRecommendations from "../movieRecommendations";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { getAlternativeTitles } from "../../api/tmdb-api"; 

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recDrawerOpen, setRecDrawerOpen] = useState(false);
  const [alternativeTitles, setAlternativeTitles] = useState([]);

  useEffect(() => {
    const fetchAlternativeTitles = async () => {
      try {
        const titles = await getAlternativeTitles(movie.id);
        setAlternativeTitles(titles);
      } catch (error) {
        console.error("Failed to fetch alternative titles:", error);
      }
    };

    fetchAlternativeTitles();
  }, [movie.id]);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} />
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.iso_3166_1}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Actors" sx={{ ...chip }} color="primary" />
        </li>

        {movie.actors.slice(0, 3).map((actor) => (
          <li key={actor.name}>
            <Chip label={actor.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>

      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6" component="h4">
          Alternative Titles
        </Typography>
        <List>
          {alternativeTitles.map((title) => (
            <ListItem key={title.iso_3166_1}>
              <ListItemText primary={title.title} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '4em',
          right: '1em',
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
        <Fab
          color="primary"
          variant="extended"
          onClick={() => setRecDrawerOpen(true)}
          sx={{
            width: '150%',
          }}
        >
          <NavigationIcon />
          Recommended
        </Fab>
      </div>
      <MovieRecommendations movie={movie} open={recDrawerOpen} onClose={() => setRecDrawerOpen(false)} />
    </>
  );
};

export default MovieDetails;