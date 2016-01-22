import assign from 'object-assign';
import alt from '../libs/alt';
import ModalActions from '../actions/ModalActions';

class ModalStore {
  constructor() {
    this.bindActions(ModalActions);

    this.exportPublicMethods({
      status: this.status.bind(this)
    });
  }
  status(id, somethingElse) {

  }
}

export default alt.createStore(ModalStore, 'ModalStore');
