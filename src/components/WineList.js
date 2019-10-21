import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '.';
import { fetchWinesFrom } from '../actions';
import { connect } from 'react-redux';

export class WineList extends Component {
  onSelectWine = (e, wineId) => {
    e.preventDefault();
    this.props.onSelectWine(wineId);
  };

  render() {
    if (this.props.region === null) {
      return null;
    }
    return (
      <div className="col s12 m6 l4 offset-m3 offset-l4">
        <h2 className="center-align">Wines</h2>
        <div className="collection">
          {this.props.wines.map(wine => (
            <a
              key={wine.id}
              href="#!"
              onClick={e => this.onSelectWine(e, wine.id)}
              className={['collection-item', wine.id === this.props.wine.id ? 'active' : ''].join(
                ' '
              )}>
              {wine.name}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export class _WineListPage extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    loading: false,
    wines: [],
  };

  componentDidMount() {
    const region = this.props.params.regionId;
    this.props.dispatch(fetchWinesFrom(region));
  }

  onSelectWine = id => {
    const root =
      window.location.hostname === 'react-bootcamp.github.io' ? '/react-wines-102/' : '/';
    const region = this.props.params.regionId;
    this.context.router.push({
      pathname: `${root}regions/${region}/wines/${id}`,
    });
  };

  render() {
    console.log(this.props);
    if (this.props.loading) {
      return (
        <div className="center-align">
          <Loader />
        </div>
      );
    }
    return <WineList onSelectWine={this.onSelectWine} wines={this.props.wines} wine={{}} />;
  }
}

function mapFromStoreToProps(store) {
  return {
    wines: store.wines,
    loading: store.loading === 'HTTP_LOADING',
  };
}

export const WineListPage = connect(mapFromStoreToProps)(_WineListPage);
