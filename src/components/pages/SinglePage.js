import { useParams} from 'react-router-dom';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singlePage.scss';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
    const { id } = useParams();

    const [data, setData] = useState(0);
    let { loading, error, getCharacter, getComic, clearError } = useMarvelService();

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
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
    }
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = (loading) ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;
    return (

        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>

    )
}

export default SinglePage;