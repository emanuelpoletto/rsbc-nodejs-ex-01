const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const checkIfAgeExists = (req, res, next) => {
  if (req.query.age) {
    return next()
  }

  return res.redirect('/')
}

app.get('/', (req, res) => {
  return res.render('home')
})

app.get('/legal', checkIfAgeExists, (req, res) => {
  return res.render('legal', { age: req.query.age })
})

app.get('/minor', checkIfAgeExists, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.post('/check', (req, res) => {
  const { age } = req.body
  const route = age >= 18 ? 'legal' : 'minor'

  return res.redirect(`/${route}?age=${age}`)
})

app.listen(3000)
