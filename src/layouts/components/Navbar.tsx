import { useEffect, useState } from 'react'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'products', 'about', 'features', 'cta']
      let current = 'home'

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            current = section
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#products', label: 'Productos', id: 'products' },
    { href: '#about', label: 'Nuestra Historia', id: 'about' },
    { href: '#features', label: 'Servicios', id: 'features' },
  ]

  return (
    <nav className="bg-background/80 sticky top-0 z-50 flex w-full items-center justify-between border-b px-6 py-4 shadow-xs backdrop-blur-lg md:px-12">
      <a
        href="/"
        className="text-primary flex items-center gap-2 transition-opacity hover:opacity-80"
      >
        {/*<img src="/favicon.png" alt="Logo" className="h-22 w-22" />*/}
        <span className="font-heading text-foreground text-2xl font-bold">
          Mininos Café
        </span>
      </a>

      {/* Desktop Nav */}
      <div className="hidden items-center gap-8 font-medium md:flex">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            data-testid={`link-${link.id}`}
            className={`relative w-fit transition-colors ${
              activeSection === link.id
                ? 'text-primary font-bold'
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <div>
              {link.label}
              {activeSection === link.id && (
                <div className="bg-primary absolute right-0 bottom-0 left-0 h-1 rounded-full" />
              )}
            </div>
          </a>
        ))}
        <a href="/join">
          <button
            data-testid="button-join-nav"
            className="font-heading cta-btn font-medium"
          >
            Contáctanos
          </button>
        </a>
      </div>

      {/* Mobile Nav Toggle */}
      <button
        className="text-foreground bg-primary/10 hover:bg-primary/25 rounded-full p-2 transition-colors md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-menu-toggle"
      >
        {isOpen ? 'X' : '='}
      </button>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div
          key="mobile-menu"
          className="bg-card border-border/60 absolute top-full right-4 left-4 z-50 mt-2 flex w-[calc(100%-2rem)] flex-col gap-6 rounded-2xl border p-8 shadow-2xl md:hidden"
        >
          {navLinks.map((link, idx) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsOpen(false)}
              data-testid={`link-${link.id}-mobile`}
              className={`w-fit text-center text-lg font-medium transition-colors duration-300 ${
                activeSection === link.id
                  ? 'text-primary font-bold'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="border-border/40 border-t pt-6">
            <a
              href="/join"
              className="block w-full"
              onClick={() => setIsOpen(false)}
            >
              <div>
                <button
                  data-testid="button-join-mobile"
                  className="cta-btn font-heading w-full font-medium"
                >
                  Contáctanos
                </button>
              </div>
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
