'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import router for redirection
import '/public/css/caretaker.css';
import Cookies from 'js-cookie';


export default function CaretakerLoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const router = useRouter(); // Initialize router

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://adoption-backed.vercel.app/caretaker/login', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Welcome back, ${data.user}!`);
                Cookies.set('auth_token',data.auth_token);
                Cookies.set('caretaker_id',data.id);
                router.push(`/caretaker/dashboard`); // Redirect to caretaker page with ID
            } else {
                const errorData = await response.json();
                setMessage(errorData.detail || 'Login failed!');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('An error occurred while logging in.');
        }
    };

    return (
        <>
        <div id='main'>
            <div className='header'>
                <img src="/images/paltu_logo_full.png" alt="" />
            </div>
            <div className='center'>
                <h1>
            Welcome <br />
            to a worl<span style={{color:"#fff9f2"}}>d</span> <br />
            where <br />
            <span style={{color:"#fff9f2"}}>p</span>eo<span style={{color:"#fff9f2"}}>p</span>le <br />
            actually <br />
            love animals <br />
            </h1>
            <div id='login'>
            <div className='form' >
                <h1 style={{fontFamily:"MoreSugar",color:"#54b1b1"}}>Login</h1>
                <h2 style={{fontFamily:"Alkarta",color:"black",marginLeft:"40%"}}>कीजिए...</h2>
            <div id='form'>
                        <form onSubmit={handleLogin}>

                                <input
                                    type="text"
                                    name="username"
                                    placeholder='Apka Username'
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required />
                            <br />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='Apka Password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required />
                            <br />
                            <div style={{display:"flex"}}>
                <button className='button' style={{border:"none",backgroundColor:"white"}} type="submit">Log In</button>
                <a href="/caretaker/signup"><p style={{color:'#54b1b1',marginLeft:"300%"}}>Signup</p></a>
                </div>
                        </form>
                </div>
                </div>
                                    </div>
            </div>
        </div>
        </>
    );
}
