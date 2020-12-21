try {
  module.exports = {
    host: '0.0.0.0',
    port: 443,
    requestCert: false,
    rejectUnauthorized: false,
    key: JSON.parse(`"${process.env.HTTPS_LOCALHOST_KEY}"`),
    cert: JSON.parse(`"${process.env.HTTPS_LOCALHOST_CRT}"`),
  }
} catch (error) {
  console.error(error)
}
