import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import PropTypes from 'prop-types';
import './charInfo.scss';


const CharInfo = (props) => {
    let [char, setChar] = useState(null);
    let {getCharacter, clearError, process, setProcess} = useMarvelService();
    
    useEffect (() => {
        updateChar(); 
        
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId]);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {

        clearError();
        const id = props.charId;
        if (!id) {
            return;
        }
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess("confirmed"));
        
    }


        return (
            <div className="char__info">
                {setContent(process, View, char)}
            </div>
        )
      
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comicsList} = data;

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