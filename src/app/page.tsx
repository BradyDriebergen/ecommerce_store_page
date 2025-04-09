import Products from './products'

export default function Home() {
  return (
    <div>
      <Header />
      <Products />
      <Footer />
    </div>
  )
}

function Header() {
  return (
      <header className="header">
          <div className="header-container">
              <h1 className="logo">Ecommerce</h1>
              <nav className="nav">
                  <ul className="nav-list">
                      <li><a href="#" className="nav-link">Shop</a></li>
                      <li><a href="#" className="nav-link">Stories</a></li>
                      <li><a href="#" className="nav-link">About</a></li>
                  </ul>
              </nav>
              <div className="header-actions">
                  <input type="text" placeholder="Search" className="search-bar" />
                  <a href="#" className="cart-link">🛒 3</a>
                  <a href="#" className="login-link">Login</a>
              </div>
          </div>
      </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-logo">Ecommerce</p>
        <nav className="footer-nav">
          <ul className="footer-nav-list">
            <li><a href="#" className="footer-nav-link">Privacy Policy</a></li>
            <li><a href="#" className="footer-nav-link">Terms of Service</a></li>
            <li><a href="#" className="footer-nav-link">Contact Us</a></li>
          </ul>
        </nav>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Ecommerce. All rights reserved.</p>
      </div>
    </footer>
  );
}