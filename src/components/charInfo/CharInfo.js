import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';


class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    // componentDidMount () {
    //     this.updateChar();
    // }

    componentDidUpdate( prevProp, prevState) {
        if(this.props.charId !== prevProp.charId ){
            this.updateChar();
        }
    }
    // componentDidUpdate(){
    //     this.updateChar();
    // }
    
    marvelService = new MarvelService();

    onError = () => {
        this.setState({
            
            loading: false,
            error: true,
        });
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading:false
        });
    }

    updateChar = () => {
        this.setState({loading:true, char: null});

        const id = this.props.charId;
        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError);
        
    }


    render() {
        const {loading, error, char} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = (loading) ? <Spinner/> : null;
        const content = !(loading || error || !char)  ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comicsList} = char;
    // const comics = () => {
    //     if (comicsList.length > 10 ) {
    //         comicsList.filter((item, i, list) => list.length > 10)
    //     } else if (comicsList.length === 0) {
    //         return ( 
    //         <>
    //          div.
    //         </>
    //         )
    //     }
    // } 

    return (
        <>
        
        <div className="char__basics">
                <img src={thumbnail} alt={name} className={thumbnail.includes('image_not_available')? "no_img" : null}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList.length > 0 ? null : 'There is no comics info yet.'}
                {comicsList.map((item, i) => {
                    // eslint-disable-next-line array-callback-return
                    if(i > 9 ) return;
                   
                    return (
                        <>
                        <li  key={i} className="char__comics-item">{item.name}</li>
                        </>
                    )
                })}
            </ul>
        </>
    )

}


export default CharInfo;