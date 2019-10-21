import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '.';
import * as WinesService from '../services/Wines';
import { LikeButton, CommentButton, CommentList, CommentModal } from '.';
import { fetchCurrentWine } from '../actions';
import { connect } from 'react-redux';

export class Wine extends Component {
  render() {
    if (this.props.wine === null) {
      return null;
    }
    return (
      <div className="col s12 m12 l6 offset-l3">
        <h2 className="center-align">Wine details</h2>
        <div className="card horizontal">
          <div className="card-image">
            <img
              className="responsive-img wine-detail-image"
              alt="Wine bottle pic"
              src={`${this.props.host}/api/wines/${this.props.wine.id}/image`}
            />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h3>{this.props.wine.name}</h3>
              <br />
              <p>
                <b>Appellation:</b> {this.props.wine.appellation.name}
              </p>
              <p>
                <b>Region:</b> {this.props.wine.appellation.region}
              </p>
              <p>
                <b>Color:</b> {this.props.wine.type}
              </p>
              <p>
                <b>Grapes:</b> {this.props.wine.grapes.join(', ')}
              </p>
              <CommentList wine={this.props.wine} />
            </div>
            <div className="card-action">
              <LikeButton wine={this.props.wine} />
              <CommentButton openCommentModal={this.props.openCommentModal} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class _WinePage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    loading: false,
    selectedWine: null,
    commentModalOpen: false,
  };

  componentDidMount() {
    const id = this.props.params.wineId;
    this.props.dispatch(fetchCurrentWine(id));
  }

  closeCommentModal = () => {
    this.setState({ commentModalOpen: false });
  };

  openCommentModal = () => {
    this.setState({ commentModalOpen: true });
  };

  render() {
    console.log('current??', this.props.currentWine);
    if (this.props.loading || !this.props.currentWine || !this.props.currentWine.name) {
      return (
        <div className="center-align">
          <Loader />
        </div>
      );
    }
    return (
      <div>
        <Wine
          host={WinesService.host}
          wine={this.props.currentWine}
          openCommentModal={this.openCommentModal}
        />
        <CommentModal
          wine={this.props.currentWine}
          isOpen={this.state.commentModalOpen}
          closeCommentModal={this.closeCommentModal}
        />
      </div>
    );
  }
}
function mapFromStoreToProps(store) {
  console.log('from',store.currentWine.wine);
  return {
    currentWine: store.currentWine ? store.currentWine.wine : null,
    loading: store.loading === 'HTTP_LOADING',
  };
}

export const WinePage = connect(mapFromStoreToProps)(_WinePage);
