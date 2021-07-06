// const clientId = 'h2ayhV07GIf6tEX31j29cw'
const apiKey =
  'IoNiWEe1LFoHMhPW3C23ogHi6ih5_rAJqUfjm6Px19rti1nBX8FD-plzKL9jxpQBMnQBZaSwH_z-hN9Ru1rqNV1WoaR0vC9p5ywlR7_hRahgEnBgCIXlNUTgcUzTYHYx'

export const Yelp = {
  async search({ term, location, sortBy }) {
    // const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
    // const endpoint = 'https://api.yelp.com/v3/businesses/search'
    // const urlToFetch = `${corsAnywhere}${endpoint}?term=${term}&location=${location}&sort_by=${sortBy}`
    const urlToFetch = `/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`

    let response

    try {
      response = await fetch(urlToFetch, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
    } catch (error) {
      throw new FetchError(response, `Network error has occured:${error.message}`)
    }

    if (!response.ok) {
      throw new FetchError(response, `${response.status}:${response.statusText}`)
    }

    let jsonResponse

    try {
      jsonResponse = await response.json()
    } catch (error) {
      throw new FetchError(jsonResponse, 'Transformation to json format was failed')
    }
    const { businesses = [] } = jsonResponse

    return businesses.map(business => this.getBusinessData(business))
  },

  getBusinessData({
    id,
    image_url: imageSrc = '',
    name,
    location,
    categories,
    rating,
    review_count: reviewCount,
    url
  }) {
    const { address1: address, city, state, zip_code: zipCode } = location
    const category = categories.map(({ title }) => title).join(', ')

    return {
      id,
      imageSrc,
      name,
      address,
      city,
      state,
      zipCode,
      category,
      rating,
      reviewCount,
      url
    }
  }
}

class FetchError extends Error {
  constructor(response, message) {
    super(message)
    this.response = response
  }
}

// handle uncaught failed fetch through
window.addEventListener('unhandledrejection', event => {
  console.log(event.reason.message)
})
