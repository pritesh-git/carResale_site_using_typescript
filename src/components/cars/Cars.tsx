import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { DataService } from '../../services/DataService'
import CarCards from './CarCards'

const uniqueValues = (items: any, value: any) => {
  return [...new Set(items.map((item: any) => item[value]))]
}
export default class Cars extends React.Component {
  state = {
    cars: [],
    sortedCars: [],
    type: 'all',
    types: [],
    city: 'all',
    cities: [],
    carMake: 'all',
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    GPS: false,
    Sport: false,
    manufacturers: [],
  }

  private dataService: DataService = new DataService()

  async componentDidMount() {
    let results: any
    await this.dataService.getData().then(data => (results = data?.cars))

    var minPrice = Math.min(...results.map((val: any) => val.price))
    var maxPrice = Math.max(...results.map((val: any) => val.price))

    let types = uniqueValues(results, 'type')
    types = ['all', ...types]

    let cities = uniqueValues(results, 'city')
    cities = ['all', ...cities]

    let manufacturers = uniqueValues(results, 'carMake')
    manufacturers = ['all', ...manufacturers]

    this.setState({
      cars: results,
      sortedCars: results,
      price: maxPrice,
      minPrice,
      maxPrice,
      types,
      manufacturers,
      cities,
    })
  }

  handleChange = (e: any) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = e.target.name

    this.setState(
      {
        [name]: value,
      },
      this.filterCars,
    )
  }

  filterCars = () => {
    let { cars, price, type, carMake, GPS, Sport, city } = this.state
    let tempCars = [...cars]
    if (type !== 'all') {
      tempCars = tempCars.filter((car: any) => car.type === type)
    }
    if (carMake !== 'all') {
      tempCars = tempCars.filter((car: any) => car.carMake === carMake)
    }
    if (city !== 'all') {
      tempCars = tempCars.filter((car: any) => car.city === city)
    }
    if (price !== 0) {
      tempCars = tempCars.filter((car: any) => car.price <= price)
    }
    if (GPS) {
      tempCars = tempCars.filter((car: any) => car.GPS === true)
    }
    if (Sport) {
      tempCars = tempCars.filter((car: any) => car.Sport === true)
    }
    this.setState({
      sortedCars: tempCars,
    })
  }

  render() {
    const {
      sortedCars,
      minPrice,
      maxPrice,
      price,
      types,
      manufacturers,
      cities,
    } = this.state
    return (
      <Container fluid className="p-5">
        <Row className="mb-5">
          <Container fluid>
            <Row className="font-monospace text-center mt-5 mb-3">
              <h1>Search Cars</h1>
            </Row>
            <Row className="text-center mt-5 mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Car Type</Form.Label>
                  <Form.Select
                    aria-label="select type"
                    name="type"
                    onChange={e => this.handleChange(e)}>
                    {types.map((item: any, index: any) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    aria-label="select city"
                    name="city"
                    onChange={e => this.handleChange(e)}>
                    {cities.map((item: any, index: any) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Brands</Form.Label>
                  <Form.Select
                    aria-label="select brand"
                    name="carMake"
                    onChange={e => this.handleChange(e)}>
                    {manufacturers.map((manufacturer: any, index: any) => {
                      return (
                        <option key={index} value={manufacturer}>
                          {manufacturer}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>
                    Price: <small>{price}</small>
                  </Form.Label>
                  <Form.Range
                    step={(maxPrice - minPrice) / 100}
                    name="price"
                    value={price}
                    onChange={e => this.handleChange(e)}
                    min={minPrice}
                    max={maxPrice}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <div
                    key={`inline-checkbox`}
                    className="mb-3"
                    onChange={e => this.handleChange(e)}>
                    <Form.Check
                      inline
                      label="GPS"
                      name="GPS"
                      type={'checkbox'}
                      id={`inline-checkbox-1`}
                    />
                    <Form.Check
                      inline
                      label="Sport"
                      name="Sport"
                      type={`checkbox`}
                      id={`inline-checkbox-2`}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Row>
        <CarCards cars={sortedCars} />
      </Container>
    )
  }
}
