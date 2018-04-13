import { fetch, API_KEY_PARAMETER, currentDate, earliestDate, futureDate, genres, decades, decadeStart, decadeEnd } from '../constants';

export const getPopularData = () => {
    return fetch(`/discover/movie?sort_by=popularity.desc&${API_KEY_PARAMETER}`).then(res => res);
}

export const getShowingData = () => {
    return fetch(`/discover/movie?sort_by=popularity.desc&primary_release_date.gte=${earliestDate}&primary_release_date.lte=${currentDate}&${API_KEY_PARAMETER}`)
                .then(res => res);
}

export const getUpcommingData = () => {
    return fetch(`/discover/movie?sort_by=popularity.desc&primary_release_date.gte=${currentDate}&primary_release_date.lte=${futureDate}&${API_KEY_PARAMETER}`)
                .then(res => res);
}

export const getMovieByID = (id) => {
    return fetch(`/movie/${id}?${API_KEY_PARAMETER}`).then(res => res.data);
}

export const getMovieCast = (id) => {
    return fetch(`/movie/${id}/credits?${API_KEY_PARAMETER}`).then(res => res.data);
}

export const getMovieImages = (id) => {
    return fetch(`/movie/${id}/images?${API_KEY_PARAMETER}`).then(res => res.data);
}

export const getMovieVideos = (id) => {
    return fetch(`/movie/${id}/videos?${API_KEY_PARAMETER}`).then(res => res.data);
}

export const getMovieReccomendations = (id) => {
    return fetch(`/movie/${id}/recommendations?${API_KEY_PARAMETER}`).then(res => res.data);
}

export const searchMovies = (query, page = 1) => {
    return fetch(`/search/movie?query=${query}&page=${page}&${API_KEY_PARAMETER}`).then(res => res.data);
}

export const searchPeople = (query, page = 1) => {
    return fetch(`/search/person?query=${query}&page=${page}&search_type=ngram&${API_KEY_PARAMETER}`).then(res => res.data);
}

export const getProfile = (id) => {
    return fetch(`/person/${id}/combined_credits?${API_KEY_PARAMETER}`).then(res => res.data);
}

export const getProfileDetails = (id) => {
    return fetch(`/person/${id}?${API_KEY_PARAMETER}`).then(res => res.data);
}

export const findMovies = (sortby, genre, decade, page = 1) => {
    const genreItem = genres.find(g => g.name === genre);
    const genreParameter = !!genreItem ? `&with_genres=${genreItem.id}` : '';
    const decadeParameter = decades.some(d => d === (decade*1)) ? `&primary_release_date.gte=${decadeStart(decade)}&primary_release_date.lte=${decadeEnd(decade)}` : '';
    return fetch(`/discover/movie?sort_by=${sortby}&page=${page}${genreParameter}${decadeParameter}&${API_KEY_PARAMETER}`).then(res => res.data);
}
