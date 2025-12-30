import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import { getRecommendedMovies } from "../../api/tmdb-api";
import Typography from "@mui/material/Typography";
import { ImageListItem, Button } from "@mui/material";

const MovieRecommendations = ({ movie, open, onClose }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recs = await getRecommendedMovies(movie.id);
        setRecommendations(recs.results.slice(0, 5)); 
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      }
    };

    if (open) {
      fetchRecommendations();
    }
  }, [movie.id, open]);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
      }}
    >      <TableContainer component={Paper} sx={{ height: '50vh' }}>
    <Table sx={{ minWidth: 650 }} aria-label="recommendations table">
      <TableHead>
        <TableRow>
            <TableCell>

            </TableCell>
          <TableCell>
            <Typography variant="h6" sx={{ fontFamily: 'Playfair', fontWeight: 'bold' }}>
              Title
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="h6" sx={{ fontFamily: 'Playfair', fontWeight: 'bold' }}>
              Overview
            </Typography>
          </TableCell>
          <TableCell align="right" >
            <Typography variant="h6" sx={{ fontFamily: 'Playfair', fontWeight: 'bold' }}>
              More
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {recommendations.map((rec) => (
          <TableRow key={rec.id}>
            <TableCell >
              <ImageListItem>
                <img
                  src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`} // URL to movie poster
                  alt={rec.title}
                  style={{ width: 100, height: 150, objectFit: 'cover' }}
                />
              </ImageListItem>
            </TableCell>
            <TableCell  component="th" scope="row">
              <Typography sx={{ fontFamily: 'Playfair', fontWeight: 'bold' }}>
                {rec.title}
              </Typography>
            </TableCell>
            <TableCell >
              <Typography sx={{ fontFamily: 'Playfair', fontWeight: 'bold' }}>
                {rec.overview}
              </Typography>
            </TableCell>
            <TableCell align="right">
                  <Button
                    component={Link}
                    to={`/movies/${rec.id}`}
                    state={{ movie: rec }}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Check it out Here
                  </Button>
                </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    </Drawer>
  );
};

export default MovieRecommendations;