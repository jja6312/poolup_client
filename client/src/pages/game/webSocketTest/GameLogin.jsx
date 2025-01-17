import React, { useState } from 'react';
import { temporaryLogin } from './api/temporaryLogin';

const GameLogin = ({ isLogin, setIsLogin, setMember }) => {

    const [loginDTO, setLoginDTO] = useState({
        email: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginDTO({
            ...loginDTO,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const memberResponse = await temporaryLogin(loginDTO.email);
            console.log('로그인 성공:', memberResponse);
            setMember(memberResponse);
            setIsLogin(true);
        } catch (error) {
            console.error('로그인 실패:', error);
            setIsLogin(false);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center p-20 w-[100vw] h-[100vh]'>
            <form className="w-1/2 flex flex-col"
            onSubmit={(e)=>{handleLogin(e)}} 
                >
                <input 
                    className='border-2 border-gray-200 p-2 rounded mb-4'
                    type="text" 
                    name="email" 
                    value={loginDTO.email} 
                    onChange={handleInputChange} 
                    placeholder="이메일 입력" 
                />

                <button 
                    type="submit" 
                    className="h-16 font-bold bg-purple-400 text-white py-2 rounded transition-all duration-200 hover:opacity-80 hover:text-2xl"
                >
                    임시 접속🐶
                </button>
            </form>
        </div>
    );
};

export default GameLogin;