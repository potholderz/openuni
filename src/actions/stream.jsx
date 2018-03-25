import api from '../util/api';

export function fetchStreams() {
   return function(dispatch) {
     api.get('/stream')
        .then((response) => {
           dispatch({type: "FETCH_STREAMS_FULFILLED", payload: response.data})
        })
        .catch((err) => {
           dispatch({type: "FETCH_STREAMS_ERROR", payload: err})
        })
    }
}


export function fetchStream(id) {
   return function(dispatch) {
     api.get('/stream/'+id )
        .then((response) => {
           dispatch({type: "FETCH_STREAMS_FULFILLED", payload: response.data})
        })
        .catch((err) => {
           dispatch({type: "FETCH_STREAM_ERROR", payload: err})
        })
    }
}
