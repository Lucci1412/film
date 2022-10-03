
import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import passport from 'passport'
import authGoogleRouter from './routes/authGoogle.js'
import authFacebookRouter from './routes/authFacebook.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import movieRouter from './routes/movie.js'
import commentRouter from './routes/comment.js'
import morgan from 'morgan'

const app = express()
const port = process.env.PORT || 3001
// app.use('cookie-parser');
app.use(express.json());
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log('connected')
  }, e => console.error(e))
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY],
  maxAge: 24 * 60 * 60 * 1000 * 7// 24 hours
}))
app.use(passport.initialize())
app.use (passport.session ())

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  })
);

app.use('/api/v1/auth/google',authGoogleRouter)
app.use('/api/v1/auth/facebook',authFacebookRouter)
app.use('/api/v1/auth/user',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/movie',movieRouter)
app.use('/api/v1/comment',commentRouter)
app.listen(port, () => {
  console.log(`server is running port ${port}`)
})
