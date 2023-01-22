import { Component } from 'react';
import PropTypes from 'prop-types';


import MarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        loadingMoreItems: false,
        offset: 210,
        charEnded: false
 
     };

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest(this.state.offset);
    }



    onCharListLoading = () => {
        this.setState({
            loadingMoreItems: true
        }) 
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => (
            {
                charList : [...charList, ...newCharList],
                loading:false,
                loadingMoreItems:false,
                offset: offset + 9,
                charEnded: ended
            }
        ));
    }

    onRequest = (offset) => {
        this.onCharListLoading();

        this.marvelService
        .getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems = (arr) => {
        const items = arr.map((item) => {
            const {id, thumbnail, name} = item;
            let imgStyle = thumbnail.includes('image_not_available')? "no_img" : null;
             
            return (
             <li  key={id} 
                className="char__item"
                onClick={() => this.props.onCharSelect(id)}>
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

    render() {
        const {charList, loading, error, offset, charEnded, loadingMoreItems} = this.state;
        const items = this.renderItems(charList)
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;


        

        return (
            <div className="char__list">
               {errorMessage}
               {spinner}
               {content}
                <button 
                    style={{'display': charEnded ? 'none' : 'block'}}
                    disabled={loadingMoreItems}
                    onClick={() => {this.onRequest(offset)}}
                    className="button button__main button__long"
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelect: PropTypes.func.isRequired
}

export default CharList;