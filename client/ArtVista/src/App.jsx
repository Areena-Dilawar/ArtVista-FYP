import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import CategoryPage from './pages/CategoryPage'
import '../src/Styles/HideScrollbar.css'
function App() {

  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/pottery' element={<CategoryPage/>}/>
          <Route path='/sculpture' element={<CategoryPage/>}/>
          <Route path='/painting' element={<CategoryPage/>}/>
          <Route path='/video&animation' element={<CategoryPage/>}/>
          <Route path='/architecture' element={<CategoryPage/>}/>
          {/* Add more routes as needed */}
        </Routes>
      </div>

    </>
  )
}

export default App