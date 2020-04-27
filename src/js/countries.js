`use strict`;
import countriesService from './countriesService';
import countriesListTemplate from '../template/countriesListTemplate.hbs';
import oneCountriesListTemplate from '../template/oneCountriesListTemplate.hbs';
import debounce from 'lodash.debounce';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const refs = {
  searchInput: document.querySelector('#search-input'),
  countryList: document.querySelector('#country-list'),
};
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

refs.searchInput.addEventListener(
  'input',
  debounce(e => {
    searchFormSubmitHandler(e);
  }, 500),
);

function searchFormSubmitHandler(e) {
  e.preventDefault();
  clearListItems();
  const searchQuery = e.target.value;
  countriesService.fetchCountries(searchQuery).then(items => {
    const oneCountriesMarkup = oneCountriesListTemplate(items);
    const CountriesMarkup = countriesListTemplate(items);
    if (items.length === 1) {
      insertListItems(oneCountriesMarkup);
    } else if (items.length >= 2 && items.length <= 10) {
      insertListItems(CountriesMarkup);
    } else if (items.length > 10) {
      toastr.error('Your request includes more than 10 countries!');
    } else {
      toastr.error('Error!');
    }
  });
}
function insertListItems(items) {
  refs.countryList.insertAdjacentHTML('beforeend', items);
}

function clearListItems() {
  refs.countryList.innerHTML = '';
}
