import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function login(e){
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        });

        if(response.ok){
            const user = await response.json();
            localStorage.setItem("user",JSON.stringify(user));
            navigate("/admin");
        }else{
            alert("Login mislukt");
        }
    }

    return(
        <form onSubmit={login}>
            <h1>Login</h1>
            <input
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button>Login</button>
        </form>
    )
}