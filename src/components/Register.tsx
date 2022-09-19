import { Component, SyntheticEvent } from 'react'
import { RegisterState } from '../model/StatesModel'
import { RegisterProps } from '../model/PropsModel'
import { CustomInput } from '../model/EventsModel'
import '../styles/AuthFormStyle.css'
import { Form, Modal, Button } from 'react-bootstrap'
import { ValidateSignup } from '../validations/AuthValidations'

export class Register extends Component<RegisterProps, RegisterState> {
  state: RegisterState = {
    email: '',
    userName: '',
    password: '',
    error: {},
  }
  private handleChange = (event: CustomInput) => {
    this.setState({
      ...this.state,
      [event.target.name]: String(event.target.value),
      error: {},
    })
  }
  private handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const { userName, email, password } = this.state
    const validations = ValidateSignup({ userName, email, password })
    if (!validations.isValid) {
      this.setState({
        error: validations.errors,
      })
    } else {
      const result = await this.props.authService.register(
        this.state.userName,
        this.state.password,
        this.state.email,
      )
      if (result) {
        this.props.setUser(result)
        this.props.close()
        alert('You Successfully Register')
      } else {
        alert('Register Failed: Wrong Credentials')
      }
    }
  }
  render() {
    const { show, close } = this.props
    const { userName, email, password, error } = this.state
    return (
      <Modal show={show} onHide={() => close()}>
        <Modal.Header closeButton>
          <Modal.Title>Register Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                placeholder="Enter Username"
                value={userName}
                onChange={e => this.handleChange(e)}
                autoComplete="off"
              />
              <Form.Text className="text-danger">{error.userName}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={e => this.handleChange(e)}
                autoComplete="off"
              />
              <Form.Text className="text-danger">{error.email}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={e => this.handleChange(e)}
                autoComplete="off"
              />
              <Form.Text className="text-danger">{error.password}</Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={e => this.handleSubmit(e)}>
              Register
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          Already have account?
          <Button variant="link" onClick={() => this.props.showLogin()}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
