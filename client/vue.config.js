try {
  module.exports = {
    devServer: {
      open: false,
      public: 'https://localhost:4433',
      host: 'localhost',
      port: 4433,
      https: {
        key: JSON.parse(`"${process.env.HTTPS_LOCALHOST_KEY}"`),
        cert: JSON.parse(`"${process.env.HTTPS_LOCALHOST_CRT}"`),
      },
      // hotOnly: false,
      // disableHostCheck: true,
    },
    transpileDependencies: ['vuetify'],
  }
} catch (error) {
  console.error(error)
}
