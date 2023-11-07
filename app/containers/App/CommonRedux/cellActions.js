import {
  FETCH_CELLS,
  FETCH_CELLS_REQUEST,
  FETCH_CELLS_SUCCESS,
  FETCH_CELLS_ERROR
} from './constants';


export function fetchCells(sectorId) {
  return {
    type: FETCH_CELLS,
    payload: {
      sectorId
    }
  };
}

export function fetchCellsRequest() {
  return {
    type: FETCH_CELLS_REQUEST
  };
}

export function fetchCellsSuccess(response) {
  return {
    type: FETCH_CELLS_SUCCESS,
    cells: response ? response.data : []
  };
}

export function fetchCellsError() {
  return {
    type: FETCH_CELLS_ERROR
  };
}
