import React, { PureComponent } from 'react'
import './ChaptersControl.css'

class ChaptersControl extends PureComponent {

  render () {
    const { hasNext, hasPrev, title, onClickNext, onClickPrev, currentIndex, count } = this.props
    return (
      <div>
        <div className="ChaptersControl__chapters_num_container">
          <span>{title}</span>
          <button className="ChaptersControl__chapters_btn">{currentIndex}/{count}</button>
        </div>
        <div className="ChaptersControl__controls_container">
          <button onClick={onClickNext} className="ChaptersControl__chapters_btn ChaptersControl__chapters_btn_control"><i className="material-icons md-26">keyboard_arrow_up</i></button>
          <button onClick={onClickPrev} className="ChaptersControl__chapters_btn ChaptersControl__chapters_btn_control"><i className="material-icons md-26">keyboard_arrow_down</i></button>
        </div>
      </div>
    )
  }
}

export default ChaptersControl