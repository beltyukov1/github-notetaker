/*jshint esnext: true */

import React from 'react';
import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';
import Firebase from 'firebase';
import helpers from '../utils/helpers';
import Rebase from 're-base';

let base = Rebase.createClass('https://gh-react-notetaker2.firebaseio.com');

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      bio: {},
      repos: []
    };
  }

  init() {
    this.ref = base.bindToState(this.router.getCurrentParams().username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

    helpers.getGithubInfo(this.router.getCurrentParams().username).then((data) => {
      this.setState({
        repos: data.repos,
        bio: data.bio
      });
    });
  }

  componentWillMount() {
    this.router = this.context.router;
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillReceiveProps(nextProps) {
    base.removeBinding(this.ref);
    this.init();
  }

  handleAddNote(newNote) {
    base.post(this.router.getCurrentParams().username, {
      data: this.state.notes.concat([newNote])
    });
  }

  render() {
    let username = this.router.getCurrentParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes username={username} notes={this.state.notes} addNote={this.handleAddNote.bind(this)} />
        </div>
      </div>
    );
  }
}

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Profile;
