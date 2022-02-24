const path = require('path')
const sassResourcesLoader = require('craco-sass-resources-loader')

const aliases = {
  '@components': './src/components/index',
  '@constants': './src/config/constants',
  '@env': './src/config/environment',
  '@core': './src/core/index',
  '@services': './src/services/index',
  '@store': './src/store/index',
  '@routes': './src/routes/index',
  '@hooks': './src/hooks/index',
  '@assets': './src/assets',
  '@utils': './src/core/utils/index',
  '@assets/*': './src/assets/'
}

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)])
)

module.exports = {
  webpack: {
    alias: resolvedAliases
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
          'src/styles/_variables.scss',
          'src/styles/utilities/_functions.scss',
          'src/styles/utilities/_mixins.scss'
        ]
      }
    }
  ]
}
