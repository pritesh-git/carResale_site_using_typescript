import React from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { MenuProps } from '../model/PropsModel'
import '../styles/NavbarStyle.css'
import { Link } from 'react-router-dom'
import { FaCar } from 'react-icons/fa'

export default class Menubar extends React.Component<MenuProps, {}> {
  render() {
    const { user, login, signup } = this.props
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <h2>
              <FaCar />
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/cars">
                Car
              </Nav.Link>
              <Nav.Link as={Link} to="/service">
                Service
              </Nav.Link>
            </Nav>
            {!user ? (
              <Nav className="mx-5">
                <Button
                  onClick={() => login()}
                  variant="link"
                  className="m-0 p-0">
                  Login
                </Button>
                <span className="fw-light text-muted px-2 mx-auto">or</span>
                <Button
                  onClick={() => signup()}
                  variant="link"
                  className="m-0 p-0">
                  Signup
                </Button>
              </Nav>
            ) : (
              <Nav className="mx-5">
                <Button
                  variant="dark"
                  className="m-0 p-0 fw-bold border-bottom">
                  {user.userName}
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
