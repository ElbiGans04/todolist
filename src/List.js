import React from "react";
import {
  error,
  requestOnSuccess,
  requestOnError,
  transactionOnComplate,
  transactionOnError,
} from "./indexDB";
import {MdModeEdit} from 'react-icons/md';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editValue: this.props.value.value,
      done: this.props.value.done,
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleEditMode = this.handleEditMode.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.handleEditAction = this.handleEditAction.bind(this);
  }

  handleEditMode() {
    this.setState((state, props) => {
      if (this.state.editValue <= 0)
        return { editMode: !state.editMode, editValue: props.value.value };
      else return { editMode: !state.editMode };
    });
  }

  handleEditInput(event) {
    this.setState({ editValue: event.target.value });
  }

  handleEditAction() {
    const value = this.props.value,
      id = this.props.id;
    value.value = this.state.editValue;

    const indexDB = indexedDB.open("toDoList", 1);

    indexDB.onsuccess = () => {
      const result = indexDB.result,
        transaction = result.transaction("task", "readwrite"),
        transactionObj = transaction.objectStore("task"),
        request = transactionObj.put(value, id);

      transaction.oncomplete = transactionOnComplate;
      transaction.onerror = transactionOnError;
      request.onsuccess = requestOnSuccess;
      request.onerror = requestOnError;
    };

    indexDB.onerror = error;
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

      transaction.oncomplete = transactionOnComplate;
      transaction.onerror = transactionOnError;
      request.onsuccess = (event) => {
        requestOnSuccess(event);
        this.setState({ done: e.target.checked });
      };
      request.onerror = requestOnError;
    };

    indexDB.onerror = error;
  }

  render() {
    return (
      <tr className={this.state.done ? "done" : ""}>
        <td>
          <span>
            <MdModeEdit/>
            <input
              disabled={this.state.done ? "true" : ""}
              title="update task"
              type="checkbox"
              onChange={this.handleEditMode}
            />
          </span>
          {this.state.editMode ? (
            <span>
              <input
                value={this.state.editValue}
                onChange={this.handleEditInput}
              ></input>
              <button onClick={this.handleEditAction} className="button">
                Update
              </button>
            </span>
          ) : (
            this.props.value.value
          )}
        </td>
        <td>
          <input
            title="mark task complete"
            type="checkbox"
            defaultChecked={this.state.done}
            onChange={this.handleCheckbox}
          />
        </td>
      </tr>
    );
  }
}

export default List;
