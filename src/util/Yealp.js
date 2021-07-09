// const clientId = 'h2ayhV07GIf6tEX31j29cw'
const apiKey =
  'IoNiWEe1LFoHMhPW3C23ogHi6ih5_rAJqUfjm6Px19rti1nBX8FD-plzKL9jxpQBMnQBZaSwH_z-hN9Ru1rqNV1WoaR0vC9p5ywlR7_hRahgEnBgCIXlNUTgcUzTYHYx'

export const Yelp = {
  searchApiUrl: '/v3/businesses/search',

  async searchBusinesses({
    term = '',
    location = '',
    sortBy = '',
    radius = '',
    onlyOpened = '',
    limit = ''
  }) {
    // const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
    // const endpoint = 'https://api.yelp.com/v3/businesses/search'
    // const urlToFetch = `${corsAnywhere}${endpoint}?term=${term}&location=${location}&sort_by=${sortBy}`
    const urlToFetch = this.getSearchUrl({ term, location, sortBy, radius, onlyOpened, limit })

    const { businesses = [] } = await this.search(urlToFetch)

    return businesses.map(business => this.getBusinessData(business))
  },

  getSearchUrl({ term, location, sortBy, radius, onlyOpened, limit }) {
    let url = `${this.searchApiUrl}?`

    url = term ? `${url}term=${term}&` : url
    url = location ? `${url}location=${location}&` : url
    url = sortBy ? `${url}sort_by=${sortBy}&` : url
    url = radius ? `${url}radius=${radius}&` : url
    url = onlyOpened ? `${url}open_now=${onlyOpened}&` : url
    url = limit ? `${url}limit=${limit}&` : url

    return url.endsWith('&') ? url.slice(0, -1) : url
  },

  async search(urlToFetch) {
    let response

    try {
      response = await fetch(urlToFetch, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
    } catch (error) {
      throw new FetchError(response.status, `Network error has occured:${error.message}`)
    }

    if (!response.ok) {
      throw new FetchError(response.status, `${response.status}:${response.statusText}`)
    }

    let jsonResponse

    try {
      jsonResponse = await response.json()
    } catch (error) {
      throw new FetchError(null, 'Transformation to json format was failed')
    }

    return jsonResponse
  },

  getBusinessData({
    id,
    image_url: imageSrc = '',
    name,
    location,
    categories,
    rating,
    review_count: reviewCount,
    url,
    distance
  }) {
    const { address1: address, city, state, country, zip_code: zipCode } = location
    const category = categories.map(({ title }) => title).join(', ')

    return {
      id,
      imageSrc,
      name,
      address,
      city,
      state,
      country,
      zipCode,
      category,
      rating,
      reviewCount,
      url,
      distance
    }
  }
}

class FetchError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

// handle uncaught failed fetch through
window.addEventListener('unhandledrejection', event => {
  console.log(event.message)
})
