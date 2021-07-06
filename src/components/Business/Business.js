import React from 'react'
import './Business.css'

export class Business extends React.Component {
  render() {
    const { business } = this.props
    const { imageSrc, name, address, city, state, category, rating, reviewCount, url, distance } =
      business

    const businessMapUrl = new URL('https://www.google.com/maps/search/')
    businessMapUrl.searchParams.append('api', 1)
    businessMapUrl.searchParams.append('query', `${name}, ${address}, ${city}, ${state}`)

    return (
      <div className="Business">
        <a href={url} target="blank">
          <div className="image-container">
            <img src={imageSrc} alt="" />
          </div>
        </a>
        <h2>{name}</h2>
        <div className="Business-information">
          <a href={businessMapUrl} target="blank">
            <div className="Business-address">
              <p>{address}</p>
              <p>{city}</p>
              <p>{state}</p>
              <p>{Math.floor(distance)} m</p>
            </div>
          </a>
          <div className="Business-reviews">
            <h3>{category.toUpperCase()}</h3>
            <h3 className="rating">{rating} stars</h3>
            <p>
              {reviewCount}
              {reviewCount === 1 ? ' review' : ' reviews'}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
