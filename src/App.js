import React from "react";
import "./App.css";
import "./reset.css";
import Header from "./Header";
import Main from "./Main";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new: true,
      result: [],
      resultKeys: [],
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const indexDB = indexedDB.open("toDoList", 1);
    indexDB.onsuccess = () => {
      const result = indexDB.result;
      const transaction = result.transaction("task", "readonly");
      const transactionObj = transaction.objectStore("task");
      const resultObjek = transactionObj.getAll();
      const resultObjekKeys = transactionObj.getAllKeys();

      resultObjek.onsuccess = () => {
        resultObjekKeys.onsuccess = () => {
          let resultObjek2 = resultObjek.result.map((val, idx) => {
            return (
              <List
                value={val}
                key={idx * 5}
                id={resultObjekKeys.result[idx]}
                handleCheckbox={this.handleCheckbox}
              ></List>
            );
          });

          this.setState({
            resultKeys: resultObjekKeys.result,
            result: resultObjek2,
          });
        };
      };
    };

    indexDB.onupgradeneeded = function () {
      const result = indexDB.result,
        transaction = result.createObjectStore("task", { autoIncrement: true });
    };

    indexDB.onerror = function () {
      console.log("Gagal");
    };
  }

  render() {
    return (
      <div className="container">
        <Header getData={this.getData} />
        <Main result={this.state.result} />
      </div>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateMode: false,
      updateValue: this.props.value.value,
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleEditMode = this.handleEditMode.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.handleEditAction = this.handleEditAction.bind(this);
  }

  handleEditMode() {
    this.setState((state, props) => ({ updateMode: !state.updateMode }));
  }

  handleEditInput(event) {
    let value = event.target.value;
    this.setState({ updateValue: value.length <= 0 ? this.props.value.value : value });
  }

  handleEditAction () {
    const value = this.props.value,
          id = this.props.id;
    value.value = this.state.updateValue;

    const indexDB = indexedDB.open("toDoList", 1);

    indexDB.onsuccess = () => {
      const result = indexDB.result,
        transaction = result.transaction("task", "readwrite"),
        transactionObj = transaction.objectStore("task"),
        request = transactionObj.put(value, id);

      request.onsuccess = () => {
        console.log("Berhasil");
      };

      request.onerror = () => {
        console.log("Gagal");
      };
    };
  }

  handleCheckbox(e) {
    let value = this.props.value,
      id = this.props.id;
    value.done = e.target.checked;

    const indexDB = indexedDB.open("toDoList", 1);

    indexDB.onsuccess = () => {
      const result = indexDB.result,
        transaction = result.transaction("task", "readwrite"),
        transactionObj = transaction.objectStore("task"),
        request = transactionObj.put(value, id);

      request.onsuccess = () => {
        console.log("Berhasil");
      };

      request.onerror = () => {
        console.log("Gagal");
      };
    };
  }

  render() {
    return (
      <li>
        <input type="checkbox" onChange={this.handleEditMode} />
        {this.state.updateMode ? (
          <span>
            <input
              value={this.state.updateValue}
              onChange={this.handleEditInput}
            ></input>
            <button onClick={this.handleEditAction}>Update</button>
          </span>
        ) : (
          this.props.value.value
        )}
        <input type="checkbox" onChange={this.handleCheckbox} />
      </li>
    );
  }
}

export default App;
