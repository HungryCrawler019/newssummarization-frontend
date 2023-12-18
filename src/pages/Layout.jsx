import { Backdrop, Box, CircularProgress } from '@mui/material'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import { useMyContext } from '../context'
import ProtectedRoute from '../routes/ProtectedRoute'

const Layout = () => {
  const { isLoading } = useMyContext();

  return (
    <Box>
      <ProtectedRoute>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <Header />
        <Box pt={10} px={10}>
          <Outlet />
        </Box>
        </ProtectedRoute>
    </Box>
  )
}

export default Layout