import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Router from './Components/Router/router.jsx'
import './index.css'
import AuthProvider from './Components/Provider/AuthProvider.jsx'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <DndProvider backend={HTML5Backend}>

    <AuthProvider>
     <RouterProvider router={Router}></RouterProvider>
    </AuthProvider>
      </DndProvider>
  </React.StrictMode>,
)
