import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Courses from './components/Courses'
import Teachers from './components/Teachers'
import Results from './components/Results'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { getSchool, slugFromLocation } from './schools'
import { SchoolContext } from './schools/SchoolContext'

function NotFound() {
  return (
    <main style={{ minHeight: '100svh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <p>Pagina nu a fost găsită.</p>
    </main>
  )
}

function App() {
  const slug = slugFromLocation()
  const school = getSchool(slug)

  useEffect(() => {
    if (!school) return
    document.title = school.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', school.meta.description)
  }, [school])

  // not listing the other schools here on purpose: each one only sees its own link
  if (!school) return <NotFound />

  return (
    <SchoolContext value={{ slug, school }}>
      <Header />
      <main>
        <Hero />
        <Courses />
        <Teachers />
        {school.results && <Results />}
        {school.reviews && <Reviews />}
        {school.gallery?.length ? <Gallery /> : null}
        <Contact />
      </main>
      <Footer />
    </SchoolContext>
  )
}

export default App
