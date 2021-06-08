import React from 'react';
import './Header.css';


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

    addActionHandleClick (event) {
        const value = this.state.addValue;
        if(value.length > 0) {
            const indexDB = indexedDB.open('toDoList', 1);
            indexDB.onsuccess = () =>  {
                const result = indexDB.result,
                      transaksi = result.transaction('task', 'readwrite'),
                      transaksiObjek = transaksi.objectStore('task'),
                      req = transaksiObjek.add({value, done: false, date: Date.now()});
        
                req.onerror = function () {
                    console.log("Data Gagal")
                };
        
                req.onsuccess = () => {
                    console.log("Data berhasil ditambahkan");
                    this.setState({addValue: ''});
                    this.props.getData();
                }
            };
    
            indexDB.onerror = function () {
                console.error("Error Woy")
            }
        }

    }

    addActionHandleInput (event) {
        this.setState({addValue: event.target.value});
    }

    render () {
        return (
            <div className="container-header">
                <h1 className="name">ToDoList</h1>
                <div className="icon">
                    <div className="add">
                        <button className="add-button" onClick={this.addHandleClick}>{this.state.addOpen === true ? 'X' : '+ Add'}</button>
                        {this.state.addOpen && <div className="add-action">
                            <input type="text" value={this.state.addValue} onChange={this.addActionHandleInput}/>
                            <button onClick={this.addActionHandleClick}>Add</button>
                        </div>}
                    </div>
                </div>

            </div>
        )
    }
};


export default Header;