import config from '@rispa/config'
import postcssImport from 'postcss-import'
import postcssCssnext from 'postcss-cssnext'

export const getCssFilesLoader = context => {
  const postCssLoaderOptions = {
    ...config.postCssLoaderOptions,
    plugins: loader => {
      const userPlugins = config.postCssLoaderOptions.plugins
        ? config.postCssLoaderOptions.plugins(loader)
        : []

      return [
        postcssImport({ root: loader.resourcePath }),
        postcssCssnext(),
        ...userPlugins,
      ]
    },
  }

  const cssLoaderOptions = {
    importLoaders: true,
    ...config.cssLoaderOptions,
  }

  return {
    test: context.fileType('text/css'),
    exclude: /node_modules/,
    loaders: [
      'style-loader',
      { loader: 'css-loader', options: cssLoaderOptions },
      { loader: 'postcss-loader', options: postCssLoaderOptions },
    ],
  }
}

export default context => ({
  module: {
    rules: [getCssFilesLoader(context)],
  },
})
