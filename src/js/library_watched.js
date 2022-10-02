import renderFilmCard from './renderCard';
import renderNotification from '../templates/renderNotification';
import { watchedKeyStorage } from './watched-list';
import FilmsPagination from './pagination';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '280px',
  position: 'center-top',
  distance: '10px',
  opacity: 1,
});

const watchedListBtn = document.querySelector('.watched-btn-js');
const filmList = document.querySelector('.film__list');

export function loadWatchedFilms() {
  watchedListBtn.classList.add('active-js');

  filmList.innerHTML = '';

  const watchedFilms = JSON.parse(localStorage.getItem(watchedKeyStorage));
  if (watchedFilms && watchedFilms.length > 0) {
    renderFilmCard(watchedFilms.slice(0, 20), 'watched');

    const paginator = new FilmsPagination(null, watchedFilms.length);
    paginator.pagination.on('afterMove', paginatePage);
    return
  } else {
    filmList.innerHTML = renderNotification();
    Notiflix.Notify.failure('No films in your watched list!');
    return
  }
}

watchedListBtn.addEventListener('click', loadWatchedFilms);

function paginatePage(event) {
  const currentPage = event.page;
  const watchedFilms = JSON.parse(localStorage.getItem(watchedKeyStorage));
  const films = document.querySelector('.film__list');
  films.innerHTML = '';
  const films_array = watchedFilms.slice(
    currentPage * 20 - 20,
    currentPage * 20
  );
  renderFilmCard(films_array);
}

