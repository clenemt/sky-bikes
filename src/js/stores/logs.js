import store from '../utils/store';

const getAll = () => store.get('logs') || [];
const log = (msg) =>
  store.set('logs', [...getAll(), { time: new Date().getTime(), msg }]);

export { getAll, log };
