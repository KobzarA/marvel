import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearch from "../CharSearch/CharSearch";
import ErrorBoundary from "../errorBounadary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);
    const onCharSelect = (id) => {
        setSelectedChar(id);
    }


    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelect={onCharSelect} />
                </ErrorBoundary>
              <div className="char__wrapper">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearch />
                    </ErrorBoundary>
              </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
};

export default MainPage;