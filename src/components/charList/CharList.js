import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
       
 
     };

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadCharList();
    }

    onCharListLoaded = (charList) => {
        this.setState({charList,
            loading:false});
    }

    loadCharList = () => {
        this.marvelService
        .getAllCharacters()
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems = (charList) => {
        const CharList = charList.map(char => {
            const {id, thumbnail, name} = char;
             
            return (
             <li  key={id} 
                className="char__item"
                onClick={() => this.props.onCharSelect(id)}>
                    <img src={thumbnail} alt={name} 
                    className={thumbnail.includes('image_not_available')? "no_img" : null}/>
                    <div className="char__name">{name}</div>
              </li>
            )
        })

        return (
            <ul className="char__grid">
                {CharList}
            </ul>
        )

    }

    render() {
        const {charList, loading, error} = this.state
        const CharList = this.renderItems(charList)
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? CharList : null;


        

        return (
            <div className="char__list">
               {errorMessage}
               {spinner}
               {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;