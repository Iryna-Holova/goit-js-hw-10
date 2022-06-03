import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryListContainer = document.querySelector('.country-list');
const countryCardContainer = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch() {
    const searchKey = input.value.trim();

    if (searchKey === '') {
        resetResults();
        return;
    }
    fetchCountries(searchKey)
        .then(renderResult)
        .catch(error => {
            Notiflix.Notify.failure("Oops, there is no country with that name");
            resetResults();
            console.log(error);
        })
};

function renderResult(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        resetResults();
    } else if (countries.length === 1) {
        countryInfoMarkup(countries);
    } else {
        countryListMarkup(countries);
    }
}

function countryListMarkup(countries) {
    const markup = countries
        .map(({ flags, name }) => {
        return `
        <li class='list-item'>
            <img src="${flags.svg}" alt="${name.official} flag" width='50px' height='35px' />
            <span class='item-name'>${name.official}</span>
        </li>
        `;})
        .join('');

    countryListContainer.innerHTML = markup;
    countryCardContainer.innerHTML = '';
}

function countryInfoMarkup(countries) {
    const markup = countries
        .map(({ flags, name, capital, population, languages }) => {
            return `
        <h2 class='card-name'>
            <img src="${flags.svg}" alt="${name.official} flag" width='50px' height='35px' />
            ${name.official}
        </h2>
        <p class='card-property'><span class='property-name'>Capital:</span> ${capital}</p>
        <p class='card-property'><span class='property-name'>Population:</span> ${population}</p>
        <p class='card-property'><span class='property-name'>Languages:</span> ${Object.values(languages)}</p >
        `;})
        .join('');
    
    countryCardContainer.innerHTML = markup;
    countryListContainer.innerHTML = '';
}

function resetResults() {
    countryListContainer.innerHTML = '';
    countryCardContainer.innerHTML = '';
}

Notiflix.Notify.init({
  width: '500px',
  fontSize: '24px',
});