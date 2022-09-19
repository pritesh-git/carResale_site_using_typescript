import { Component, SyntheticEvent } from 'react'
import { LoginState } from '../model/StatesModel'
import { LoginProps } from '../model/PropsModel'
import { CustomInput } from '../model/EventsModel'
import '../styles/AuthFormStyle.css'
import { Form, Modal, Button } from 'react-bootstrap'
import { ValidateLogin } from '../validations/AuthValidations'

export class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
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
    const { userName, password } = this.state
    const validations = ValidateLogin({ userName, password })
    if (!validations.isValid) {
      this.setState({
        error: validations.errors,
      })
    } else {
      const result = await this.props.authService.login(userName, password)
      if (result) {
        this.props.setUser(result)
        this.props.close()
        alert('You Successfully Login')
      } else {
        alert('Login Failed: Wrong Credentials')
      }
    }
  }
  render() {
    const { show, close } = this.props
    const { userName, password, error } = this.state
    return (
      <Modal show={show} onHide={() => close()}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
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
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          Don't have account?
          <Button variant="link" onClick={() => this.props.showRegister()}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
