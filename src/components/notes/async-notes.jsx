import Loadable from '../Loadable';


const AsyncNotes = Loadable({
  loader: () => import(/* webpackChunkName: "streams" */ './notes'),
});

export default AsyncNotes;
