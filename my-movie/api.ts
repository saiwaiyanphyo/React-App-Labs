// OMDb API service
// Note: For production use, you should get your own API key from http://www.omdbapi.com/apikey.aspx
const API_KEY = 'trilogy'; // Demo key with limited usage
const BASE_URL = 'https://www.omdbapi.com/';

export interface OMDbMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  imdbRating?: string;
}

export interface OMDbSearchResponse {
  Search?: OMDbMovie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

export const searchMovies = async (searchTerm: string): Promise<OMDbMovie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: OMDbSearchResponse = await response.json();
    
    if (data.Response === 'False') {
      // OMDb API returns an error in the response
      if (data.Error === 'Movie not found!') {
        return []; // Return empty array for no results
      }
      throw new Error(data.Error || 'Unknown API error');
    }
    
    return data.Search || [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to search movies: ${error.message}`);
    }
    throw new Error('Failed to search movies: Unknown error');
  }
};

export const getMovieDetails = async (imdbID: string): Promise<OMDbMovie> => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: OMDbMovie = await response.json();
    
    if ((data as any).Response === 'False') {
      throw new Error((data as any).Error || 'Movie not found');
    }
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get movie details: ${error.message}`);
    }
    throw new Error('Failed to get movie details: Unknown error');
  }
};