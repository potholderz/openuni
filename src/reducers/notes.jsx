export default function Reducer(
   state={
      fetching: false,
      fetched: false,
      notes: [],
      error: null,
   }, action) {
   switch (action.type) {
      case "FETCH_NOTES_PENDING": {
         return {...state, fetching: true}
         break;
      }
      case "FETCH_NOTES_REJECTED":{
         return {...state, fecthing: false, error: action.payload}
         break;
      }
      case "FETCH_NOTES_FULFILLED": {
         return {
            ...state,
            fecthing: false,
            fetched: true,
            notes: action.payload,
            }
         break;
      }
   }
   return state;
};
