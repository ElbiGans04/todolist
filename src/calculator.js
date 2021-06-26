import "./styles.css";
import React, {useCallback, useContext, useState} from 'react';
let Context = React.createContext({});

export default function App() {
  let [action, setAction] = useState([]);
  let [val, setVal] = useState('');

  let update = useCallback( (val) => {
    setVal((prev) => {
      return val === null ? '' : `${prev}${val}`
    })
  } , [val])
  

  return (
    <Context.Provider value={{update, val}}>
      <div className="App">
        <Display val={val} />
        <Main />
      </div>
    </Context.Provider>
  );
}


function Display (props) {
  return <input type="text" value={props.val == '' ? 0 : props.val} />
}

function Main (props) {
  let {update} = useContext(Context);
  return (
    <div>
      <div>
        <button onClick={() => {update(null)}}>REMOVE</button>
        <Number />
      </div>
      <div>
        <Action />
      </div>
    </div>
  )
}

function Number (props) {
  let {update} = useContext(Context);
  let number = [1,2,3,4,5,6,7,8,9]
  
  let newNumber = number.map((val, idx) => {
    return (
      <li key={idx}>
        <div onClick={() => update(val)}>
          <button>{val}</button>
        </div>
      </li>
    )
  })
  return (
    <ul>
      {newNumber}
    </ ul>
  )
}

function Action (props) {
  let {update, val} = useContext(Context);
  let action = ['+', '-', '*', '/'];
  let actionNew = action.map((val, idx) => {
      return (
      <li key={idx}>
        <div>
          <button>{val}</button>
        </div>
      </li>
      );
  })
  return (
    <ul>
      {actionNew}
    </ ul>
  )
}