import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form'

import './app.css';

export default class App extends Component {
    constructor() {
        super(); 
        this.maxId = 100;

        this.createTodoItem = (label) => {
            return {
                label,
                important : false,
                done: false,
                id : this.maxId++  
            }
        }

        this.state = {
            todoData : [
               this.createTodoItem('Drink cofee 1'),
               this.createTodoItem('Drink coffe 2'),
               this.createTodoItem('Learn React'),
               this.createTodoItem('Find new job')
            ],

            term : '',
            filter : '' //active, done, all
        };

        this.deleteItem = (id) => {
            this.setState( ({ todoData }) => {
                const idx = todoData.findIndex((el)=> el.id === id);

                const newArray = [
                    ...todoData.slice(0, idx),
                    ...todoData.slice(idx + 1)
                ];

                return {
                    todoData: newArray
                }
            } )
        }

        this.addItem = (text) => {
            const newItem = this.createTodoItem(`${text}`)

            this.setState ( ({todoData})=>{
                const newArray = [
                    ...todoData,
                    newItem
                ]
            
                return {
                    todoData: newArray
                }
            } )
        }

        this.toggleProperty = (arr, id, propertyName) => {
                const idx = arr.findIndex((el)=> el.id === id)

                const oldItem = arr[idx];
                const newItem = { ...oldItem,
                     [propertyName] : !oldItem[propertyName]}

                return [
                    ...arr.slice(0, idx),
                    newItem,
                    ...arr.slice(idx+1)
                ]

        }

        this.onToggleImportant = (id) => {
            this.setState(({todoData})=> {
                return {
                    todoData : this.toggleProperty(todoData, id, 'important')
                }
            })
        }

        this.onToggleDone = (id) => {
            this.setState(({todoData})=> {
                return {
                    todoData : this.toggleProperty(todoData, id, 'done')
                }
            })
        }

        this.search = (items, term) => {
            if(term.length ===0 ) return items;

            return items.filter((item) => {
                return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
            })
        }

        this.onSearchCheange = (term)=> {
           this.setState({
               term : term
           })
        }

        this.onFilterChange = (filter) => {
            this.setState({filter})
        }

        this.itemsFilter = (items, filter) => {
            switch (filter) {
                case 'all' : return items;
                case 'active' : return items.filter(el => !el.done);
                case 'done' : return items.filter(el => el.done);
                default : return items;
            }
        }


    }

    render() {
        const { todoData, term, filter } = this.state;
        const doneItems = todoData
                            .filter( el => el.done).length;
        const visibleItems = this.itemsFilter(this.search(todoData, term), filter)
        const todoCount = todoData.length - doneItems;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneItems}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchCheange = {this.onSearchCheange}/>
                    <ItemStatusFilter filter = {filter}
                                      onFilterChange= {this.onFilterChange}/>
                </div>
                <TodoList  todos={visibleItems} 
                    onDeleted={this.deleteItem}
                    onToggleImportant = {this.onToggleImportant}
                    onToggleDone = {this.onToggleDone}
                />
                <ItemAddForm onAdd = { this.addItem }/>
            </div>
        )
    }
};
