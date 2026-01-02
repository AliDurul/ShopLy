'use client';
import { LogIn, LogOut } from 'lucide-react';
import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { LoginModal } from './LoginModal';

export default function HeaderAuthBtns() {
    const [isLogin, setIsLogin] = useState(false)
    return (
        <>
            {
                isLogin ? (
                    <button onClick={() => setIsLogin(false)} className='flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors'>
                        <LogOut size={22} />
                        <span className='text-sm font-medium'>Logout</span>
                    </button>
                ) : (
                    <LoginModal>
                        <button className='flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors'>
                            <LogIn size={22} />
                            <span className='text-sm font-medium'>Login / Register</span>
                        </button>
                    </LoginModal>
                )
            }
        </>
    )
}
