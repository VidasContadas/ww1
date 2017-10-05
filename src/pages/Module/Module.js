import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import ModuleText from './ModuleText'
import ModuleObject from './ModuleObject'
import ModuleTextObject from './ModuleTextObject'
import ModuleGallery from './ModuleGallery'
import ModuleMap from './ModuleMap'
import ModuleMapText from './ModuleMapText'
import WayPoint from 'react-waypoint'

import { get } from 'lodash'
import { setScrollDelta } from '../../state/actions'
import { scaleLinear } from 'd3-scale'
import ScrollLock from 'react-scrolllock'
import './Module.css'

import { timer } from 'd3-timer'

import {
  getTheme,
  getChapter,
  getTotalChapterModules,
  getChapterIndex,
  makeGetModule,
} from '../../state/selectors'

const moduleContainerStyle = {
  height: '100vh'
}

const getModuleComponent = moduleType => {
  switch (moduleType) {
    case 'text':
      return ModuleText
    case 'object':
      return ModuleObject
    case 'gallery':
      return ModuleGallery
    case 'map':
      return ModuleMap
    case 'text_object':
      return ModuleTextObject
    default:
      throw new Error(`Invalid module type ${moduleType}`)
  }
}

const fakeModule = {
  text: {
    module: 'text',
    background: {
      color: '#333'
    },
    position: 'left',
    text: {
      content: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
    }
  },

  object: {
    module : 'object',
    background: {
      color: '#333'
    },
    size: 'medium',
    caption: "ciao ciao"
  },

  text_object: {
    module: 'text_object',
    background: {
      color: '#333'
    },
    text: {
      content: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
    },
    object: {
      size: 'big',
      caption: 'hello!'
    }

  }
}


const BASE_SCROLL_HELPER_HEIGHT = 100

const scrollHelperMapStateToProps = (state) => ({
    scroll: state.scroll,
})


const scrollScaleHelpersOverlay = scaleLinear()
  .domain([-BASE_SCROLL_HELPER_HEIGHT, 0, BASE_SCROLL_HELPER_HEIGHT])
  .range([0, 0.7, 0])

const scrollScale = scaleLinear()
  .domain([-BASE_SCROLL_HELPER_HEIGHT, 0, BASE_SCROLL_HELPER_HEIGHT])
  .range([0, 1, 0])

const ScrollHelperTop = connect(scrollHelperMapStateToProps) (class extends React.PureComponent {


  render(){
    const { background='transparent', scroll, overlay=false } = this.props
    return (
        <div style={{
            height:BASE_SCROLL_HELPER_HEIGHT,
            backgroundColor: background,
            width: '100%',
            opacity: scrollScale(scroll),
            position:'relative'}}>
        </div>
    )

  }
})



const ScrollHelperBottom = connect(scrollHelperMapStateToProps, { setScrollDelta }) (class extends React.PureComponent {

  bottomHook = null;
  lastScroll = null

  handleScroll = (e) => {
    if(!this.bottomHook){return}
    var rect = this.bottomHook.getBoundingClientRect();
    const h = window.innerHeight
    const bottomFade = (rect.bottom, h - rect.bottom + BASE_SCROLL_HELPER_HEIGHT)
    const delta = bottomFade > 0 ?  bottomFade : window.scrollY < BASE_SCROLL_HELPER_HEIGHT ? -(BASE_SCROLL_HELPER_HEIGHT - window.scrollY) : 0

    if(this.ctrl){
      clearTimeout(this.ctrl)
    }
    this.ctrl = setTimeout(()=>{
      if (Math.abs(delta) > 0 &&  Math.abs(delta) < 200){
        window.scroll({top: BASE_SCROLL_HELPER_HEIGHT, left:0, behavior: 'smooth'})
      }
    }, 250)

    this.props.setScrollDelta(delta)

  }

  componentDidMount(){
    var rect = this.bottomHook.getBoundingClientRect();
    this.initialTop = rect.top
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll, true)
  }

  render(){
    const { background='transparent', scroll, overlay=false } = this.props

    return (
        <div style={{
            // height:BASE_SCROLL_HELPER_HEIGHT-this.props.scroll,
            height:BASE_SCROLL_HELPER_HEIGHT,
            backgroundColor: background,
            width: '100%', position:'relative',
            opacity: scrollScale(scroll),
          }}>
          <div ref={(r)=>{
            this.bottomHook=r;
          }} style={{position:'absolute', bottom:0, height:2, backgroundColor:'red', right:0, left:0}}></div>
        </div>
    )

  }
})

