// const ACCESS_KEY = 'VtkyZclbIU7UrMrtQ3uSgnyrIX1rIwYXw6Io9ylC3jw';
const ACCESS_KEY = '4ZOB7gZHU_9VBGNU2Dlu0xfKEZMDqZPT-illLk5d37g';

export const initialFetch = async (page: number = 1) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?client_id=${ACCESS_KEY}&page=${page}&per_page=20`,
    );
    return await response.json();
  } catch {
    console.log('initialSearch: data were not load');
  }
};

export const fetchSearch = async ({
  query,
  page,
  isNewQuery,
}: {
  query: string;
  page: number;
  isNewQuery: boolean;
}) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&page=${page}&query=${query}&per_page=20`,
    );

    const data = await response.json();

    return {data, isNewQuery};
  } catch {
    console.log('fetchSearch: data were not load');
  }
};
