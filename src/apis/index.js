
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getContentText = async (pdf) => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
            return;
        }

        const formData = new FormData();
        formData.append('file', pdf);
        const response = await fetch(`${API_URL}/api/get-content`, {
            body: formData,
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const json = await response.json();
        return json;
    } catch (error) {
        console.log({ error })
    }
}

export const getSummarization = async (payload) => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
            return;
        }

        const formData = new FormData();
        formData.append('text', payload.text);
        formData.append('type', payload.type);
        formData.append('length_type', payload.length_type);
        const response = await fetch(`${API_URL}/api/summarize`, {  
            body: formData,
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const json = await response.json();
        return json;
    } catch (error) {
        console.log({ error })
    }
}

export const getSummaries = async (payload) => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
            return;
        }

        const response = await fetch(`${API_URL}/api/get_summaries`, {  
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const json = await response.json();
        return json;
    } catch (error) {
        console.log({ error })
    }
}

export const getNews = async (payload) => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
            return;
        }

        const response = await fetch(`${API_URL}/api/get_news`, {  
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const json = await response.json();
        return json;
    } catch (error) {
        console.log({ error })
    }
}

export const getLanguages = async (payload) => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
            return;
        }

        const formData = new FormData();
        formData.append('text', payload);
        const response = await fetch(`${API_URL}/api/detect-language`, {
            body: formData,
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const json = await response.json();
        return json;
    } catch (error) {
        console.log({ error })
    }
}

export const translateText = async (payload) => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
            return;
        }

        const formData = new FormData();
        formData.append('text', payload.text);
        formData.append('language', payload.language);
        const response = await fetch(`${API_URL}/api/translate`, {
            body: formData,
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const json = await response.json();
        return json;
    } catch (error) {
        console.log({ error })
    }
}

export const sendMail = async (payload) => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
            return;
        }

        const formData = new FormData();
        formData.append('text', payload.text);
        formData.append('to_email', payload.email);
        const response = await fetch(`${API_URL}/api/send-mail`, {
            body: formData,
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const json = await response.json();
        return json;
    } catch (error) {
        console.log({ error })
    }
}

export const logout = () => {
    localStorage.removeItem('token');
}