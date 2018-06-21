import { returnLateBikes } from '../lifecycle';
import * as bikesStore from '../stores/bikes';

jest.mock('../stores/bikes');

beforeEach(() => {
  jest.resetAllMocks();
});

const bikes = [{ rentedAt: new Date(new Date() - 20000).getTime() }];

describe('returnLateBikes()', () => {
  it('should call bike return once per old bikes', () => {
    bikesStore.getAll.mockReturnValue(bikes);
    returnLateBikes();
    expect(bikesStore.returnBike).toHaveBeenCalledTimes(1);
  });
});
