import { useState } from 'react'
import { authenticate } from '../api'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [credentialsError, setCredentialsError] = useState('')

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        
        try {
            const { access_token: token } = await authenticate({ username, password })
            localStorage.setItem('token', token)
            history.push('/cases')
        } catch (error) {
            setCredentialsError('wrong-credentials')
         }
         
    }

    return (
        <div className="wrapper">
            <div id="formContent">
                <form id="signInForm" onSubmit={handleSubmit}>
                    <input id="username" value={username} onChange={(event) => { setUsername(event.target.value); setCredentialsError('') }} type="text" name="email" placeholder="Email"  required/>
                    <input id="password" value={password} onChange={(event) => { setPassword(event.target.value); setCredentialsError('') }} type="password" name="password" placeholder="Password" required />
                    <div>{credentialsError === 'wrong-credentials' && <label className="validation-message">Wrong username or password. Or mayhaps the server is at fault.</label>}</div>
                    <input type="submit" value="Sign In" />
                </form>
            </div>
        </div>
    )
}

export default Login
