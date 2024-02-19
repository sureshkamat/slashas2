import React from 'react'
import {Route,Routes} from 'react-router-dom'
import { Home } from './Home'
import { Favorites } from './Favorites'
export const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/favorite' element={<Favorites />} />
        </Routes>
    </div>
  )
}
