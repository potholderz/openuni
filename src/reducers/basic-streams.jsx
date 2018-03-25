export default function Reducer(
   state={
      fetching: false,
      fetched: false,
      streams: [],
      error: null,
   }, action) {
   switch (action.type) {
      case "FETCH_STREAMS_PENDING": {
         return {...state, fetching: true}
         break;
      }
      case "FETCH_STREAMS_REJECTED":{
         return {...state, fecthing: false, error: action.payload}
         break;
      }
      case "FETCH_STREAMS_FULFILLED": {
         return {
            ...state,
            fecthing: false,
            fetched: true,
            streams: action.payload,
            }
         break;
      }
   }
   return state;
};
