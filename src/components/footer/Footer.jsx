const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>&copy; DK 2024 | By Didik Kurniawan</p>
        <p className="flex gap-4 justify-center items-center">
          <a href="https://www.linkedin.com/in/didik2584/">
            <img src="assets/icons/linkedin-color-svgrepo-com.svg" alt="LinkedIn" className="w-6 h-6" />
          </a>
          <a href="https://github.com/Didikkurniawan3">
            <img src="assets/icons/github-svgrepo-com.svg" alt="GitHub" className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/didikkurniawan03/">
            <img src="assets/icons/instagram-1-svgrepo-com.svg" alt="Instagram" className="w-6 h-6" />
          </a>
        </p>
      </aside>
    </footer>
  )
}

export default Footer
