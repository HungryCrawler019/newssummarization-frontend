import { Navigate } from "react-router-dom";
import { useMyContext } from "../../context";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useMyContext();

    console.log('ZZZZZZZZZZZZZZZZZZZZZZ isAuthenticated: ', isAuthenticated);
    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" />;
    } else {
        return children;
    }

};
export default ProtectedRoute;
