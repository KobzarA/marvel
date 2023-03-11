import { useParams, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComicPage.scss';

const SingleCharacterPage = () => {
    const { id } = useParams();

    const [info, setInfo] = useState(0);
    let { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        update(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const onLoaded = (info) => {
        setInfo(info);
    }

    const update = (id) => {
        clearError();
        getCharacter(id)
            .then(onLoaded);

    }
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = (loading) ? <Spinner /> : null;
    const content = !(loading || error || !info) ? <View info={info} /> : null;
    return (

        <>
            {errorMessage}
            {spinner}
            {content}
        </>

    )
}



const View = ({ info }) => {
    const { name, description,thumbnail} = info;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to='/' className="single-comic__back">Back to main</Link>
        </div>
    )
}
export default SingleCharacterPage;