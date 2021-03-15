import { from } from "rxjs";
import { map, startWith } from "rxjs/operators";

const API_BASE_URL = 'https://rickandmortyapi.com/api/character/';

const buildUrl = (url, params) =>
    `${url}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;


export const searchCharacters = (name) =>
    from(fetch(buildUrl(API_BASE_URL, { name })).then(resp => resp.json()))
        .pipe(
            map(data => ({ loading: false, data})),
            startWith({ loading: true }),
        );