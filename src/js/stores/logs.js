import store from '../utils/store';

/**
 * Get all logs from our store.
 * @return {Object[]} Returns an array of logs objects.
 */
const getAll = () => store.get('sb-logs') || [];

/**
 * Save a log msg in our store
 * @param  {String} msg - The message to log.
 */
const log = (msg) =>
  store.set('sb-logs', [...getAll(), { time: new Date().getTime(), msg }]);

export { getAll, log };
