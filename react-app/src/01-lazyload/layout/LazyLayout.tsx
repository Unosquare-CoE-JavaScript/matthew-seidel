import React from 'react'
import {NavLink, Routes, Route, Navigate} from 'react-router-dom'
import { LazyPage1, LazyPage2, LazyPage3 } from '../pages'

export const LazyLayout = () => {
  return (
    <div>
        <h1>LazyLayout Page</h1>
        {/* child routes are here */}
        <ul>
            <li>
                <NavLink to="lazy1">No lazy load</NavLink>
            </li>
            <li>
                <NavLink to="lazy2">again</NavLink>
            </li>
            <li>
                <NavLink to="lazy3">onces more</NavLink>
            </li>
        </ul>
        <Routes>
            <Route path="/lazy1" element={<LazyPage1 />} />
            <Route path="/lazy2" element={<LazyPage2 />} />
            <Route path="/lazy3" element={<LazyPage3 />} />
            
            {/* not found */}
            <Route path="*" element={<Navigate to="lazy1" replace />} />
        </Routes>
    </div>
    )
}
export default LazyLayout
