import React, { lazy } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
const HomePage = lazy(() => import('./pages/Home'));
const User = lazy(() => import('./pages/User'));
const Album = lazy(() => import('./pages/Album'));

function App() {
  return (
    <>
      <div className='bg-gray-700 py-4'>
        <h2 className='text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600'>ALBUM VIEWER</h2>
      </div>
      <div className="flex item-center justify-center text-center">
        <Router>
          <Routes>
            <Route path='/' element={<React.Suspense fallback={<div className='mt-16 text-lg font-bold'>Loading...</div>}><HomePage /></React.Suspense>} />
            <Route path='/user/:userId' element={<React.Suspense fallback={<div className='mt-16 text-lg font-bold'>Loading...</div>}><User /></React.Suspense>} />
            <Route path='/album/:albumId' element={<React.Suspense fallback={<div className='mt-16 text-lg font-bold'>Loading...</div>}><Album /></React.Suspense>} />
          </Routes>
        </Router>
      </div>
    </>
   
  );
}

export default App;