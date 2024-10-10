import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function SignUp() {
  const params = useParams()
  const navigate = useNavigate()
  const [isNew, setIsNew] = useState(true)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
  })

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined
      if (!id) return
      setIsNew(false)

      const response = await fetch(
        `http://localhost:8080/user/${params.id.toString()}`
      )

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`
        console.error(message)
        return
      }

      const record = await response.json()

      if (!record) {
        console.warn(`Record with id ${id} not found.`)
        navigate('/')
        return
      }
      
      setForm(record)
    }
    fetchData()
    return
  }, [params.id, navigate])

  function updateForm(value) {
    return setForm(prev => {
      return {...prev, ...value}
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    const user = {...form}
    console.log(user)
    try {
      let response
      if(isNew) {
        response = await fetch('http://localhost:8080/user/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
      } else {
        response = await fetch(`http://localhost:8080/user/${params.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}.`)
      }
    } catch (error) {
      console.error('A problem occured with your fetch operation: ', error)
    } finally {
      setForm({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
      })
      navigate('/')
    }
  }

  return (
    <>
      <div className="form-container">
        <div className="form-wrapper">
          <h2>Sign Up</h2>
          <form onSubmit={ onSubmit }>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input 
                type="text"
                name="first_name"
                placeholder="First Name"
                value={ form.first_name }
                onChange={ e => updateForm({ first_name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="first_name">Last Name</label>
              <input 
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={ form.last_name }
                onChange={ e => updateForm({ last_name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text"
                name="username"
                placeholder="johndoe"
                value={ form.username }
                onChange={ e => updateForm({ username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email"
                name="email"
                placeholder="john@email.com"
                value={ form.email }
                onChange={ e => updateForm({ email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel"
                name="phone"
                placeholder="123-456-7890"
                value={ form.phone }
                onChange={ e => updateForm({ phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                name="password"
                placeholder="********"
                value={ form.password }
                onChange={ e => updateForm({ password: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input 
                type="submit"
                value='Sign Up'
              />
            </div>
          </form>
        </div>
      </div>
      <a href="/signin">Sign In</a>
    </>
  )
}

export default SignUp