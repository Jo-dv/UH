import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import googleLogo from './img/googleLogo.png'
import kakaoLogo from './img/kakaoLogoB.png'
import naverLogo from './img/naverLogo.png'

const Login = () => {
  const navigate = useNavigate();
  const onClick = (path) => navigate(`/${path}`);

  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const [err, setErr] = useState({
    userId: '',
    password: '',
  });
  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.userId && !form.password){
      return setErr({
        userId: '아이디를 입력해주세요',
        password: '비밀번호를 입력해주세요',
      });
    }
    if (!form.userId) {
      setErr({ ...err,
        userId: '아이디를 입력해주세요',
        password: ''
      });
    } 
    if (!form.password) {
      setErr({
        ...err,
        userId: '',
        password: '비밀번호를 입력해주세요',
      });
    }
    if (!!form.userId && !!form.password){
      return setErr({
        userId: '',
        password: '',
      });
    }
  }
  return (
    <div className='bg-opacity-30 bg-black w-full h-screen p-5
    flex justify-center items-center z-10'>
      <form onSubmit={onSubmit} 
        className='bg-opacity-50 bg-black w-96 border-2 border-purple3
        flex flex-col justify-center items-center z-20 text-white'>
        <h2 className="font-['pixel'] text-7xl">로그인</h2>
        <input type="text" placeholder='UserName' 
          onChange={onChange}
          name="userId"
          value={form.userId}
          className="font-['pixel'] p-2 m-1 border-2 rounded border-purple5
          bg-input w-72"/>
        <p className="font-['pixel'] text-red-500 mb-1">{err.userId}</p>
        {/* {!err.userId && <p>{err.userId}</p>} */}

        <input type="password" placeholder='Password' 
          onChange={onChange}
          name="password"
          value={form.password}
          className="font-['pixel'] p-2 m-1 border-2 rounded border-purple5
          bg-opacity-25 bg-white w-72"/>
        <p className="font-['pixel'] text-red-500 mb-1">{err.password}</p>

        <button className="font-['pixel'] p-2 m-1 rounded w-72 bg-purple5">
          로그인</button>
          <h3 className="p-2 m-2">회원가입</h3>
          <h3 className="p-2 ">소셜로그인</h3>

          <div className='flex flex-row justify-around w-72'>
            <img src={googleLogo} alt="google Logo" />
            <img src={kakaoLogo} alt="google Logo" />
            <img src={naverLogo} alt="google Logo" />
          </div>

      </form>
    </div>
    )
}

export default Login;