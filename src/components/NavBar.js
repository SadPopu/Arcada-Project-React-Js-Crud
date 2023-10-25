import { Link } from "react-router-dom";

function NavBar() {
  const navStyles = {
    backgroundColor: '#555151',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '2',
  };
  
  const textStyle ={
    color: 'white',
  }

  return (
    <nav className="navbar navbar-expand-lg shadow" style={navStyles}>
      <div className="container">
        <Link className="navbar-brand" to="/" style={textStyle}>
          AP CRÉDITO
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item" >
              <Link className="nav-link active" to="/" style={textStyle}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="about-us" style={textStyle}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="contact-us" style={textStyle}>
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="authors" style={textStyle}>
                Authors
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="books"style={textStyle}>
                Books
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

}

export default NavBar;
