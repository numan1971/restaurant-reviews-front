import React, { useContext, useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
// import Loading from '../../../Shared/Loading/Loading';
import swal from "sweetalert";
// import toast from 'react-hot-toast';
import useUserData from '../../../../hooks/useUserData'
import MyRestaurantsRow from './MyRestaurantsRow';

const MyRestaurants = () => {
  const [user] = useAuthState(auth);
  const { displayName, email } = user;
  const [userData] = useUserData(user)
  const [darkMode, setDarkMode] = useState(false);

const handleDelete = email => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
        fetch(
          `http://localhost:5000/api/v1/deleteMyRestaurants?email=${email}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.message) {
                swal("Your file has been deleted!", {
                    icon: "success",
                  });
              // refetch()
            }
          })
        
      }})}
      const [MyRestaurants, setMyRestaurants] = useState()
      useEffect(()=>{
        fetch(
          `http://localhost:5000/api/v1/get-my-restaurants?email=${email}`
        ).then((res) => res.json()).then(data => setMyRestaurants(data.restaurants))
      },[])

  // if (isLoading) return <Loading></Loading>;


  return (
    <div className="lg:px-4 px-2 pb-5">
      <div className="flex justify-between items-center align-middle">
        <div>
          <button
            className="btn btn-sm  btn-warning"
            // onClick={() => handleDelete(email)}
          >
            delete all
          </button>
        </div>
        <h2 className={`${"text-white"} text-2xl py-4 text-center`}>
          Recomended Restaurants List For Me: {MyRestaurants?.length}
        </h2>
        <div className="flex space-x-4">
          {/* <!--search bar --> */}
          <div hidden className="md:block">
            <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
              <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                <svg
                  xmlns="http://ww50w3.org/2000/svg"
                  className="w-4 fill-current"
                  viewBox="0 0 35.997 36.004"
                >
                  <path
                    id="Icon_awesome-search"
                    data-name="search"
                    d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                  ></path>
                </svg>
              </span>
              <input
                type="search"
                name="leadingIcon"
                id="leadingIcon"
                placeholder="Search here"
                className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
              />
            </div>
          </div>
          {/* <!--/search bar --> */}
          <button
            aria-label="search"
            className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden"
          >
            <svg
              xmlns="http://ww50w3.org/2000/svg"
              className="w-4 mx-auto fill-current text-gray-600"
              viewBox="0 0 35.997 36.004"
            >
              <path
                id="Icon_awesome-search"
                data-name="search"
                d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          className={`text-gray-400 w-full text-sm text-left`}
        >
          <thead
            className={`bg-gray-700 text-gray-400 text-xs uppercase`}
          >
            <tr className="">
              <th></th>
              <th>image</th>
              <th className=" py-2">quizName</th>
              <th>type</th>
              <th>total questions</th>
              <th>Total Submission</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            { MyRestaurants?.length
              ?
            <>
            {MyRestaurants
              ?.map((quiz, index) => (
                <MyRestaurantsRow
                  index={index}
                  key={quiz._id}
                  quiz={quiz}
                ></MyRestaurantsRow>
              ))}
            </>
            :
            <h1 className="text-center mx-auto text-secondary text-2xl my-2">hello <span className="text-success">{user?.displayName}!!</span> Sorry, no restaurant were found for you.</h1>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRestaurants;