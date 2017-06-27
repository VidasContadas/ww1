// TODO: Implement hoc for generate action creators
export const GET_DOCUMENTS = 'GET_DOCUMENTS'
export const GET_DOCUMENTS_LOADING = 'GET_DOCUMENTS_LOADING'
export const GET_DOCUMENTS_SUCCESS = 'GET_DOCUMENTS_SUCCESS'
export const GET_DOCUMENTS_FAILURE = 'GET_DOCUMENTS_FAILURE'
export const GET_DOCUMENTS_UNLOAD = 'GET_DOCUMENTS_UNLOAD'

export const loadDocuments = (params = {}) => ({
  type: GET_DOCUMENTS,
  payload: {
    params,
    reset: true,
  }
})

export const loadMoreDocuments = (params = {}) => ({
  type: GET_DOCUMENTS,
  payload: {
    params,
    reset: false,
  }
})

export const unloadDocuments = () => ({
  type: GET_DOCUMENTS_UNLOAD,
})

export const GET_DOCUMENTS_META = 'GET_DOCUMENTS_META'
export const GET_DOCUMENTS_META_LOADING = 'GET_DOCUMENTS_META_LOADING'
export const GET_DOCUMENTS_META_SUCCESS = 'GET_DOCUMENTS_META_SUCCESS'
export const GET_DOCUMENTS_META_FAILURE = 'GET_DOCUMENTS_META_FAILURE'
export const GET_DOCUMENTS_META_UNLOAD = 'GET_DOCUMENTS_META_UNLOAD'

export const loadDocumentsMeta = () => ({
  type: GET_DOCUMENTS_META,
})
export const unloadDocumentsMeta = () => ({
  type: GET_DOCUMENTS_META_UNLOAD,
})

export const GET_MAP_DOCUMENTS = 'GET_MAP_DOCUMENTS'
export const GET_MAP_DOCUMENTS_LOADING = 'GET_MAP_DOCUMENTS_LOADING'
export const GET_MAP_DOCUMENTS_SUCCESS = 'GET_MAP_DOCUMENTS_SUCCESS'
export const GET_MAP_DOCUMENTS_FAILURE = 'GET_MAP_DOCUMENTS_FAILURE'
export const GET_MAP_DOCUMENTS_UNLOAD = 'GET_MAP_DOCUMENTS_UNLOAD'

export const loadMapDocuments = (params = {}) => ({
  type: GET_MAP_DOCUMENTS,
  payload: {
    params,
    reset: true,
  }
})

export const unloadMapDocuments = () => ({
  type: GET_MAP_DOCUMENTS_UNLOAD,
})

export const GET_TIMELINE_DOCUMENTS = 'GET_TIMELINE_DOCUMENTS'
export const GET_TIMELINE_DOCUMENTS_LOADING = 'GET_TIMELINE_DOCUMENTS_LOADING'
export const GET_TIMELINE_DOCUMENTS_SUCCESS = 'GET_TIMELINE_DOCUMENTS_SUCCESS'
export const GET_TIMELINE_DOCUMENTS_FAILURE = 'GET_TIMELINE_DOCUMENTS_FAILURE'
export const GET_TIMELINE_DOCUMENTS_UNLOAD = 'GET_TIMELINE_DOCUMENTS_UNLOAD'

export const loadTimelineDocuments = () => ({
  type: GET_TIMELINE_DOCUMENTS,
  payload: { reset: true }
})

export const unloadTimelineDocuments = () => ({
  type: GET_TIMELINE_DOCUMENTS_UNLOAD,
})


export const GET_DOCUMENT = 'GET_DOCUMENT'
export const GET_DOCUMENT_LOADING = 'GET_DOCUMENT_LOADING'
export const GET_DOCUMENT_SUCCESS = 'GET_DOCUMENT_SUCCESS'
export const GET_DOCUMENT_FAILURE = 'GET_DOCUMENT_FAILURE'
export const GET_DOCUMENT_UNLOAD = 'GET_DOCUMENT_UNLOAD'

export const loadDocument = (id) => ({
  type: GET_DOCUMENT,
  payload: id
})

export const unloadDocument = () => ({
  type: GET_DOCUMENT_UNLOAD,
})
