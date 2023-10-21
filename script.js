async function getSynonyms() {
    let url = 'https://www.openthesaurus.de/synonyme/search?q=test&format=application/json';
    let response = await fetch(url);
    console.log('Response is', response);
}