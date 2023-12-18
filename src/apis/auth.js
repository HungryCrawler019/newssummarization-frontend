import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (payload) => {
    try {
        const { username, email, password, confirmPassword } = payload;
        const response = await fetch(`${API_URL}/auth/sign-up`, {  
            body: JSON.stringify({
                username,
                email,
                password,
                confirm_password: confirmPassword
            }),
            method: 'POST',
            headers: {
                "Content-Type": "Application/json"
            }
        })
        const json = await response.json();
        return json;
    } catch (error) {
        console.log({ error })
    }
}

export const signIn = async (payload) => {
    try {
        const response = await fetch(`${API_URL}/auth/sign-in`, {  
            body: JSON.stringify(payload),
            method: 'POST',
            headers: {
                "Content-Type": "Application/json"
            }
        })
        const json = await response.json();
        if(json.access_token) {
            localStorage.setItem('token', json.access_token);
        }
        return json;
    } catch (error) {
        console.log({ error })
    }
}

export const getMe = async () => {
    try {
        const token = localStorage.getItem('token');
        if(!token) return false;

        const response = await fetch(`${API_URL}/auth/get-me`, {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const json = await response.json();
        if(json?.detail){
            toast.error(json.detail);
            localStorage.removeItem('token');
            return false;
        }
        return json;
    } catch (error) {
        console.log({ error })
    }
}