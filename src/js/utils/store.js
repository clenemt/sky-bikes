import engine from 'store/src/store-engine';
import storage from 'store/storages/localStorage';

// Export a default engine with only localStorage
export default engine.createStore([storage], []);
