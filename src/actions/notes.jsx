import api from '../util/api';

export function fetchNotes() {
   return function(dispatch) {
     api.get('/note')
        .then((response) => {
           dispatch({type: "FETCH_NOTES_FULFILLED", payload: response.data})
        })
        .catch((err) => {
           dispatch({type: "FETCH_NOTES_ERROR", payload: err})
        })
    }
}


export function fetchNote(id) {
   return function(dispatch) {
     api.get('/note/'+id )
        .then((response) => {
           dispatch({type: "FETCH_NOTE_FULFILLED", payload: response.data})
        })
        .catch((err) => {
           dispatch({type: "FETCH_NOTE_ERROR", payload: err})
        })
    }
}
