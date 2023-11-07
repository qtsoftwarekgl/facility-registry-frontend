import { fromJS } from 'immutable';
import userSettingsReducer from '../reducer';

describe('userSettingsReducer', () => {
  it('returns the initial state', () => {
    expect(userSettingsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
