import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';


class CharList extends Component {
    state = {
        charList: [
            // {
            //     char: {},
            //     loading: true,
            //     error: false
            // }
        ],
       
 
     };

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadCharList();
    }

    onCharListLoaded = (charList) => {
        // charlist.forEach(char => {
        //     this.setState({[{char,
        //         loading: false
        //     }]})
        // });
        this.setState({charList});

    }

    loadCharList = () => {
        this.marvelService
        .getAllCharacters()
        .then(this.onCharListLoaded)
    }

    render() {
        const CharList = this.state.charList.map(char => {
           const {id, thumbnail, name} = char;
            
           return (
            <li  key={id} className="char__item">
                <img src={thumbnail} alt={name}/>
                <div className="char__name">{name}</div>
             </li>
           )



        })

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {CharList}

                    {/* <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li> */}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

// const CharListItem = (char) => {
//     return (
//         <li className="char__item">
//                     <img src={abyss} alt="abyss"/>
//                     <div className="char__name">Abyss</div>
//                 </li>
//     )

// }
export default CharList;