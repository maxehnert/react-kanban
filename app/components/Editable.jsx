import React, { Component } from 'react';

export default class Editable extends Component {

  render() {
    const {value, onEdit, onValueClick, editing, ...props} = this.props;
console.log('Editable'); console.log(this.props);
    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
  renderEdit = () => {

    // Deal with blur and nput handlers. This maps to DOM events
    return <input type="text"
      autoFocus={true}
      placeholder={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  };
  renderValue = () => {
    const onDelete = this.props.onDelete;

    return (
      <div onClick={this.props.onValueClick}>
        <span className="task" style={{ width: '50%'}}>{this.props.value}</span>
        { onDelete ? this.renderDelete() : null }
        </div>
      );
  };
  renderDelete = () => {
    return <button
      className="delete"
      onClick={this.props.onDelete}>x</button>;
  };
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  finishEdit = (e) => {
    if (this.props.onEdit) {
      this.props.onEdit(e.target.value);
    }
  };
}
