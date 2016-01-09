import React, { Component } from 'react';

export default class Note extends Component {
  constructor(props) {
    super(props);

    // Tracks the editing state
    this.state = {
      editing: false
    };
  }
  render() {

    // Render the component differently based on state
    if (this.state.editing) {
      return this.renderEdit();
    }

    return this.renderNote();
  }
  renderEdit = () => {

    // Deal with blur and nput handlers. This map to DOM events
    return <input type="text"
      autoFocus={true}
      placeholder={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  };
  renderNote = () => {

    const onDelete = this.props.onDelete;

    // If the user clicks a normal note, trigger editing logic
    return (
      <div onClick={this.edit}>
        <span className="task">{this.props.task}</span>
        { onDelete ? this.renderDelete() : null }
        </div>
      );
  };
  renderDelete = () => {
    return <button
      className="delete-note"
      onClick={this.props.onDelete}>x</button>;
  };
  edit = () => {

    // Enter edit mode
    this.setState({
      editing: true
    });
  };
  finishEdit = (e) => {
    if (this.props.onEdit) {
      this.props.onEdit(e.target.value);
    }

    // Exit edit mode
    this.setState({
      editing: false
    });
  };
}
