import { Button, Col, Form, FormGroup, Row } from "react-bootstrap"
import AuthContainer from "../AuthContainer/AuthContainer"
import { useState } from "react"
import { useNavigate } from "react-router"
import useFetch from "../../../hooks/useFetch/useFetch"
import { useContext } from "react"
import { AuthContext } from "../../../services/authContext/AuthContext"
import { toast } from "react-toastify"

const Login = () => {

    const [errors, setErrors] = useState({})
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const {post} = useFetch()
    const {onLogin} = useContext(AuthContext)


    const validations = () => {
    const errors = {}
    const expresionRegularMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!email.length) errors.email = "Email is required"
    else if(!expresionRegularMail.test(email)) errors.email = "Enter a valid email"

    if(!password.length) errors.password = "Password is required"
    setErrors(errors)
    return(errors)
    }

    const handleClickRegister = () => { 
        navigate('/register')
    }


    const handleChangeInput = (e) => {
        const {name, value} = e.target
        switch(name) {
            case "email":
                setEmail(value)
                break
            case "password":
                setPassword(value)
                break
        }
    }

    const onSuccessSubmit = (res) => {
        onLogin(res)
        navigate("/home")
    }

    const onErrorSubmit = (e) => {
        const {message} = e
        const fields = ["email", "password"]
        const errors = {}
        fields.forEach(field=>{
        if (message.includes(field.toLowerCase())){
            errors[field] = message
        } })
        console.log(Object.keys(errors))
        if (Object.keys(errors).length!==0){
        setErrors(errors)
        } else{
        toast(message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validations()){
            post("login", false,
                {
                    email,
                    password
                },
                onSuccessSubmit,
                onErrorSubmit
            )
        }

    }


    return(
        <AuthContainer>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-5">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChangeInput} value={email} placeholder="JuanCarlosEjemplo@gmail.com" />
                    <Form.Text>
                        {errors.email}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-5">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChangeInput} value={password} />
                    <Form.Text>
                        {errors.password}
                    </Form.Text>
                </Form.Group>
                <Button type="submit" className="mb-5">Log in</Button>
                <p onClick={handleClickRegister} className="text-muted"  style={{cursor:"pointer"}}><u>Dont have an account? Click here to make one!</u></p>
            </Form>
        </AuthContainer>
    )
}

export default Login