import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, switchMap, map, tap } from "rxjs/operators";

import { searchCharacters } from "./api";

const result = document.querySelector('.chars');
const input = document.getElementById('search-input');

const clearNode = (el) => {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

const charToNode = ({ name }) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(name));
    return li;
}

const render = ({ loading, data }) => {

    const list = result.querySelector('ul');
    clearNode(list);

    if (loading) {
        result.classList.remove('chars--empty');
        result.classList.add('chars--loading');
    } else {
        result.classList.remove('chars--loading');
        if (data && !data.error && data.results.length) {
            list.append(...data.results.map(charToNode));
        } else {
            result.classList.add('chars--empty');
        }
    }
    
} 


const main = () => {

    fromEvent(input, 'input')
        .pipe(
            debounceTime(300),
            map(event => event.target.value),
            distinctUntilChanged(),
            filter(name => name && name.length > 2),
            switchMap(name => searchCharacters(name)),
        )
        .subscribe(render);
}

main();