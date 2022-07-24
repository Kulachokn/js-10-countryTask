const BASE_URL = 'https://restcountries.com/v3.1/name/';
const PARAMS = '?fields=name,capital,population,flags,languages';

export const fetchCountriesApi = name => {
  return fetch(`${BASE_URL}${name}${PARAMS}`)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

