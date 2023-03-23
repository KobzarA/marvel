import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';


const setContent = (process, Component, loadingMoreItems) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return loadingMoreItems ? <><Component /><Spinner /></> : null;
        case 'confirmed':
            return <Component />
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state');
    }

};


const ComicsList = () => {
    const   [comicsList, setComicsList] = useState([]),
            [loadingMoreItems, setLoadingMoreItems] = useState(false),
            [offset, setOffset] = useState(210),
            [charEnded, setCharEnded] = useState(false);
    const   {clearError, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
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
        .then(onComicsListLoaded)
        .then(() => setProcess("confirmed"));
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
    
    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), loadingMoreItems)}
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
 