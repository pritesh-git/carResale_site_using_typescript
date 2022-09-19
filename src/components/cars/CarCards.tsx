import React from 'react'
import '../../styles/CardArray.css'
import {
  Row,
  Col,
  Modal,
  Image,
  ListGroup,
  Table,
  Button,
} from 'react-bootstrap'
import { carsProps } from '../../model/PropsModel'

interface propsData {
  cars: any
}
interface carsState {
  show: boolean
  modalData: carsProps | undefined
}
export default class CarCards extends React.Component<propsData, carsState> {
  state = {
    show: false,
    modalData: this.props.cars[0],
  }
  private toggleModal = (show = false, data = undefined) => {
    this.setState({
      show,
      modalData: data,
    })
  }

  render() {
    const { cars } = this.props
    const { show, modalData } = this.state
    if (!cars.length) {
      return (
        <h3 className="w-100 text-center text-muted font-monospace pt-5">
          no record found
        </h3>
      )
    } else {
      return (
        <>
          <div className="m-5 d-flex flex-wrap align-items-start">
            {cars?.map((data: any) => (
              <div className="p-4">
                <div className="cards">
                  <img src={data?.images[0]} alt="carImage" />
                  <div className="middle">
                    <div
                      className="text"
                      onClick={() => this.toggleModal(true, data)}>
                      FEATURES
                    </div>
                  </div>
                  <h5 className="mt-2">{data?.carMake}</h5>
                </div>
              </div>
            ))}
          </div>
          {modalData && (
            <Modal
              size="xl"
              show={show}
              onHide={() => this.toggleModal()}
              centered>
              <Modal.Header closeButton>
                <Modal.Title>{modalData?.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Image src={modalData?.images[0]} thumbnail fluid />
                <Image
                  className="w-25 m-3 ms-0"
                  src={modalData?.images[1]}
                  thumbnail
                />
                <Image
                  className="w-25 m-3"
                  src={modalData?.images[2]}
                  thumbnail
                />
                <Image
                  className="w-25 m-3"
                  src={modalData?.images[3]}
                  thumbnail
                />
                <Table borderless size="sm">
                  <thead>
                    <tr>
                      <th className="ps-2">
                        <h3>Info</h3>
                      </th>
                      <th style={{ width: '70%' }}>
                        <h3>Details</h3>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <ListGroup>
                          <ListGroup.Item>
                            <b>Price:</b> {modalData?.price}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <b>Fuel Tank:</b> {modalData?.size}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <b>manufacturer:</b> {modalData?.carMake}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <b>Sport Package:</b>{' '}
                            {modalData?.Sport ? 'Included' : 'N/A'}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <b>GPS:</b> {modalData?.GPS ? 'Included' : 'N/A'}
                          </ListGroup.Item>
                        </ListGroup>
                      </td>
                      <td>{modalData?.description}</td>
                    </tr>
                    <tr style={{ borderTop: '1px solid grey' }}>
                      <td className="pt-3 pb-1">
                        <b>Premium features:</b>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={parseInt('2')}>
                        {modalData?.extras.map((val: any) => {
                          return (
                            <>
                              <i>{val}</i>
                              <b>,</b>{' '}
                            </>
                          )
                        })}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Button
                  variant="primary"
                  size="lg"
                  className="px-5 py-2"
                  style={{ float: 'right' }}>
                  Buy
                </Button>
              </Modal.Body>
            </Modal>
          )}
        </>
      )
    }
  }
}
