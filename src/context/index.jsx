import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../apis/auth";

const MyContext = createContext({
    isLoading: false
})

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const res = await getMe();
        setIsAuthenticated(res ? true : false);
    }

    const handleIsLoading = (value) => {
        setIsLoading(value);
    }

    return (
        <MyContext.Provider value={{
            isLoading,
            handleIsLoading,
            isAuthenticated,
            setIsAuthenticated
        }}>
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => useContext(MyContext);