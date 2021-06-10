import React from 'react';
import {requestOnError, requestOnSuccess, transactionOnComplate, transactionOnError, error} from './indexDB';


class Header extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            addOpen : false,
            addValue: ''
        }


        this.addHandleClick = this.addHandleClick.bind(this);
        this.addActionHandleClick = this.addActionHandleClick.bind(this);
        this.addActionHandleInput = this.addActionHandleInput.bind(this);
    }


    addHandleClick () {
        this.setState((state, props) => ({
            addOpen: !state.addOpen
        }))
    }

    addActionHandleInput (event) {
        this.setState({addValue: event.target.value});
    }
    
    addActionHandleClick (event) {
        const value = this.state.addValue;
        if(value.length > 0) {
            const indexDB = indexedDB.open('toDoList', 1);
            indexDB.onsuccess = () =>  {
                const result = indexDB.result,
                      transaksi = result.transaction('task', 'readwrite'),
                      transaksiObjek = transaksi.objectStore('task'),
                      req = transaksiObjek.add({value, done: false, date: Date.now()});
        
                req.onerror = requestOnError;
                req.onsuccess = (event) => {
                    this.setState((state, props) => {
                        this.props.getData();
                        requestOnSuccess(event);

                        return {addValue: ''}
                    })
                };
                transaksi.oncomplete = transactionOnComplate;
                transaksi.onerror = transactionOnError;
            };
    
            indexDB.onerror = error;
        }

    }


    render () {
        return (
            <div className="container-header">
                <h1 className="name">ToDoList<span><a href="https://elbi.vercel.app" title="slogan">Schedule your assignments</a></span></h1>
                <div className="icon">
                    <div className="add">
                        <button title="add new task" className="add-button button" onClick={this.addHandleClick}>{this.state.addOpen === true ? 'X' : '+ Add'}</button>
                        {this.state.addOpen && <div className="add-action">
                            <input title="add new task" type="text" value={this.state.addValue} onChange={this.addActionHandleInput}/>
                            <button onClick={this.addActionHandleClick} className="button">Add</button>
                        </div>}
                    </div>
                </div>

            </div>
        )
    }
};


export default Header;