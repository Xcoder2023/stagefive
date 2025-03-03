"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { message } from 'antd';
// import ProfileDetails from "@/components/ProfileDetails";

const Login = () => {
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation logic here
    const emailError = email.trim() === '';
    const passwordError = password.trim() === '';
  
    setIsError(emailError || passwordError);
    if (emailError) {
      message.error('Email is required.');
    }
    if (passwordError) {
      message.error('Password is required.');
    }
  
    if (!emailError && !passwordError) {
      try {
        const response = await axios.post('https://devlinkdb-1.onrender.com/api/v1/users/login', {
          email,
          password,
        });
        console.log('Login successful:', response.data);
        
        // Show success message
        message.success('Login successful!');
        
        // Navigate to the profile page
        window.location.href = "/profile";
      } catch (error: any) {
        // Show error message
        message.error('Login failed. Please check your email and password and try again.');
        console.error('Login error:', error.response ? error.response.data : error.message);
      }
    }
  };
  

	return (
		<div
			className="h-screen flex justify-center items-center"
			style={{ fontFamily: "instrument sans" }}
		>
			<div className="flex flex-col  gap-[51px] w-[476px]">
				<div className="flex justify-center items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="41"
						height="40"
						viewBox="0 0 41 40"
						fill="none"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M6.5235 34.2249C8.96683 36.6666 12.8935 36.6666 20.7502 36.6666C28.6068 36.6666 32.5352 36.6666 34.9752 34.2249C37.4168 31.7866 37.4168 27.8566 37.4168 19.9999C37.4168 12.1433 37.4168 8.21492 34.9752 5.77325C32.5368 3.33325 28.6068 3.33325 20.7502 3.33325C12.8935 3.33325 8.96516 3.33325 6.5235 5.77325C4.0835 8.21659 4.0835 12.1433 4.0835 19.9999C4.0835 27.8566 4.0835 31.7849 6.5235 34.2249ZM16.5835 14.5833C15.5122 14.5833 14.4649 14.9009 13.5742 15.4961C12.6834 16.0913 11.9891 16.9373 11.5791 17.927C11.1692 18.9168 11.0619 20.0059 11.2709 21.0567C11.4799 22.1074 11.9958 23.0725 12.7533 23.8301C13.5109 24.5876 14.476 25.1035 15.5268 25.3125C16.5775 25.5215 17.6666 25.4142 18.6564 25.0043C19.6461 24.5943 20.4921 23.9 21.0873 23.0093C21.6825 22.1185 22.0002 21.0712 22.0002 19.9999C22.0002 19.6684 22.1319 19.3505 22.3663 19.116C22.6007 18.8816 22.9186 18.7499 23.2502 18.7499C23.5817 18.7499 23.8996 18.8816 24.134 19.116C24.3685 19.3505 24.5002 19.6684 24.5002 19.9999C24.5002 21.5657 24.0359 23.0963 23.166 24.3982C22.2961 25.7001 21.0597 26.7148 19.6131 27.314C18.1665 27.9132 16.5747 28.0699 15.039 27.7645C13.5033 27.459 12.0927 26.705 10.9856 25.5978C9.8784 24.4907 9.12441 23.0801 8.81895 21.5444C8.51348 20.0087 8.67026 18.4169 9.26945 16.9703C9.86864 15.5238 10.8833 14.2873 12.1852 13.4174C13.4871 12.5476 15.0177 12.0833 16.5835 12.0833C16.915 12.0833 17.233 12.2149 17.4674 12.4494C17.7018 12.6838 17.8335 13.0017 17.8335 13.3333C17.8335 13.6648 17.7018 13.9827 17.4674 14.2171C17.233 14.4516 16.915 14.5833 16.5835 14.5833ZM30.3335 19.9999C30.3335 21.4365 29.7628 22.8143 28.747 23.8301C27.7312 24.8459 26.3534 25.4166 24.9168 25.4166C24.5853 25.4166 24.2674 25.5483 24.0329 25.7827C23.7985 26.0171 23.6668 26.3351 23.6668 26.6666C23.6668 26.9981 23.7985 27.316 24.0329 27.5505C24.2674 27.7849 24.5853 27.9166 24.9168 27.9166C26.4826 27.9166 28.0132 27.4523 29.3151 26.5824C30.617 25.7125 31.6317 24.4761 32.2309 23.0295C32.8301 21.5829 32.9868 19.9911 32.6814 18.4555C32.3759 16.9198 31.6219 15.5092 30.5148 14.402C29.4076 13.2948 27.997 12.5408 26.4613 12.2354C24.9256 11.9299 23.3338 12.0867 21.8873 12.6859C20.4407 13.2851 19.2043 14.2998 18.3344 15.6017C17.4645 16.9035 17.0002 18.4341 17.0002 19.9999C17.0002 20.3314 17.1319 20.6494 17.3663 20.8838C17.6007 21.1182 17.9186 21.2499 18.2502 21.2499C18.5817 21.2499 18.8996 21.1182 19.134 20.8838C19.3685 20.6494 19.5002 20.3314 19.5002 19.9999C19.5002 18.5633 20.0708 17.1856 21.0867 16.1698C22.1025 15.1539 23.4802 14.5833 24.9168 14.5833C26.3534 14.5833 27.7312 15.1539 28.747 16.1698C29.7628 17.1856 30.3335 18.5633 30.3335 19.9999Z"
							fill="#633CFF"
						/>
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="136"
						height="27"
						viewBox="0 0 136 27"
						fill="none"
					>
						<path
							d="M13.9972 26.15V22.195L14.3435 22.265C14.1126 23.5483 13.4201 24.575 12.2658 25.345C11.1346 26.115 9.77261 26.5 8.17974 26.5C6.56378 26.5 5.15559 26.1267 3.95516 25.38C2.77782 24.61 1.86596 23.5367 1.21957 22.16C0.573191 20.7833 0.25 19.1617 0.25 17.295C0.25 15.405 0.584734 13.76 1.2542 12.36C1.92367 10.96 2.85862 9.875 4.05904 9.105C5.28255 8.335 6.70229 7.95 8.31824 7.95C10.0035 7.95 11.3655 8.34666 12.4043 9.14C13.4662 9.93333 14.0895 11.0183 14.2742 12.395L13.8933 12.43V0.949999H19.0875V26.15H13.9972ZM9.84186 22.3C11.0654 22.3 12.058 21.8683 12.8198 21.005C13.5817 20.1183 13.9626 18.8583 13.9626 17.225C13.9626 15.5917 13.5701 14.3433 12.7852 13.48C12.0234 12.5933 11.0192 12.15 9.77261 12.15C8.57218 12.15 7.57952 12.5933 6.79463 13.48C6.03282 14.3667 5.65192 15.6267 5.65192 17.26C5.65192 18.8933 6.03282 20.1417 6.79463 21.005C7.57952 21.8683 8.59527 22.3 9.84186 22.3Z"
							fill="#333333"
						/>
						<path
							d="M31.551 26.5C29.5887 26.5 27.8804 26.115 26.4261 25.345C24.9717 24.5517 23.8405 23.455 23.0326 22.055C22.2477 20.655 21.8552 19.045 21.8552 17.225C21.8552 15.3817 22.2477 13.7717 23.0326 12.395C23.8405 10.995 24.9602 9.91 26.3915 9.14C27.8227 8.34666 29.4849 7.95 31.3778 7.95C33.2016 7.95 34.7829 8.32333 36.1218 9.07C37.4608 9.81667 38.4996 10.855 39.2383 12.185C39.977 13.515 40.3464 15.0783 40.3464 16.875C40.3464 17.2483 40.3349 17.5983 40.3118 17.925C40.2887 18.2283 40.2541 18.52 40.2079 18.8H24.9025V15.335H36.0179L35.1176 15.965C35.1176 14.5183 34.7713 13.4567 34.0788 12.78C33.4093 12.08 32.4859 11.73 31.3086 11.73C29.9466 11.73 28.8846 12.1967 28.1228 13.13C27.3841 14.0633 27.0147 15.4633 27.0147 17.33C27.0147 19.15 27.3841 20.5033 28.1228 21.39C28.8846 22.2767 30.0158 22.72 31.5163 22.72C32.3474 22.72 33.063 22.58 33.6633 22.3C34.2635 22.02 34.7136 21.565 35.0137 20.935H39.8962C39.3191 22.6617 38.3265 24.0267 36.9183 25.03C35.5332 26.01 33.7441 26.5 31.551 26.5Z"
							fill="#333333"
						/>
						<path
							d="M47.4302 26.15L40.47 8.3H46.0451L51.4816 24.96H48.5729L53.9748 8.3H59.4114L52.4512 26.15H47.4302Z"
							fill="#333333"
						/>
						<path d="M61.4187 26.15V0.949999H66.6128V26.15H61.4187Z" fill="#333333" />
						<path
							d="M70.7519 26.15V8.3H75.9461V26.15H70.7519ZM70.5788 5.92V0.25H76.1192V5.92H70.5788Z"
							fill="#333333"
						/>
						<path
							d="M80.0852 26.15V8.3H85.1754V12.5H85.2793V26.15H80.0852ZM92.378 26.15V15.09C92.378 14.11 92.124 13.375 91.6162 12.885C91.1314 12.395 90.4157 12.15 89.4693 12.15C88.6613 12.15 87.9341 12.3367 87.2877 12.71C86.6644 13.0833 86.1681 13.5967 85.7987 14.25C85.4524 14.9033 85.2793 15.6733 85.2793 16.56L84.8292 12.255C85.4063 10.9483 86.2489 9.91 87.357 9.14C88.4881 8.34666 89.8733 7.95 91.5123 7.95C93.4745 7.95 94.9751 8.51 96.0139 9.63C97.0527 10.7267 97.5721 12.2083 97.5721 14.075V26.15H92.378Z"
							fill="#333333"
						/>
						<path
							d="M101.525 26.15V0.949999H106.719V26.15H101.525ZM112.848 26.15L105.507 16.875L112.675 8.3H118.665L110.251 17.68L110.493 16.035L119.012 26.15H112.848Z"
							fill="#333333"
						/>
						<path
							d="M127.493 26.5C124.908 26.5 122.853 25.975 121.33 24.925C119.806 23.875 118.975 22.4283 118.836 20.585H123.477C123.592 21.3783 123.984 21.985 124.654 22.405C125.346 22.8017 126.293 23 127.493 23C128.578 23 129.363 22.8483 129.848 22.545C130.356 22.2183 130.61 21.7633 130.61 21.18C130.61 20.7367 130.46 20.3983 130.16 20.165C129.883 19.9083 129.363 19.6983 128.602 19.535L125.762 18.94C123.661 18.4967 122.115 17.8317 121.122 16.945C120.129 16.035 119.633 14.8683 119.633 13.445C119.633 11.7183 120.291 10.3767 121.607 9.42C122.923 8.44 124.758 7.95 127.113 7.95C129.444 7.95 131.302 8.42833 132.688 9.385C134.073 10.3183 134.834 11.625 134.973 13.305H130.333C130.241 12.6983 129.917 12.2433 129.363 11.94C128.809 11.6133 128.024 11.45 127.009 11.45C126.085 11.45 125.393 11.59 124.931 11.87C124.492 12.1267 124.273 12.5 124.273 12.99C124.273 13.41 124.458 13.7483 124.827 14.005C125.196 14.2383 125.808 14.4483 126.662 14.635L129.848 15.3C131.626 15.6733 132.965 16.3733 133.865 17.4C134.788 18.4033 135.25 19.5933 135.25 20.97C135.25 22.72 134.569 24.085 133.207 25.065C131.868 26.0217 129.964 26.5 127.493 26.5Z"
							fill="#333333"
						/>
					</svg>
				</div>
				<div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
					<div>
						<h2 className="text-[32px] font-bold text-[#333333]">Login</h2>
						<p className="text-[16px] text-[#737373]">
							Add your details below to get back into the app
						</p>
					</div>
					<form className="flex flex-col mt-8 space-y-6" onSubmit={handleLogin}>
      <div className="flex flex-col gap-5 rounded-md shadow-sm -space-y-px">
        <div className="relative">
          <label
            htmlFor="email-address"
            className={`text-[12px] ${isError ? 'text-red-600' : ''}`}
          >
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            placeholder="e.g. alex@email.com"
            className={`block w-full px-3 py-2 pl-10 border rounded-md outline-none ${
              isEmailFocused ? 'border border-[#633CFF] bg-white shadow-custom' : 'border-gray-300 bg-transparent'
            } ${isError ? 'border-red-600' : ''}`}
          />
          <span className="absolute inset-y-0 top-6 flex items-center pl-3">
            <Image src="/images/mail.png" alt="Email Icon" width={16} height={16} />
          </span>
          {isError && (
            <span className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-[#FF3939] text-[12px]">
              Can’t be empty
            </span>
          )}
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className={`text-[12px] ${isError ? 'text-[#FF3939]' : ''}`}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            placeholder="Enter your password"
            className={`block w-full px-3 py-2 pl-10 border rounded-md outline-none ${
              isPasswordFocused ? 'border-[#633CFF] bg-white shadow-custom' : 'border-gray-300 bg-transparent'
            } ${isError ? 'border-red-600' : ''}`}
          />
          <span className="absolute inset-y-0 left-0 top-6 flex items-center pl-3">
            <Image src="/images/keylock.png" alt="Password Icon" width={16} height={16} />
          </span>
          {isError && (
            <span className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-[#FF3939] text-[12px]">
              Please check again
            </span>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          onMouseOver={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className={`p-2 rounded-md ${
            isButtonHovered
              ? 'bg-purple-hover-color shadow-custom flex justify-center gap-10 w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md'
              : 'bg-[#633CFF] btn flex justify-center gap-10 w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md'
          }`}
        >
          Login
        </button>
      </div>
    </form>
					<div className="text-center text-sm text-gray-600">
						<p>
							Don’t have an account?{" "}
							<Link
								href="/register"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Create account
							</Link>
						</p>
					</div>
				</div>
			</div>
      {/* <ProfileDetails/> */}
		</div>
	);
};

export default Login;
