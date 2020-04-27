`use strict`;

export default {
  fetchCountries(searchQuery) {
    const baseUrl = `https://restcountries.eu/rest/v2/`;
    const requestResalt = `name/${searchQuery}`;
    return fetch(baseUrl + requestResalt)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => console.error(error));
  },
};
