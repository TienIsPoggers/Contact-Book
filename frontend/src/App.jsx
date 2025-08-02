import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import CreatePage from './pages/CreatePage'
import Navbar from './Layout/Navbar'
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/contact/:id" element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default App
