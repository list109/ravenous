import React from 'react'
import './BusinessList.css'
import { Business } from '../Business/Business'

export class BusinessList extends React.Component {
  render() {
    const { businesses } = this.props

    return (
      <div className="BusinessList">
        {businesses.map((business, i) => (
          <Business business={business} key={i} />
        ))}
      </div>
    )
  }
}
