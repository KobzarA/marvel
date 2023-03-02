import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import './charInfo.scss';


const CharInfo = (props) => {
    let [char, setChar] = useState(null);
    let {loading, error, getCharacter, clearError} = useMarvelService();
    

    // componentDidMount () {
    //     this.updateChar();
    // }
    useEffect (() => {
        updateChar(); 
        
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId]);
    // componentDidUpdate( prevProp, prevState) {
    //     if(this.props.charId !== prevProp.charId ){
    //         this.updateChar();
    //     }
    // }
    // componentDidUpdate(){
    //     this.updateChar();
    // }
    
    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        // this.setState({loading:true, char: null});
        clearError();
        const id = props.charId;
        if (!id) {
            return;
        }
        getCharacter(id)
        .then(onCharLoaded);
        
    }


    
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

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;