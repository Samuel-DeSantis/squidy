import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

function SignIn() {
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
          <h2>Sign In</h2>
          <form onSubmit={ onSubmit }>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text"
                name="username"
                placeholder="johndoe"
                value={ form.name }
                onChange={ e => updateForm({ username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                name="password"
                placeholder="********"
                value={ form.name }
                onChange={ e => updateForm({ password: e.target.value })}
              />
            </div>
          </form>
        </div>
      </div>
      <a href="/signup">Sign Up</a>
    </>
  )
}

export default SignIn