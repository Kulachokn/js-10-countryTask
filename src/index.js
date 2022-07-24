import './css/styles.css';

import {fetchCountriesApi} from './js/fetchCountriesApi';
// import countryAll from './templates/countryList.hbs';
// import countryCard from './templates/countryCard.hbs';

import debounce from 'lodash.debounce';
import {Notify} from 'notiflix';

const input = document.querySelector('input[id="search-box"]');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

// input.addEventListener('input', fetchCountries);
input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries() {
  const searchQuery = input.value.trim();

  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (searchQuery.length > 0) {
    fetchCountriesApi(searchQuery)
      .then(countries => {
        console.log(countries);
        if (countries.length > 0 && countries.length <= 10) {
          // renderMarkupHbs(countries);
          renderMarkupTmp(countries);
        } else if (countries.length > 10) {
          Notify.info('Too many matches found. Please enter a more specific query!');
        } else {
          Notify.failure('No matches found!');
        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      })
  }
}

// function renderMarkupHbs(countries) {
//     let markup = null;
//     if (countries.length === 1) {
//       countries[0].languages = Object.values(countries[0].languages).join(", ")
//       markup = countryCard(countries[0]);
//        countryInfo.insertAdjacentHTML('beforeend', markup);
//     } else if (countries.length <= 10 || countries.length > 1) {
//       markup = countryAll(countries);
//        countryList.insertAdjacentHTML('beforeend', markup);
//     }
// }


function countryTmp(countries) {
  return countries
    .map(({name, capital, population, languages, flags}) => {
      return `<h1 class="country-name">${name.common}</h1>
    <div class="country-wrapper">
        <p class="country-capital">Capital: ${capital}</p>
        <p class="country-population">Population: ${population}</p>
        <h2 class="country-languages">Languages: ${Object.values(languages).join(', ')} </h2>
        <div class="country__flag_wrapper">
            <img src="${flags.svg}" alt="country flag" class="country__flag" width="250">
        </div>
    </div>`
    })
}

function countriesListTmp(countries) {
  return countries
    .map(({name, flags}) => {
      return `<li class="country_list__item"><img src="${flags.svg}" alt="country flag" class="country__flag" width="50">${name.common}</li>`
    }).join('')
}

function renderMarkupTmp(countries) {
  let markup = null;
  if (countries.length === 1) {
    markup = countryTmp(countries);
     countryInfo.insertAdjacentHTML('beforeend', markup);
  } else if (countries.length <= 10 || countries.length > 1) {
    markup = countriesListTmp(countries);
     countryList.insertAdjacentHTML('beforeend', markup);
  }
}
