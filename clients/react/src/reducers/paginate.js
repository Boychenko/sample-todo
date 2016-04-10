// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export default function paginate({types}) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }

  const [requestType, successType, failureType] = types;

  return function updatePagination(state = {
    isFetching: false,
    pagingInfo: {
      page     : 0,
      pageCount: 0
    },
    list      : []
  }, action) {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        };
      case successType:
        return {
          ...state,
          isFetching: false,
          list      : action.response.list,
          pagingInfo: {
            page     : action.response.page - 1,
            pageCount: Math.floor((action.response.total + action.response.pageSize - 1) / action.response.pageSize)
          }
        };
      case failureType:
        return {
          ...state,
          isFetching: false
        };
      default:
        return state;
    }
  };
}
