import React from "react";
import "./App.css";
import "./reset.css";
import Header from "./Header";
import Main from "./Main";
import List from './List';
import {upgradeneeded, error, transactionOnComplate, transactionOnError, requestOnError} from "./indexDB";

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

            // Check If Task have done
            if(val.done) {
              const date = new Date(val.date);
              const dateNow = new Date();

              // Jika sudah lewat hari
              if(date.getDate() !== dateNow.getDate()) {
                const keys = resultObjekKeys.result[idx];
                const indexDB = indexedDB.open("toDoList", 1);
                
                indexDB.onsuccess = (event) => {
                  const result = indexDB.result;
                  const transaction = result.transaction("task", "readwrite");
                  const transactionObj = transaction.objectStore("task");
                  const request = transactionObj.delete(keys);

                  // Event Handling
                  transaction.oncomplete = transactionOnComplate;
                  transaction.onerror = transactionOnError;
                  request.onerror = requestOnError;
                  request.onsuccess = (event) => {
                    this.getData()
                  }
                }
                
                // Event handling
                indexDB.onerror = error;
              }
            }
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

    indexDB.onupgradeneeded = upgradeneeded;
    indexDB.onerror = error;
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



export default App;
