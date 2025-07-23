export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} PomoTodo. Built with ❤️ for productivity.</p>
        <div className="footer-links">
          <a href="https://github.com/mofodox" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="separator">•</span>
          <a href="https://twitter.com/mofodox" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}