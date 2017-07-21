import { init, build } from '@rispa/core/events'
import { server } from '@rispa/server/events'
import webpackCssConfig from './css.wpc'

const activator = on => {
  const initHandler = registry => {
    registry.add('webpack.common', webpackCssConfig)
    registry.add('webpack.client', webpackCssConfig)
  }

  on(init(build), initHandler)
  on(init(server), initHandler)
}

export default activator
