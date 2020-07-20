const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: '',
    dataNew: [],
    dataOld: [],
    dataById:[],
    data:[]
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

    case "SEARCH_PENDING":
        return {
          ...state,
          isLoading: true,
          isError: false
        };
    case "SEARCH_REJECTED":
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMsg: 'Data Rejected'
        };
    case "SEARCH_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload.data.data
        };
      
    case "ADDBOOK_PENDING":
        return {
          ...state,
          isLoading: true,
          isError: false
        };
    case "ADDBOOK_REJECTED":
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMsg: 'Data Rejected'
        };
    case "ADDBOOK_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload.data.data[0]
        };

    case "EDITBOOK_PENDING":
          return {
            ...state,
            isLoading: true,
            isError: false
        };
    case "EDITBOOK_REJECTED":
          return {
            ...state,
            isLoading: false,
            isError: true,
            errorMsg: 'Data Rejected'
        };
    case "EDITBOOK_FULFILLED":
          return {
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload.data.data[0]
        };

    case "DELETEDATABYID_PENDING":
          return {
            ...state,
            isLoading: true,
            isError: false
        };
    case "DELETEDATABYID_REJECTED":
          return {
            ...state,
            isLoading: false,
            isError: true,
            errorMsg: 'Data Rejected'
        };
    case "DELETEDATABYID_FULFILLED":
          return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload.data.data
        };

    default:
      return state;
    }
  };
  
  export default books;