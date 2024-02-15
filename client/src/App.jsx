import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Coderoom from './pages/Coderoom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/room/:roomId',
    element: <Coderoom />
  }
])

function App() {

  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 3

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (    
      <div className='flex h-screen w-screen bg-[url("./assets/subtle-prism-bg.svg")]'>
        <div>
          <Toaster position='top-center'/>
        </div>
        <RouterProvider router={router} />      
      </div>
    
  )
}

export default App
