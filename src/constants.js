import axios from 'axios';
import moment from 'moment';
import jsonpAdapter from 'axios-jsonp';
import { API_KEY } from './secret';

const DATE_REQUEST_FORMAT = 'YYYY-MM-DD';
const DATE_FORMAT = 'YYYY-MM-DD';
export const currentDate = moment().format(DATE_REQUEST_FORMAT);
export const earliestDate = moment().subtract(3, 'weeks').format(DATE_REQUEST_FORMAT);
export const futureDate = moment().add(3, 'weeks').format(DATE_REQUEST_FORMAT);
export const API_KEY_PARAMETER = `api_key=${API_KEY}`;
export const TINY_IMG_URL = 'https://image.tmdb.org/t/p/w45';
export const TINY_POSTER_URL = 'https://image.tmdb.org/t/p/w185';
export const POSTER_IMG_URL = 'https://image.tmdb.org/t/p/w300';
export const BACKDROP_IMG_URL = 'https://image.tmdb.org/t/p/w1280';
export const BACKDROP_MID_URL = 'https://image.tmdb.org/t/p/w500';
export const IMG_URL = 'https://image.tmdb.org/t/p/w300';
export const MID_IMG_URL = 'https://image.tmdb.org/t/p/w780';
export const LARGE_IMG_URL = 'https://image.tmdb.org/t/p/w780';
export const PROFILE_IMG_URL = 'https://image.tmdb.org/t/p/w92';

export const fetch = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    adapter: jsonpAdapter,
});

export const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
];

export const sortHandler = (item1, item2, filter) => {
    switch(filter) {
        case 'Popularity':
            return sortByPopularity(item1, item2);
        case 'Date desc': 
            return sortByDate(item1, item2);
        case 'Date asc': 
            return sortByDateReverse(item1, item2);
        case 'Title': 
            return sortByTitle(item1, item2);
        default:
            return sortByDate(item1, item2);
    }
}

const sortByDate = (a, b) => {
    const dateA = moment(a.release_date, DATE_FORMAT)
    const dateB = moment(b.release_date, DATE_FORMAT)
    if (dateA > dateB) {
        return -1;
    }

    if (dateA < dateB) {
        return 1;
    }

    return 0;
}

const sortByDateReverse = (a, b) => {
    const dateA = moment(a.release_date, DATE_FORMAT);
    const dateB = moment(b.release_date, DATE_FORMAT);
    if (dateA < dateB) {
        return -1;
    }

    if (dateA > dateB) {
        return 1;
    }

    return 0;
}

const sortByPopularity = (a, b) => {
    if (a.popularity > b.popularity) {
        return -1;
    }

    if (a.popularity < b.popularity) {
        return 1;
    }
    return 0;
}

const sortByTitle = (a, b) => {
    if (a.title < b.title) {
        return -1;
    }

    if (a.title > b.title) {
        return 1;
    }
    return 0;
}

export const decadeStart = (decade) => {
    return moment(`01/01/${decade}`, 'MM/DD/YYYY').format(DATE_REQUEST_FORMAT);
}

export const decadeEnd = (decade) => {
    return moment(`12/31/${decade+9}`, 'MM/DD/YYYY').format(DATE_REQUEST_FORMAT);
}
export const decades = [2020, 2010, 2000, 1990, 1980, 1970, 1960, 1950, 1940, 1930, 1920, 1910, 1900];
export const decadeFilterHandler = ((item, filter, year) => {
    if (filter === 'All') return true;
    const releaseDateYear = moment(item.release_date, DATE_FORMAT).year();
    let decade = [filter];
    for (let i = filter; i < (filter+10); i++) {
        decade.push(i);
    }

    if (!!year && !year.toString().includes('s'))
        return releaseDateYear === year;

    return decade.some(d => d === releaseDateYear);
});