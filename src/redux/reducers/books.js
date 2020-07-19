const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: '',
    dataNew: [],
    dataOld: [],
    dataById:[]
  };
  
  const books = (state = initialState, action) => {
    switch (action.type) {
      case 'NEWARRIVALS_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'NEWARRIVALS_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMsg: 'Data Reject',
        };
      case 'NEWARRIVALS_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isError: false,
          dataNew: action.payload.data.data,
        };
        
      case 'LATESTBOOKS_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'LATESTBOOKS_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMsg: 'Data Reject',
        };
      case 'LATESTBOOKS_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isError: false,
          dataOld: action.payload.data.data,
        };

    case 'BOOKBYID_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
    case 'BOOKBYID_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMsg: 'Data Reject',
        };
    case 'BOOKBYID_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isError: false,
          dataById: action.payload.data.data,
        };

      default:
        return state;
    }
  };
  
  export default books;