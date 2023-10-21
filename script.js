let cardTitle = [
    'Ähnlichste Synonyme:',
    'Verwandte Synonyme:',
    'Assoziierte Synonyme:',
    'Ferne Synonyme:',
    'Weitere ferne Synonyme:',
    'Weitere ferne Synonyme:',
    'Weitere ferne Synonyme:',
    'Weitere ferne Synonyme:'
];

let allTerms = 0;


async function getSynonyms() {
    let url = 'https://www.openthesaurus.de/synonyme/search?q=test&format=application/json';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let synsets = responseAsJson['synsets'];
    renderSynsets(synsets);
}


function renderSynsets(synsets) {
    let synsum = document.getElementById('synsum');
    let contentContainer = document.getElementById('content-container');

    
    contentContainer.innerHTML = '';


    for (let i = 0; i < synsets.length; i++) {
        const synset = synsets[i];
        let terms = synset['terms'];
        contentContainer.innerHTML += /*html*/`
        <div class="content-card" id="content${i}">
            <div class="center"><h2>${cardTitle[i]}</h2></div>
            <ul class="list-group" id="list-content${i}">
            
            </ul>
        </div>`;
    

        for (let j = 0; j < terms.length; j++) {
            const term = terms[j];
            let listContent = document.getElementById(`list-content${i}`);
            listContent.innerHTML += /*html*/`<li class="list-group-item">${term['term']}</li>`;
            allTerms++;
            
        }
    }
    synsum.innerHTML = /*html*/`<span>Es wurden <b>${allTerms}</b> Synonyme gefunden.</span>`;
}