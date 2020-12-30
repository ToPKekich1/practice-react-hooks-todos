import React, { useEffect, useState, useReducer } from 'react';
import TodoList from './TodoList';
import { Context } from './context';
import reducer from './reducer';

export default function App() {
    //useState Hook - в результате роботы получаем массив из 2 элементов, 1-ый - состояния и 2-ой - функция для изменения состояния

    //useEffect Hook - с помощью функции, мы можем реализовывать lifeCycle Hooks. 1-ый параметр - колбэк который будет выполняться, 2-ой - список зависимостей на которые будет откликаться useEffects

    //useState Hook - функция возвращает объект с полями объекта value в тэге Context

    //useReducer Hook - служит для упрощения поддержки приложения. Возвращает массив из состояния и функции dispatch, для изменения state. Передаем reducer и начальное состояние

    const [state, dispatch] = useReducer(
        reducer,
        JSON.parse(localStorage.getItem('todos'))
    );
    const [todoTitle, setTodoTitle] = useState('');

    // const clickHandler = () => {
    //     console.log('click');
    // };

    //Эмуляция хука ComponentDidMount, который вызывается когда html-шаблон готов к дальнейшей работе
    useEffect(() => {
        // document.addEventListener('click', clickHandler);
        localStorage.setItem('todos', JSON.stringify(state));
        // return () => {
        //     //Для избежания утечки памяти
        //     document.removeEventListener('click', clickHandler);
        // };
    }, [state]);

    const addTodo = event => {
        if (event.key === 'Enter') {
            if (todoTitle === '') {
                return;
            }
            dispatch({ type: 'add', payload: todoTitle });
            setTodoTitle('');
        }
    };

    return (
        //В value передаем объект с методами для работы/изменения со state
        <Context.Provider value={{ dispatch }}>
            <div className="container">
                <h1>Todo app</h1>
                <div className="input-field">
                    <input
                        type="text"
                        value={todoTitle}
                        onChange={event => setTodoTitle(event.target.value)}
                        onKeyPress={addTodo} //При нажатии Ентер
                    />
                    <label>Todo name</label>
                </div>
                <TodoList todos={state} />
            </div>
        </Context.Provider>
    );
}
