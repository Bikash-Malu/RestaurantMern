const intialState = {
    loading: false,
    cardItems: [],
  };
  
  export const rootReducer = (state = intialState, action) => {
    switch (action.type) {
      case "SHOW_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "HIDE_LOADING":
        return {
          ...state,
          loading: false,
        };
      case "AddtoCard":
        return {
          ...state,
          cardItems: [...state.cardItems, action.payload],
        };
      case "UPDATE_CART":
        return {
          ...state,
          cardItems: state.cardItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      case "DELETE_FROM_CART":
        return {
          ...state,
          cardItems: state.cardItems.filter(
            (item) => item._id !== action.payload._id
          ),
        };
      default:
        return state;
    }
  };