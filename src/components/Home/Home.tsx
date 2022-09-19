import React from 'react'
import FeaturedCar from '../cars/FeaturedCar'
import ScrollToTop from './ScrollToTop'
import Services from './Services'
import Slider from './Slider'

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Slider />
        <Services />
        <FeaturedCar />
        <ScrollToTop />
      </>
    )
  }
}
