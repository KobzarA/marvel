import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { Link } from "react-router-dom";
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spiner/Spiner";
import './charSearch.scss';

const CharSearch = () => {
    const [character, setCharacter] = useState(null);
    const { loading, error, clearError, getCharacterByName } = useMarvelService();
    console.log(character)
    // useEffect(() => {
    //     if (Array.isArray(character)) {
    //         LinksResult(character)
    //     }
    // }, [character]);

    const links = (arr) => {
        if (arr.length === 0) {
            // let timeout = setTimeout(() => {
            //     document.querySelector('.error_search').remove();
            // }, 6000);
            setTimeout(() => {
               setCharacter(null);
            }, 6000);
            return (
                <>
                    <div className="error error_search">No match on your request</div>
                </>
            )
        }
        let list = arr.map(item => {
            return (
                <li key={item.id} className="char__search-item">
                    <Link to={`characters/${item.id}`}>{item.name}</Link>
                </li>
            )
        });
        return (
           <>
                <div className="char__search-title"> Search results : </div>
                <ul className="char__search-results">
                    {list}
                </ul>
           </>
           
             )

    };
    const onSubmit = (name) => {
        getCharacterByName(name)
            .then(setCharacter);
        
    };

    const items = Array.isArray(character)? links(character) : null;
    const spinner = loading ? <Spinner /> : null;
    const results = items ? items : null;

    return (
        <div className="char__search">
            <div className="char__search-title">Or find a character by name:</div>
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .min(2, 'Мінімум 2 символи')
                        .required("Обов'язкове поле")
                })}
                onSubmit={values => onSubmit(values.name)}
                >
                <Form >
                    <Field name='name' placeholder='Enter name' />
                    
                    <button type="submit" className="button button__main">
                        <div className="inner">Find</div>
                    </button>
                    <ErrorMessage className='error' name='name' component='div' />
                </Form>
                

            </Formik>
            {spinner}
            {results}

        </div>
    )
};


export default CharSearch;