class Module extends PureComponent {

  scrollScale = scaleLinear()
    .domain([-BASE_SCROLL_HELPER_HEIGHT, 0, BASE_SCROLL_HELPER_HEIGHT])
    .range([0, 1, 0])

  state = {
    moduleHeight : 0,
    stopScroll: true,
    scrolling: 0,
  }

  componentWillReceiveProps (nextProps){

    if (this.props.scroll !== nextProps.scroll){
      if(nextProps.scroll === BASE_SCROLL_HELPER_HEIGHT){
        this.setState({scrolling:-1})
        this.toNextModule()
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
    this._isMounted = false
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

  toNextModule = () => {
    const { moduleIndex, totalChapterModules, history, theme, chapter, chapterIndex } = this.props
    const nextChapterSlug = get(theme, `stories[${Number(chapterIndex) + 1}].slug`)
    const themeUrl = `/themes/${theme.slug}`
    const chapterUrl = `${themeUrl}/chapters/${chapter.slug}`
    if (moduleIndex < totalChapterModules) {
      history.push(`${chapterUrl}/modules/${Number(moduleIndex) + 1}`)
    } else {
      // Go to cover of next chapter
      history.push(`${themeUrl}/chapters/${nextChapterSlug}`)
    }
  }

  toPrevModule = () => {
    const { moduleIndex, totalChapterModules, history, theme, chapter, chapterIndex } = this.props

    const themeUrl = `/themes/${theme.slug}`
    const chapterUrl = `${themeUrl}/chapters/${chapter.slug}`

    if (moduleIndex > 0) {
      history.push(`${chapterUrl}/modules/${Number(moduleIndex) - 1}`)
    } else {
      if(chapterIndex > 0){
        const prevChapterSlug = get(theme, `stories[${Number(chapterIndex) - 1}].slug`)
        history.push(`${themeUrl}/chapters/${prevChapterSlug}`)
      }
    }
  }


  render() {
    const { chapter, module, moduleIndex } = this.props
    if (!module) {
      return null
    }

    const background = module.background || {}
    let bottomScrollBackground

    const topScrollBackground = background.color ?  background.color : background.object ? background.object.overlay : 'transparent'
    const topScrollOverlay =  background.object &&  background.object.overlay


    if((module.size && module.size === 'big') || module.module === 'map' || module.module === 'gallery'){
      bottomScrollBackground = '#fff'
    } else {
      bottomScrollBackground = topScrollBackground
    }
    const bottomScrollOverlay = topScrollOverlay

    // console.log("opacity", this.scrollScale(this.props.scroll))
    // console.log("mh", this.state.moduleHeight)

    return  <div>
    <ScrollHelperTop moduleIndex={moduleIndex} background={topScrollBackground} overlay={topScrollOverlay}/>
    <div style={{ marginTop: this.state.scrolling * 150, ...moduleContainerStyle,
        // opacity:1 - (this.props.scroll/1000)
        opacity: this.scrollScale(this.props.scroll)
      }}>
      {React.createElement(getModuleComponent(module.module), {
        chapter,
        module,
      })}
      {/* <ModuleText chapter={chapter} module={module}/> */}
      {/* <ModuleObject chapter={chapter} module={fakeModule.object}  /> */}
      {/* <ModuleTextObject chapter={chapter} module={fakeModule.text_object}  /> */}
      {/* <ModuleCarousel chapter={chapter} module={fakeModule.object} /> */}
      {/* <ModuleMap chapter={chapter} module={fakeModule.object} /> */}
      {/* <ModuleMapText chapter={chapter} module={fakeModule.text_object}  /> */}

    </div>
    <ScrollHelperBottom moduleIndex={moduleIndex} background={bottomScrollBackground} overlay={bottomScrollOverlay}/>
    {this.state.stopScroll && <ScrollLock/> }
  </div>
  }
}


const makeMapStateToProps = () => {
  const getModule = makeGetModule()
  const mapStateToProps = (state, props) => {
    const moduleIndex = props.match.params.moduleIndex
    return {
      theme: getTheme(state),
      chapter: getChapter(state),
      module: getModule(state, moduleIndex),
      scroll: state.scroll,
      moduleIndex: moduleIndex,
      chapterIndex: getChapterIndex(state),
      totalChapterModules: getTotalChapterModules(state),
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, { setScrollDelta })(Module)
