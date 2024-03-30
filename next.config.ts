module.exports = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/:path*'
        }
      ]
    }
  }