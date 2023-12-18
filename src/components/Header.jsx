import { Box, Button, Typography } from "@mui/material"
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from "../apis"

export const Header = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate('/login');
  }
  return (
    <nav>
      <Box  position="fixed" py={2} width="100%" bgcolor="#F0F0F0" zIndex={10} >
        <Box px={10} display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={4} >
              <Typography fontSize="20px">
                <NavLink to='/'>News</NavLink>
              </Typography>
              <Typography fontSize="20px">
                <NavLink to='/scholarly'>Scholarly</NavLink>
              </Typography>
              <Typography fontSize="20px">
                <NavLink to='/judgements'>Judgements</NavLink>
              </Typography>
              <Typography fontSize="20px">
                <NavLink to='/summaries'>Summaries</NavLink>
              </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="error"
              onClick={logoutUser}
            >Logout</Button>
          </Box>
        </Box>
      </Box>
    </nav>
  )
}
