let cardTitle = [
    'Ähnlichste Synonyme:',
    'Verwandte Synonyme:',
    'Assoziierte Synonyme:',
    'Ferne Synonyme:',
    'Weitere ferne Synonyme:',
];

let allTerms = 0;


async function getSynonyms() {
    let query = document.getElementById('search-query').value;
    let url = `https://www.openthesaurus.de/synonyme/search?q=${query}&format=application/json`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let synsets = responseAsJson['synsets'];
    renderSynsets(synsets);
}


function renderSynsets(synsets) {
    let synsum = document.getElementById('synsum');
    let contentContainer = document.getElementById('content-container');

    contentContainer.innerHTML = '';
    renderCards(synsets, contentContainer);
    synsum.innerHTML = allTermsTextTemplate();
    allTerms = 0;
}


function renderCards(synsets, contentContainer) {
    for (let i = 0; i < 5; i++) {
        const synset = synsets[i];
        let terms = synset['terms'];
        contentContainer.innerHTML += cardTemplate(i);  
        renderCardLists(terms, i);
    }
}


function renderCardLists(terms, i) {
    for (let j = 0; j < terms.length; j++) {
        const term = terms[j];
        let listContent = document.getElementById(`list-content${i}`);
        listContent.innerHTML += listOfCardTemplate(term);
        allTerms++; 
    }
}


function cardTemplate(i) {
    return /*html*/`
    <div class="content-card" id="content${i}">
        <div class="center"><h2>${cardTitle[i]}</h2></div>
        <ul class="list-group" id="list-content${i}">
        
        </ul>
    </div>`;
}


function listOfCardTemplate(term) {
    return /*html*/`<li class="list-group-item">${term['term']}</li>`;
}


function allTermsTextTemplate() {
    return /*html*/`<span>Es wurden <b>${allTerms}</b> Synonyme gefunden.</span>`;
}