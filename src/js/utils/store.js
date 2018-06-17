import engine from 'store/src/store-engine';
import storage from 'store/storages/localStorage';

export default engine.createStore([storage], []);
