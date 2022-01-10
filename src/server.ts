import appFactory from './app'
import { settings } from './core'

const app = appFactory()

app.listen(settings.APP_PORT, () => {
  console.log(
    `server started at http://${settings.APP_HOST}:${settings.APP_PORT}`
  )
})
