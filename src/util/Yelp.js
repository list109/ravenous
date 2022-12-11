const apiKey =
  'IoNiWEe1LFoHMhPW3C23ogHi6ih5_rAJqUfjm6Px19rti1nBX8FD-plzKL9jxpQBMnQBZaSwH_z-hN9Ru1rqNV1WoaR0vC9p5ywlR7_hRahgEnBgCIXlNUTgcUzTYHYx'

const proxy = 'https://cors-proxy-list109.herokuapp.com/'

export const Yelp = {
  url: {
    yelpApiUrl: `https://api.yelp.com`,
    get searchApiUrl() {
      return `${this.yelpApiUrl}/v3/businesses/search`
    },
    get autocompleteApiUrl() {
      return `${this.yelpApiUrl}/v3/autocomplete`
    }
  },

  async searchBusinesses({
    term = '',
    location = '',
    sortBy = '',
    radius = '',
    onlyOpened = '',
    limit = ''
  }) {
    const urlToFetch = this.getSearchUrl({
      term,
      location,
      sortBy,
      radius,
      onlyOpened,
      limit
    })

    const { businesses = [] } = await this.search(urlToFetch)

    return businesses.map(business => this.getBusinessData(business))
  },

  async searchAutocomplete({ text, limit }) {
    const urlToFetch = `${this.url.autocompleteApiUrl}?text=${text}&limit=${limit}`

    return await this.search(urlToFetch)
  },

  getSearchUrl({ term, location, sortBy, radius, onlyOpened, limit }) {
    let url = `${this.url.searchApiUrl}?`

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
      response = await fetch(proxy + urlToFetch, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
    } catch (error) {
      throw new FetchError({ message: 'Network error has occured. Try again or later.' })
    }

    if (!response.ok) {
      let jsonResponse

      try {
        jsonResponse = await response.json()
      } catch {}

      const errorStatus = jsonResponse.error?.code
      let errorMessage = jsonResponse.error?.description || response.statusText

      throw new FetchError({ status: errorStatus, message: errorMessage })
    }

    try {
      return await response.json()
    } catch {
      throw new FetchError({
        message: 'Some error has occured on the server. Please, try again or later.'
      })
    }
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
  constructor({ status, message }) {
    super(message)
    this.status = status
  }
}

// handle uncaught failed fetch through
window.addEventListener('unhandledrejection', event => {
  console.log(event.message)
})
