import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';


/* id thumbnail  */ 
const ComicsList = () => {
    const   [comicsList, setComicsList] = useState([]),
            [loadingMoreItems, setLoadingMoreItems] = useState(false),
            [offset, setOffset] = useState(210),
            [charEnded, setCharEnded] = useState(false);
    const   {loading, error, clearError, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8 ) {
            ended = true;
        }
        setComicsList(comicsList => ([...comicsList, ...newComicsList]));
        setLoadingMoreItems(loadingMoreItems => false);
        setOffset(offset => offset+8);
        setCharEnded(charEnded => ended);
    };

    const onRequest = (offset) => {
        clearError();
        setLoadingMoreItems(true);
        getAllComics(offset)
        .then(onComicsListLoaded);
    };

    
    const renderItems = (arr) => {
        console.log(arr);
        const items = arr.map((item, i) => {
            const {id, thumbnail, title, price} = item;
            let imgStyle = thumbnail.includes('image_not_available')? "no_img" : '';
             
            return (
                <CSSTransition
                    key={item.id}
                    timeout={500}
                    classNames='comics__item'>
                    <li className="comics__item"
                        key={i}>
                        <Link to={`/comics/${id}`}>
                            <img src={thumbnail} alt={title} className={`comics__item-img ${imgStyle}`} />
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{`${price}$`}</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )

    }

    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading || loadingMoreItems ? <Spinner /> : null;




    return (
        <div className="comics__list">
            {errorMessage}
            {items} 
            {spinner}
            <button style={{ 'display': charEnded ? 'none' : 'block' }}
                    disabled={loadingMoreItems}
                    onClick={() => onRequest(offset)}
                    className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
 