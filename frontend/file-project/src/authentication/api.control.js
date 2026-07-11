import axios from "axios";


let api = axios.create({
  baseURL: "https://ai-built-project-1.onrender.com",
  withCredentials: true,
});
// signup purpose

export async function signup({email,name,password}){
    try {
        const response=await api.post("api/auth/register",{email,name,password})
        // Return backend data so the hook can show the success message in toast.
        return response.data
    } catch (error) {
        console.log(error.message);
        // Throw the error again so the hook can catch it and show error toast.
        throw error
    }
}
// login page

export async function Login({email,password}){
    try {
        const response=await api.post("api/auth/login",{email,password})
        // Return user and message after successful login.
        return response.data
        console.log(response.data);
        
    } catch (error) {
        console.log(error.message);
        // Throw the error again so login page does not redirect on failed login.
        throw error
    }
}





// logout
export async function Logout(){
    try {
        const response=await api.get("api/auth/logout")
        // Return logout message so we can show it with toast.
        return response.data
    } catch (error) {
        console.log(error.message);
        // Throw the error again so logout errors can also be displayed.
        throw error
    }
}

// user
export async function userMe(){
try {
    const response=await api.get("api/auth/user")
    console.log(response?.data);
    return response.data
} catch (error) {
    throw error
    
}
}

// This sends resume as multipart/form-data to the interview backend endpoint.
export async function generateInterview({resume,selfDescription,jobDescription}){
    try {
        const formData=new FormData()
        formData.append("resume",resume)
        formData.append("selfDescription",selfDescription)
        formData.append("jobDescription",jobDescription)
        const response=await api.post("api/interview",formData)
        return response.data
    } catch (error) {
        console.log(error.message);
        // Throw error again so the page/hook can show the backend message.
        throw error
    }
}
