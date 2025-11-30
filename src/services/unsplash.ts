const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';

export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
  };
}

export const searchImages = async (query: string, page: number = 1): Promise<UnsplashImage[]> => {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('Unsplash Access Key is missing');
    return [];
  }

  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${query}&page=${page}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching images:', error);
    return [];
  }
};

export const getPhotos = async (page: number = 1): Promise<UnsplashImage[]> => {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error('Unsplash Access Key is missing');
    return [];
  }

  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos?page=${page}&per_page=20&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
};
