import { init, build } from '@rispa/core/events'
import { server } from '@rispa/server/events'
import getWebpackCssConfig from './css.wpc'

const activator = on => {
  console.log('ACTIVATOR '.repeat(100))
  const initHandler = registry => {
    registry.add('webpack.common', getWebpackCssConfig(registry))
    registry.add('webpack.client', getWebpackCssConfig(registry))
  }

  on(init(build), initHandler)
  on(init(server), initHandler)
}

export default activator
