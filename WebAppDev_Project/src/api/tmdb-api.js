export const getMovies = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error;
  });
};

export const getUpcoming = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error;
  });
};
  
  export const getMovie = async (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
  
    try {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      if (!movieResponse.ok) {
        throw new Error(await movieResponse.json().message);
      }
      const movieData = await movieResponse.json();
  
      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      if (!creditsResponse.ok) {
        throw new Error(await creditsResponse.json().message);
      }
      const creditsData = await creditsResponse.json();
  
      return { ...movieData, actors: creditsData.cast };
    } catch (error) {
      throw error;
    }
  };
  
  export const getGenres = async () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        return json.results;
      });
  };

  export const getRecommendedMovies = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
      throw error;
    }
  };

  export const getAlternativeTitles = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/alternative_titles?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch alternative titles");
      }
  
      const data = await response.json();
      return data.titles.slice(0, 3); 
    } catch (error) {
      console.error("Error fetching alternative titles:", error);
      throw error;
    }
  };


  export const getPopular = (page = 1) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error;
    });
  };


  export const getTopRatedMovies = (page = 1) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
    )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.status_message || 'Failed to fetch');
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
  };