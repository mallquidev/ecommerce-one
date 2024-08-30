import app from './app.js'
import { PORT } from './config.js'
import {checkConnect} from './db.js'

checkConnect()
app.listen(PORT)

console.log(`SERVER IS RUNNING ON PORT ${PORT}`)