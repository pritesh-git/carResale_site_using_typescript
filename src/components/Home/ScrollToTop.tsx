import React from 'react'
import '../../styles/ScrollButton.css'
import { BiUpArrowCircle } from 'react-icons/bi'
export default class ScrollToTop extends React.Component {
  render() {
    return (
      <div className="justify-content-center mt-5 pb-5">
        <h1 className="scrollBtn" onClick={() => window.scrollTo(0, 0)}>
          <BiUpArrowCircle />
        </h1>
      </div>
    )
  }
}
