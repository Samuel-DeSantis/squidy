function Navbar() {
  return (
    <nav>
      <a href="/" className="nav-brand">SQUIDY</a>
      <div className="nav-links">
        <a href="/about" className="nav-link">ABOUT</a>
        <a href="/contact" className="nav-link">CONTACT</a>
        <a href="/signin" className="nav-link">SIGN IN</a>
      </div>
    </nav>
  )
}

export default Navbar