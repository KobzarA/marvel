import { useHttp } from "../hooks/http.hook";

const  useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();
                      
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=35589cb5e6aa216ba55754511e0d35a8';
    const _baseOffset = 210; 

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
       
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
        }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?nameStartsWith=${name}&${_apiKey}`)
        return res.data.results.map(_transformCharacter);
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
        return res.data.results.map(_transformComic);
    }    

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
        }

    const _transformComic= (comic) => {
        return {
            title: comic.title,
            description: comic.description ? `${comic.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price,
            id: comic.id,
            pageCount: comic.pageCount,
            language: comic.textObjects[0] ? comic.textObjects[0].language : 'No information'
            
        }
    }

    return {
        process,
        setProcess,
        clearError, 
        getAllCharacters, 
        getCharacter, 
        getAllComics, 
        getComic, 
        getCharacterByName };
}

export default useMarvelService;