import config from '@rispa/config'

export const getCssFilesLoader = context => {
  const postCssLoaderOptions = {
    ...config.postCssLoaderOptions,
    plugins: loader => {
      const userPlugins = config.postCssLoaderOptions.plugins
        ? config.postCssLoaderOptions.plugins(loader)
        : [];

      return [
        require('postcss-import')({ root: loader.resourcePath }),
        require('postcss-cssnext')(),
        ...userPlugins,
      ]
    }
  }

  const cssLoaderOptions = {
    importLoaders: true,
    ...config.cssLoaderOptions,
  }

  return  {
    test: context.fileType('text/css'),
    exclude: /node_modules/,
    loaders: [
      'style-loader',
      { loader: 'css-loader', options: cssLoaderOptions },
      { loader: 'postcss-loader', options: postCssLoaderOptions },
    ]
  }
}

export default registry => context => ({
  module: {
    rules: [getCssFilesLoader(context)],
  },
})
