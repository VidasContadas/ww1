import React from 'react'
import { pure } from 'recompose'
import { Link } from 'react-router-dom'
import { get } from 'lodash'
import CollectionItemLink from '../CollectionItemLink'
import './CollectionDoc.css'

const CollectionDoc = ({ doc, hasImage, showDocLink=false }) => (
  <div className="CollectionDoc">
    <Link to={{ pathname:`/collection/item/${doc.id}`, state:{modal:true} }} >
      { hasImage && ( <img src={doc.snapshot} alt={doc.translated.title}/> )}
      { !hasImage && (
        <div className={`CollectionDoc__inner_container ${(doc.data.type === 'report') && 'CollectionDoc__inner_container_audio'}`}>
          {doc.translated.title} ({doc.data.type})
        </div> )}
      {/* {get(doc, 'data.coordinates.geometry.coordinates')} */}
    </Link>
    <div className="CollectionDoc__frame">
    </div>
    {showDocLink && <div className="CollectionDoc__Link"><CollectionItemLink doc={doc}/></div>}
  </div>
)

export default pure(CollectionDoc)
