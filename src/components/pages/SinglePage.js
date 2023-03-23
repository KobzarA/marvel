import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import './singlePage.scss';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
    const { id } = useParams();

    const [data, setData] = useState(0);
    let {getCharacter, getComic, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        update(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onDataLoaded = (data) => {
        setData(data);
    }

    const update = (id) => {
        clearError();

        // eslint-disable-next-line default-case
        switch(dataType) {
            case 'comic': 
                getComic(id).then(onDataLoaded).then(() => setProcess("confirmed"));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded).then(() => setProcess("confirmed"));
        }
    }
    
    return (

        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>

    )
}

export default SinglePage;