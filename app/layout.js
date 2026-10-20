import '@fontsource/mrs-saint-delafield/latin-400.css'
import '@fontsource-variable/archivo/standard.css'
import '@fontsource-variable/archivo/standard-italic.css'
import '@fontsource/eb-garamond/latin-400.css'
import '@fontsource/eb-garamond/latin-400-italic.css'
import '@fontsource/special-elite/latin-400.css'
import './globals.css'

export const metadata = {
  title: 'Divyesh Pawar · Software Engineer',
  description: 'Kitchener-based software engineer who turns ideas into systems: backend, full-stack and RAG/LLM work.',
}

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>
}
