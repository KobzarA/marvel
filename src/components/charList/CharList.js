import { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


const setContent = (process, Component, loadingMoreItems) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return loadingMoreItems ? <><Component /><Spinner /></> : null ;
        case 'confirmed':
            return <Component/>
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state');
    }

};

const CharList = (props) => {
    const   [charList, setCharList] = useState([]),
            [loadingMoreItems, setLoadingMoreItems] = useState(false),
            [offset, setOffset] = useState(210),
            [charEnded, setCharEnded] = useState(false);

    const {getAllCharacters , process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );    

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => ([...charList, ...newCharList]));
        setLoadingMoreItems(loadingMoreItems => false);
        setOffset(offset => offset+9);
        setCharEnded(charEnded => ended);

    }

    const onRequest = (offset) => {
        setLoadingMoreItems(true) 
        getAllCharacters(offset)
        .then(onCharListLoaded)
        .then(() => setProcess("confirmed"));
    }

    let itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            const {id, thumbnail, name} = item;
            let imgStyle = thumbnail.includes('image_not_available')? "no_img" : null;
             
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames='char__item'>
                       <li  key={id}
                            tabIndex={0}
                            ref={el => itemRefs.current[i] = el}
                            className="char__item"
                            onClick={() => {props.onCharSelect(id)
                                            focusOnItem(i)}}
                            onKeyDown={(e) => {
                                if (e.code === 'Space' || e.key === "Enter") {
                                props.onCharSelect(id)
                                focusOnItem(i)}}}>
                            <img src={thumbnail} alt={name} 
                            className={imgStyle}/>
                            <div className="char__name">{name}</div>
                        </li>  
                </CSSTransition>
            
            )
        })

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
                
            </ul>
        )
    }
    const items = useMemo(() => setContent(process, () => renderItems(charList), loadingMoreItems), [process])
    return (
        <div className="char__list">
            {items}
            <button 
                style={{'display': charEnded ? 'none' : 'block'}}
                disabled={loadingMoreItems}
                onClick={() => {onRequest(offset)}}
                className="button button__main button__long"
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

CharList.propTypes = {
    onCharSelect: PropTypes.func.isRequired
}

export default CharList;