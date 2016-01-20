import AltContainer from 'alt-container';
import React, { Component } from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable.jsx';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../constants/itemTypes';
import Modal from 'react-modal';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (!targetProps.lane.notes.length) {
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      });
    }
  }
};
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Lane extends Component {
  constructor(props) {
    super(props);

    this.state = { modalIsOpen: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    const id = props.lane.id;


    this.addNote = this.addNote.bind(this, id);
    this.deleteNote = this.deleteNote.bind(this, id);
    this.editName = this.editName.bind(this, id);
    this.activateLaneEdit = this.activateLaneEdit.bind(this, id);
  }
  render() {
    const {connectDropTarget, lane, ...props} = this.props;

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header">
          <Editable className="lane-name"
            editing={lane.editing}
            value={lane.name}
            onEdit={this.editName}
            onValueClick={this.activateLaneEdit} />
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
            <button onClick={this.openModal}>Open Modal</button>
          </div>
        </div>
        <Modal
         isOpen={this.state.modalIsOpen}
         onRequestClose={this.closeModal}
         style={customStyles} >

         <h2>Hello</h2>
         <button onClick={this.closeModal}>close</button>
         <div>I am a modal</div>
         <form>
           <input />
           <button>tab navigation</button>
           <button>stays</button>
           <button>inside</button>
           <button>the modal</button>
         </form>
       </Modal>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.get(lane.notes)
          }}
        >
          <Notes
            onValueClick={this.activateNoteEdit}
            onEdit={this.editNote}
            onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }
  addNote(laneId) {
    const note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
  }
  editNote(id, task) {
    NoteActions.update({id, task, editing: false});
  }
  deleteNote(laneId, noteId) {
    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(noteId);
  }
  editName(id, name) {
    if (name) {
      LaneActions.update({id, name, editing: false});
    } else {
      LaneActions.delete(id);
    }
  }
  activateLaneEdit(id) {
    LaneActions.update({id, editing: true});
  }
  activateNoteEdit(id) {
    NoteActions.update({id, editing: true});
  }

  // getInitialState() {
  // return { modalIsOpen: false };
  // }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }

}
