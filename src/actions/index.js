import * as WinesService from '../services/Wines';

export const setHttpLoading = () => {
  return {
    type: 'HTTP_LOADING',
  };
}

export const setHttpLoaded = () => {
  return {
    type: 'HTTP_LOADED',
  };
}

export const setHttpError = (error) => {
  return {
    type: 'HTTP_ERROR',
    error
  };
}

export const setRegions = (regions) => {
  return {
    type: 'SET_REGIONS',
    regions
  };
}

export const setWines = (wines) => {
  return {
    type: 'SET_WINES',
    wines
  }
}

export const fetchRegions = () => {
  return dispatch => {
    dispatch(setRegions([]));
    dispatch(setHttpLoading());
    return WinesService.fetchRegions().then(data => {
      dispatch(setHttpLoaded());
      dispatch(setRegions(data));
      return data;
    }, err => {
      dispatch(setHttpError(`error while fetching regions : ${err.message}`));
    });
  };
}


export const fetchWinesFrom = (region) => {
  return dispatch => {
    dispatch(setWines([]));
    dispatch(setHttpLoading());
    return WinesService.fetchWinesFrom(region).then(data => {
      dispatch(setHttpLoaded());
      dispatch(setWines(data));
      return data;
    }, err => {
      dispatch(setHttpError(`error while fetching wines : ${err.message}`));
    });
  };
}

export const setCurrentWine = (wine) => {
  return {
    type: 'SET_CURRENT_WINE',
    wine
  }
}

export const fetchCurrentWine = (id) => {
  return dispatch => {
    dispatch(setCurrentWine({}));
    dispatch(setHttpLoading());
    return WinesService.fetchWine(id).then(data => {
      dispatch(setHttpLoaded());
      dispatch(setCurrentWine(data));
      return data;
    }, err => {
      dispatch(setHttpError(`error while fetching wines : ${err.message}`));
    });
  };
}
