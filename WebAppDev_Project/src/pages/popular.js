import React, { useState } from "react";
import { getPopular } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';

const Popular = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery(
    ['popular', currentPage],
    () => getPopular(currentPage),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Popular Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />;
        }}
      />
      <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
        <Pagination
          count={data.total_pages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </>
  );
};

export default Popular;