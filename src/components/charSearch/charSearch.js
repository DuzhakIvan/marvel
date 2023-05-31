import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik'; // Подключаем библиотеку для форм ErrorMessage импортируем как FormikErrorMessage, т.к. уже занято имя
import * as Yup from 'yup'; // Yup библиотекадля валидации форм
import {Link} from 'react-router-dom'; // Берем Link из библиотеки роутер

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charSearch.scss"

const CharSearch = () => {
    const [char, setChar] = useState(null); // Сюда помещаем обьект персонажа после поиска формы,
    const {loading, error, getCharacterByName, clearError, process, setProcess} = useMarvelService();

    const onCharLoaded = (char) => { // Отдельный метод по обновлению обьекта персонажа
        setChar(char);
    }

    const updateChar = (name) => { // функция для получения данных с сервера по имени персонажа и сброса ошибки при связи с сервером
        clearError(); // Сьрос ошибки при связи с сервером

        getCharacterByName(name) // Поолучение обьекта персонажа по имени с сервера
            .then(onCharLoaded) // Записываем результат промиса с сервера в состояние char
            .then(() => setProcess('confirmed'));
    }

    const errorMessage = process === 'error' ? <div><ErrorMessage/></div> : null; // Если есть ощибка, равно Компоненту ошибки, нет - ничего

    const results = !char ? null : char.length > 0 ? // результат равен если char undefined (true) то null, если char длина больше 0, то возвращаем структуру (успех)
                        <div className='search__sucсess'>
                            <p>There is! Visit {char[0].name} page?</p>
                            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                                <div className="inner">to page</div>
                            </Link>
                        </div> : // Если и не это, то возвращаем структуру (персонаж не найден)
                    <div className="search__error">
                        The character was not found. Check the name and try again, please.
                    </div>;


// Formik задаем начальные настройки инпута InitialValues, validationSchema, onSubmit
// Настройки валидации задаем с помощью библиотеки Yup - должна быть строка и заполнена, если не заплнена выводим сообщение
// Во время отправки формы передаем введенное имя в функцию по обновлению состояния Char 
// Имя инпута и имя начальных настроек Formik должны совпадать
// Добавляем аттрибут disavled для кнопки, когда есть состояние загрузки
// FormikErrorMessage - ошибка валидации указываем имя инпута, чтобы сказать что это его ошибка, компонент в который обернуть сообщение и класс компонента
// В конце выводим результат поиска и сообщение об ошибке при связи с сервером
    return (
        <div className='search'>
            <Formik
                initialValues={{
                    charName: '',
                }}
                validationSchema={ Yup.object({
                    charName: Yup.string().required('This field is required!')
                })}
                onSubmit= {({charName}) => {updateChar(charName)}}>
                <Form>
                    <label htmlFor='charName'>Or find a character by name:</label>
                    <div className="input__wraper">
                        <Field type="text" placeholder="Enter name" id='charName' name='charName'/>
                        <button type='submit' className="button button__main" disabled={process === 'loading'}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="search__error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
       
    )
}

export default CharSearch;