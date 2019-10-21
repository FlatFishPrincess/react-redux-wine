export const wines = (state = [], action) => {
  switch (action.type) {
    case 'SET_WINES':
      return [ ...action.wines ];
    default:
      return state;
  }
}