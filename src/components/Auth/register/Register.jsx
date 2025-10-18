import { Form, Button } from "react-bootstrap"
import AuthContainer from "../AuthContainer/AuthContainer"
import { useState } from "react"

const Register = () => {
  
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [DNI, setDNI] = useState("")
  const [checkbox, setCheckbox] = useState(false)
  
  const handleChangeInput = (e) => {
    const {name, value} = e.target
    switch(name) {
      case "email":
          setEmail(value)
        break
      case "password":
        setPassword(value)
        break
      case "username":
        setUsername(value)
        break
      case "DNI":
        setDNI(value)
        break
    }
  }

  
  const validations = () => {
    const errors = {}
    const expresionRegularMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!email.length) errors.email = "Email is required"
    else if(!expresionRegularMail.test(email)) errors.email = "Enter a valid email"

    const expresionRegularPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/


    if(!password.length) errors.password = "Password is required"
    else if(!expresionRegularPassword.test(password)) errors.password = "Enter a valid password"

    const expresionRegularUsername = /^[a-zA-Z0-9_]{3,20}$/

    if(!username.length) errors.username = "Username is required"
    else if(!expresionRegularUsername.test(username)) errors.username = "Enter a valid username"

    const expresionRegularDNI = /^\d{7,8}$/

    if(!DNI.length) errors.DNI = "DNI is required"
    else if(!expresionRegularDNI.test(DNI)) errors.DNI = "Enter a valid DNI"

    if(!checkbox) errors.checkbox = "You must accept the terms and conditions"

    setErrors(errors)
    return Object.keys(errors).length === 0
  }
    
  


  const handleSubmit = (e) => {
    e.preventDefault()
    if(validations()) {
      console.log("Enviando formulario")
    } else{
      console.log(errors)
    }
}

  return (
    <AuthContainer >
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-5">
          <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleChangeInput} value={email} placeholder="JuanCarlosEjemplo@gmail.com" />
              <Form.Text id="EmailError" className="text-danger">{errors.email?errors.email:null}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-5">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChangeInput} value={password} />
              <Form.Text id="PasswordError">Password must be longer than 8 characters. Must include at least one uppercase letter, one lowercase letter and one number</Form.Text>
              <br />
              <Form.Text id="PasswordError" className="text-danger">{errors.password?errors.password:null}</Form.Text>
          </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" onChange={handleChangeInput} value={username} placeholder="JuanCarlosEjemplo55" />
              <Form.Text id="UsernameError">Usernames must be between 3-20 characters. Special characters are not allowed</Form.Text>
              <br />
              <Form.Text id="UsernameError" className="text-danger">{errors.username?errors.username:null}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-5">
          <Form.Label>DNI</Form.Label>
              <Form.Control type="text" name="DNI" onChange={handleChangeInput} value={DNI} placeholder="JuanCarlosEjemplo55" />
              <Form.Text id="DNIError" className="text-danger">{errors.DNI?errors.DNI:null}</Form.Text>
          </Form.Group>

          <Form.Check className="mb-5">
            <Form.Check.Input type="checkbox" onChange={(e) => setCheckbox(e.target.checked)}  />
            <Form.Check.Label>I accept the <u >terms and conditions</u></Form.Check.Label>
            <br />
            <Form.Text id="CheckboxError" className="text-danger">{errors.checkbox?errors.checkbox:null}</Form.Text>
          </Form.Check>
          
          <Button type="submit">Register</Button>
      </Form>
    </AuthContainer>
  )
}

export default Register