const ACCESS_KEY = 'VtkyZclbIU7UrMrtQ3uSgnyrIX1rIwYXw6Io9ylC3jw';

export const fetchSearch = async ({
  query,
  page,
  perPage,
}: {
  query: string;
  page: number;
  perPage: number;
}) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&page=${page}&query=${query}&per_page=${perPage}`);
    return await response.json();
  } catch {
    console.log('fetchSerach: data were not load');
  }
};

export const fetchPhotoUrl = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Couldn't load a photo");
    }

    return await response.json();
  } catch {
    console.log("Couldn't load a photo");
  }
};
