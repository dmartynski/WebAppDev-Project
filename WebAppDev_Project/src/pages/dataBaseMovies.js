import { useQuery } from 'react-query';
import { getMovies, getMovieRuntime} from '../api/movies-api';
const DataBaseMovies = () => {
    const { data, error, isLoading, isError } = useQuery('discover', getMovies)
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;
    const moviesDisplay = (
        <div>
            {movies.map(movie => { return <li key={movie.id}>{movie.id},{movie.title}, {movie.release_date}<br /></li> })}
        </div>
    )
    return <div><h2>Movies</h2>{moviesDisplay}</div>
}

export default DataBaseMovies;