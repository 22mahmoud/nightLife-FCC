const mongoose = require('mongoose')
const User = mongoose.model('User')
const yelp = require('yelp-fusion')

const clientId = 'wYTQ9kjOCWC2UjSqjn_lew';
const clientSecret = '1ujzyctbOG11USZsFD3oXg6L0LnPStKRQq1zIdVaEnX1OoObl2OpdnTSM1xr5hW9';

exports.search = (req, res) => {
    res.render('search',{ title: 'Search' })
}

exports.searchResult = async (req, res) => {
  const { address, find } = req.query

  const searchRequest = {
    location: address
  }
  try {
    const response = await yelp.accessToken(clientId, clientSecret)
    const client = await yelp.client(response.jsonBody.access_token)
    const data = await client.search(searchRequest)
    const restaurants = data.jsonBody
    let finalrestaurants
   for(let i = 0; i < restaurants.businesses.length; i++) {
      const users = await User.find({ saves: { $in: [restaurants.businesses[i].id] } })
      const usersNo = users.length
      finalrestaurants = Object.assign(restaurants.businesses[i], {usersNo})
    }
    //res.send(restaurants)
    res.render('restaurants', { title: 'Search Results', restaurants })
  } catch(err) {
    throw err
  }
}


exports.goRestaurant = async (req, res) => {
  const saves = req.user.saves
  const { id } = req.params
  const operator = saves.includes(id) ? '$pull' : '$addToSet'
  const user = await User.findByIdAndUpdate(req.user._id, 
    { [operator]: { saves: id } },
    { new: true }
  )
  res.json(user)
}

exports.getSaved = async (req, res) => {
  res.send(req.user.saves)
}