import { fork, put, call } from 'redux-saga/effects'
import { takeLatestAndCancel } from './effects/take'
import * as api from '../../api'
import makeDocuments from './hos/documents'
import {
  GET_COLLECTION_DOCUMENTS,
  GET_MAP_DOCUMENTS,
  GET_TIMELINE_DOCUMENTS,
  GET_DOCUMENT,
  GET_DOCUMENT_LOADING,
  GET_DOCUMENT_SUCCESS,
  GET_DOCUMENT_FAILURE,
  GET_DOCUMENT_UNLOAD,
} from '../actions'

const BIG_PAGE_SIZE = 1000

function *handleGetDocument({ payload }) {
  yield put({ type: GET_DOCUMENT_LOADING })
  try {
    const doc = yield call(api.getDocument, payload)
    yield put({ type: GET_DOCUMENT_SUCCESS, payload: doc })
  } catch (error) {
    yield put({ type: GET_DOCUMENT_FAILURE, error })
  }
}

export default function* rootSaga() {
  yield fork(
    takeLatestAndCancel,
    GET_DOCUMENT,
    GET_DOCUMENT_UNLOAD,
    handleGetDocument,
  )
  yield fork(makeDocuments(
    GET_COLLECTION_DOCUMENTS,
    api.getCollectionDocuments,
    state => state.collectionDocuments,
  ))
  yield fork(makeDocuments(
    GET_TIMELINE_DOCUMENTS,
    api.getTimelineDocuments,
    state => state.timelineDocuments,
    BIG_PAGE_SIZE,
  ))
  yield fork(makeDocuments(
    GET_MAP_DOCUMENTS,
    api.getMapDocuments,
    state => state.mapDocuments,
    BIG_PAGE_SIZE,
  ))
}
