import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


const CharList = (props) => {
    const   [charList, setCharList] = useState([]),
            [loadingMoreItems, setLoadingMoreItems] = useState(false),
            [offset, setOffset] = useState(210),
            [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset);
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
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

    }

    

   
    // const {charList, loading, error, offset, charEnded, loadingMoreItems} = this.state;

    const items = renderItems(charList);
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading || loadingMoreItems ? <Spinner/> : null;
    

        

        return (
            <div className="char__list">
               {errorMessage}
               {items}
               {spinner}
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