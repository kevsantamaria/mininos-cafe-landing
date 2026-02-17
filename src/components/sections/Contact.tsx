import { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && message) {
      const messages = JSON.parse(
        localStorage.getItem('contactMessages') || '[]'
      )
      messages.push({ name, email, message, date: new Date().toISOString() })
      localStorage.setItem('contactMessages', JSON.stringify(messages))
      setSubmitted(true)
      setName('')
      setEmail('')
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen py-8" data-aos="fade-up">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
              Contáctanos
            </h1>
            <p className="text-muted-foreground text-lg">
              Estamos aquí para responder tus preguntas. Envíanos un mensaje y
              nos pondremos en contacto contigo pronto.
            </p>
          </div>

          <div className="bg-card rounded-4xl border-none shadow-lg">
            <div className="p-8 md:p-12">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-bold">
                      Nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      data-testid="input-contact-name"
                      className="border-border focus:border-primary w-full rounded-lg border-2 bg-white px-4 py-3 transition-colors focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-contact-email"
                      className="border-border focus:border-primary w-full rounded-lg border-2 bg-white px-4 py-3 transition-colors focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-bold">
                      Mensaje
                    </label>
                    <textarea
                      placeholder="Escribe tu mensaje aquí..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      data-testid="textarea-contact-message"
                      rows={5}
                      className="border-border focus:border-primary w-full resize-none rounded-lg border-2 bg-white px-4 py-3 transition-colors focus:outline-none"
                    />
                  </div>

                  <button
                    data-testid="button-contact-submit"
                    type="submit"
                    className="cta-btn w-full font-bold"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    Heart
                  </div>
                  <h2 className="font-heading text-foreground text-2xl font-bold">
                    Gracias!
                  </h2>
                  <p className="text-muted-foreground">
                    Hemos recibido tu mensaje. Gracias por elegir Mininos Café.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
