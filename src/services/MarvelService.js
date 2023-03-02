import { useHttp } from "../hooks/http.hook";

const  useMarvelService = () => {
    const {loading, request, error , clearError} = useHttp();
                      
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=35589cb5e6aa216ba55754511e0d35a8';
    const _baseOffset = 210; 

    // getResourse = async (url, data) => {
    //     const res = await fetch(url);
    
    //     if (!res.ok) {
    //        throw new Error (`Could not fetch ${url}, status: ${res.status}`);
    //     }
    //     // console.log(url);
    //     return await res.json();
    // };

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
        // return this.getResourse(`https://gateway.marvel.com:443/v1/public/characters?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        console.log(res);
        return _transformCharacter(res.data.results[0]);
        }

    const _transformCharacter = (char) => {
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
    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?noVariants=true&startYear=2021&limit=8&offset=${offset}&${_apiKey}`);
        // console.log(res);
        return res.data.results.map(_transformComics);
    }    

    const getComics = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        // console.log(res);
        return _transformComics(res.data.results[0]);
        }

    const _transformComics = (comics) => {
        return {
            title: comics.title,
            description: comics.description ? `${comics.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price,
            id: comics.id
            
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComics};
}

export default useMarvelService;