

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=35589cb5e6aa216ba55754511e0d35a8';

    getResourse = async (url, data) => {
        const res = await fetch(url);
    
        if (!res.ok) {
           throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }
        // console.log(url);
        return await res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
        // return this.getResourse(`https://gateway.marvel.com:443/v1/public/characters?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`);
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0]);
        }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comicsList: char.comics.items
        }
    }
}

export default MarvelService;