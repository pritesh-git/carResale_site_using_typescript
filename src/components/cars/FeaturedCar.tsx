import React from 'react'
import { Container, Row } from 'react-bootstrap'
import CarCards from './CarCards'
import { DataService } from '../../services/DataService'

export default class FeaturedCar extends React.Component {
  state = { cars: [] }
  private dataService: DataService = new DataService()
  async componentDidMount() {
    let results: any
    await this.dataService
      .getData()
      .then(data => (results = data?.featuredCars))

    this.setState({
      cars: results,
    })
  }
  render() {
    const { cars } = this.state
    return (
      <Container className="p-2">
        <Row className="font-monospace text-center mt-5 mb-3">
          <h1>Featured Cars</h1>
        </Row>
        <CarCards cars={cars} />
      </Container>
    )
  }
}
