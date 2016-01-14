import AltContainer from 'alt-container';
import React, { Component } from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = NoteStore.getState();
  }
  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }
  storeChanged = (state) => {
    this.setState(state);
  };
  render() {

    const notes = this.state.notes;

    return (
      <div>
        <button className="add-lane" onClick={this.addLane}>+</button>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getState().lanes || []
          }}>
          <Lanes />
        </AltContainer>
      </div>
    );
  }
  addLane() {
    LaneActions.create({name: 'New Lane'});
  }
}
