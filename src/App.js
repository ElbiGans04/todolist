import React from "react";
import "./App.css";
import "./reset.css";
import Header from "./Header";
import Main from "./Main";
import List from "./List";
import Footer from "./Footer";
import {
  upgradeneeded,
  error,
  transactionOnComplate,
  transactionOnError,
  requestOnError,
  requestOnSuccess,
} from "./indexDB";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      resultKeys: [],
      shouldDelete: [],
    };

    this.getData = this.getData.bind(this);
    this.shouldDeleteData = this.shouldDeleteData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  shouldDeleteData(keys) {
    const indexDB = indexedDB.open("toDoList", 1);

    indexDB.onsuccess = (event) => {
      const result = indexDB.result;
      keys.forEach((val, key) => {
        const transaction = result.transaction("task", "readwrite");
        const transactionObj = transaction.objectStore("task");
        const request = transactionObj.delete(val);
  
        // Event Handling
        transaction.oncomplete = transactionOnComplate;
        transaction.onerror = transactionOnError;
        request.onerror = requestOnError;
        request.onsuccess = requestOnSuccess;
      });

      // Ambil Data Terbaru
      this.getData();
    };

    // Event handling
    indexDB.onerror = error;
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
          let shouldDelete = [];
          let resultObjek2 = resultObjek.result.map((val, idx) => {
            // Check If Task have done
            if (val.done) {
              const date = new Date(val.date);
              const dateNow = new Date();

              // Jika sudah lewat hari
              if (date.getDate() !== dateNow.getDate()) {
                const keys = resultObjekKeys.result[idx];
                shouldDelete.push(keys);
              }
            }

            return (
              <List
                value={val}
                key={resultObjekKeys.result[idx] * 5}
                id={resultObjekKeys.result[idx]}
                handleCheckbox={this.handleCheckbox}
              ></List>
            );
          });

          this.shouldDeleteData(shouldDelete);

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
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
