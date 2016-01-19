import React, { Component } from 'react';
import Modal from 'react-modal';
import Editable from './Editable.jsx';

export default class NoteModal extends Component {
  getInitialState = () => {
    return { modalIsOpen: false };
  };
  openModal = () => {
    this.setState({modalIsOpen: true});
  };
  closeModal = () => {
    this.setState({modalIsOpen: false});
  };

  render() {

  }
}
