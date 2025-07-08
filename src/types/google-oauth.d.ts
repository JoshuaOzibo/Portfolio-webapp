declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string
            scope: string
            callback: (response: {
              access_token: string
              error?: string
            }) => void
          }) => {
            requestAccessToken: () => void
          }
        }
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: {
              credential: string
              error?: string
            }) => void
          }) => void
          prompt: () => void
        }
      }
    }
  }
}

export {} 