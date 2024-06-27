import { useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'

function App() {
  useEffect(() => {
    toast.success('Hello');
  }, []);

  return (
    <div>
      <h1>Hello world!</h1>
      <Toaster /> {/* Ensure Toaster is included in the component tree */}
    </div>
  )
}

export default App
