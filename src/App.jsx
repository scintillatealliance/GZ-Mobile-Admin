import { useState } from 'react'
import './index.css'
import Layout from './Layout'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Routes } from "react-router-dom";
import CreateUserPage from './pages/CreateUserPage';
import BoothManagment from './pages/BoothManagment';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/Login';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<CreateUserPage />} />
      <Route path='login' element={<Login />} />
      <Route path="booth" element={<BoothManagment />} />
    </Route>
  )
)

const queryClient = new QueryClient()

function App() {

  return (
    <div className='w-full h-screen font-public'>
       <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
       </QueryClientProvider>
    </div>
  )
}

export default App
