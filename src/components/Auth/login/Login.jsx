import { Button, Col, Form, FormGroup, Row } from "react-bootstrap"
import AuthContainer from "../AuthContainer/AuthContainer"
import { useState } from "react"
import { useNavigate } from "react-router"

const Login = () => {

    const navigate = useNavigate()
    
    const handleClickRegister = () => {
        navigate('/register')
    }

    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        switch(name) {
            case "email":
                if (!value.includes(" ")) {
                    setEmail(value)
                } 
                break
            case "password":
                setPassword(value)
                break
        }
    }



    return(
        <AuthContainer>
            <Form>
                <Form.Group className="mb-5">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChangeInput} value={email} placeholder="JuanCarlosEjemplo@gmail.com" />
                    <Form.Text>

                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-5">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChangeInput} value={password} />
                </Form.Group>
                <Button type="submit" className="mb-5">Log in</Button>
                <p onClick={handleClickRegister} className="text-muted"  style={{cursor:"pointer"}}><u>Dont have an account? Click here to make one!</u></p>
            </Form>
        </AuthContainer>
    )
}

export default Login