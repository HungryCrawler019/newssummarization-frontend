import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { ContextProvider } from "./context"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <ContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </ContextProvider>  
  )
}

export default App
