export const getMovies = async () => {
    const response = await fetch(
      'http://localhost:8080/api/movies', {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    )
    return response.json();
  };
  
  export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
  };
  
  export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
  };

  //2 new API calls for extending mongo API.

  export const getUsernames = async () => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Authorization': window.localStorage.getItem('token')
        }
    });

    return response.json();
};

export const getMovieReleaseDate = async (movieId) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/${movieId}/release_date`, 
    {
      headers: {
        'Authorization': window.localStorage.getItem('token'), 
      },
    }
  );
  const data = await response.json();
  return data.release_date; 
};