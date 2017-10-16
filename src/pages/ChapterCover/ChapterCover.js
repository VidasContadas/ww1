import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import Background from '../../components/Background'
import { Container,Row,Col } from 'reactstrap';
import ScrollLock from 'react-scrolllock'
import { ScrollHelperTop, ScrollHelperBottom, BASE_SCROLL_HELPER_HEIGHT, scrollScale } from '../../components/ScrollHelpers'

import {
  getTheme,
  getChapter,
  getChapterIndex,
  getTotalChapterModules,
} from '../../state/selectors'

import './ChapterCover.css'

class ChapterCover extends PureComponent  {

  state = {
    stopScroll : true,
    scrolling: 0,
  }

  canScrollToFirstModule = () => {
    return
  }

  toFirstModule = () => {
    const { totalChapterModules, history, theme, chapter } = this.props
    if(totalChapterModules < 1) { return }
    const themeUrl = `/themes/${theme.slug}`
    history.push(`${themeUrl}/chapters/${chapter.slug}/modules/1`)
  }

  toPrevModule = () => {
    const { chapterIndex, history, theme } = this.props
    const themeUrl = `/themes/${theme.slug}`
    if(chapterIndex > 0){
      //to last chapter of prev
      const prevChapterSlug = get(theme, `stories[${Number(chapterIndex) - 1}].slug`)//to prev chapter
      console.log("prevChapterSlug", prevChapterSlug, chapterIndex, theme)
      history.push(`${themeUrl}/chapters/${prevChapterSlug}/modules/last`)
    }
    if(chapterIndex === 0){
      //to theme cover
      history.push(`${themeUrl}`)
    }
  }

  componentWillReceiveProps (nextProps){
    if (this.props.totalChapterModules > 0 && this.props.scroll !== nextProps.scroll){
      if(nextProps.scroll === BASE_SCROLL_HELPER_HEIGHT){
        this.setState({scrolling:-1})
        this.toFirstModule()
      }
    }

    if (this.props.scroll !== nextProps.scroll){
      if(nextProps.scroll === -BASE_SCROLL_HELPER_HEIGHT){
        this.setState({scrolling:1})
        this.toPrevModule()
      }
    }
  }

  componentDidMount(){
    this._isMounted = true
    window.scrollTo(0, BASE_SCROLL_HELPER_HEIGHT)

    this.setState({stopScroll:true})
    setTimeout(()=>{
      if(this._isMounted){
        this.setState({stopScroll:false})
      }
    }, 1200)
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  render() {
    const { chapter, index } = this.props

    if (!chapter) {
      return null
    }

    const backgroundColor = get(chapter, 'data.background.backgroundColor')
    const overlay = get(chapter, 'data.background.overlay')

    return (
      <div>
        <ScrollHelperTop background={overlay ? overlay : backgroundColor}/>
        <div className="ChapterCover__container" style={{ marginTop: this.state.scrolling * 150,
            opacity: scrollScale(this.props.scroll)}}>
          <Background
            image={get(chapter, 'covers[0].attachment')}
            overlay={get(chapter, 'data.background.overlay')}
            color={get(chapter, 'data.background.backgroundColor')}
          />
          <Container fluid>
            <Row>
              <Col>
                <div  className="ChapterCover__inner_container">
                  <div>
                   <div className="ChapterCover__label_container">
                     <h6>CHAPTER {index + 1}</h6>
                   </div>
                   <h1>{chapter.translated.title}</h1>
                   <div className="ChapterCover__text_container">
                     <p>{chapter.translated.abstract}</p>
                   </div>
                   <div className="ChapterCover__bottom_text_container">
                     <p>Use your mouse, keyboard or the<br/>arrows to read the story</p>
                   </div>
                 </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <ScrollHelperBottom background={overlay ? overlay : backgroundColor}/>
        {this.state.stopScroll && <ScrollLock/> }
      </div>

    )
  }
}






const mapStateToProps = state => ({
  theme: getTheme(state),
  chapter: getChapter(state),
  chapterIndex: getChapterIndex(state),
  totalChapterModules: getTotalChapterModules(state),
  index: getChapterIndex(state),
  scroll: state.scroll,
})

export default connect(mapStateToProps)(ChapterCover)
