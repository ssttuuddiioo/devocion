'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setMessage('')
    setEmail('')
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg border-2 border-black shadow-sm p-8">
          <h1 className="text-3xl font-bold text-black mb-6 uppercase">
            Contact Us
          </h1>

          {isSubmitted ? (
            <div className="text-center py-8">
              <p className="text-black font-mono mb-4">
                Thank you for your message. We'll get back to you soon.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-colors font-bold uppercase font-mono text-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-black mb-2 uppercase font-mono"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg bg-white text-black font-mono focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  placeholder="Enter your message..."
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-black mb-2 uppercase font-mono"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-lg bg-white text-black font-mono focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors font-bold uppercase font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

