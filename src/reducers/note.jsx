export default function Reducer(
   state={
      id: -1,
      fetching: false,
      fetched: false,
      note: [],
      error: null,
   }, action) {
   switch (action.type) {
      case "FETCH_NOTE_PENDING": {
         return {...state, fetching: true}
         break;
      }
      case "FETCH_NOTE_REJECTED":{
         return {...state, fecthing: false, error: action.payload}
         break;
      }
      case "FETCH_NOTE_FULFILLED": {
         return {
            ...state,
            fecthing: false,
            fetched: true,
            id: action.payload.id,
            note: action.payload,
            }
         break;
      }
   }
   return state;
};
