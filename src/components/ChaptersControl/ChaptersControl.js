import React, { PureComponent } from 'react'
import './ChaptersControl.css'

class ChaptersControl extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress = (e) => {
    const { hasPrev, hasNext, onClickPrev, onClickNext } = this.props
    if (e.key === 'ArrowDown' && hasNext) {
      onClickNext()
    }
    if (e.key === 'ArrowUp' && hasPrev) {
      onClickPrev()
    }
  }

  render() {
    const { hasNext, hasPrev, title, onClickTheme, onClickNext, onClickPrev, currentIndex, count, onClickChapters } = this.props
    return (
      <div>
        <div className="ChaptersControl__chapters_num_container">
          <span className="AtlasGrotesk-Medium-Web d-none d-md-block" onClick={onClickTheme}>{title}</span>
          <button onClick={onClickChapters} className="btn ChaptersControl__chapters_btn rounded-circle">{currentIndex}/{count}</button>
        </div>
        <div className="ChaptersControl__controls_container">
          <button onClick={onClickPrev} disabled={!hasPrev} className="btn rounded-circle ChaptersControl__chapters_btn ChaptersControl__chapters_btn_control"><i className="material-icons md-26">keyboard_arrow_up</i></button>
          <button onClick={onClickNext} disabled={!hasNext} className="btn rounded-circle ChaptersControl__chapters_btn ChaptersControl__chapters_btn_control"><i className="material-icons md-26">keyboard_arrow_down</i></button>
        </div>
      </div>
    )
  }
}

export default ChaptersControl
