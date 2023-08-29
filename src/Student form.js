import axios from 'axios';
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function Studentform() {
  const [studentlist, setstudentlist] = useState([])
  const navigate =useNavigate()
  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    location: "",
    hobby: []
  })

  const locationoption = [
    {
      label: "chennai",
      value: "chennai"
    },
    {
      label: "bangalore",
      value: "bangalore"
    },
    {
      label: "kerala",
      value: "kerala"
    },
    {
      label: "hyderabad",
      value: "hyderabad"
    }
  ]
  const hobbyoption = [
    {
      label: "cooking",
      value: "cooking"
    },
    {
      label: "music",
      value: "music"
    },
    {
      label: "carom",
      value: "carom"
    },
    {
      label: "chess",
      value: "chess"
    }
  ]
  const handlechange = (e) => {
    setdata((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function checkpassword(str) {
    var re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(str);
  }
  function checkemail(str) {
    return /^\S+@\S+\.\S+$/.test(str);

  }


  const handlesubmit = () => {
    if (data.firstname === "") {
      return toast.error("enter your firstname")
    }
    if (data.firstname.length <= 5) {
      return toast.error("enter atleast 5 characters ")
    }
    if (data.lastname === "") {
      return toast.error("enter your lastname")
    }
    if (data.email === "") {
      return toast.error("enter your email")
    }
    if (data.password === "") {
      return toast.error("enter your password")
    }
    if (!checkpassword(data.password)) {
      return toast.error("enter atleast 8 characters ,one symbol,one integer,capital letter")
    }
    if (!checkemail(data.email)) {
      return toast.error("email id is not valid")
    }
    //connect the form to teacher by nav
    const res = axios.post("https://64d9c2fee947d30a260a44d5.mockapi.io/user", data).then((res) => {
      toast.success("form submitted successfully")

      navigate('/student')

    }).catch((err)=>{
      console.log(err);
    })

    setstudentlist([...studentlist, data])
    setdata({
      Firstname: "",
      Lastname: "",
      email: "",
      password: "",
      location: "",
      hobby: []
    })
  }
  const handledelete = (i) => {
    studentlist.splice(i, 1)
    setstudentlist([...studentlist])
  }

  return (
    <div className='container mt-5'>
      <h1 className='text-center'>Create Student</h1>
      <div className='row mt-3 w-50 m-auto'>

        <div className='col-6'>
          <label for="exampleInputEmail1" class="form-label">
            first name
          </label>
          <input type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='firstname'
            value={data.firstname}
            onChange={(event) => handlechange(event)}
          />
        </div>
        <div className='col-6 '>
          <label for="exampleInputEmail1" class="form-label">
            Last name
          </label>
          <input type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='lastname'
            value={data.lastname}
            onChange={(event) => handlechange(event)}
          />
        </div>
        <div className='col-6'>
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='email'
            value={data.email}
            onChange={(event) => handlechange(event)}
          />
        </div>
        <div className='col-6'>
          <label for="exampleInputEmail1" class="form-label">
            password
          </label>
          <input type="password"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='password'
            value={data.password}
            onChange={(event) => handlechange(event)}
          />
        </div>
        <div className='col-6'>
          <label for="exampleInputEmail1" class="form-label">
            location
          </label>
          <Select options={locationoption}
            value={locationoption.filter((e) => e.value === data.location)}
            onChange={(e) => setdata({ ...data, location: e.value })} />
        </div>
        <div className='col-6'>
          <label for="exampleInputEmail1" class="form-label">
            hobby
          </label>
          <Select isMulti options={hobbyoption}
            value={hobbyoption.filter((e) => {
              return data.hobby.some((opt) => opt === e.value)
            })}
            onChange={(e) => setdata({ ...data, hobby: e.map((hobby) => hobby.value) })} />
        </div>
      </div>
      <div className='m-auto w-50 d-flex justify-content-end'>
        <button className='btn btn-sm btn-success' onClick={handlesubmit}>submit</button>
      </div>
      <Toaster />
      <div className='container'>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">firstname</th>
              <th scope="col">lastname</th>
              <th scope="col">email</th>
              <th scope="col">location</th>
              <th scope="col">hobby</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {
              studentlist.map((list, i) => {
                return <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{list.firstname}</td>
                  <td>{list.lastname}</td>
                  <td>{list.email}</td>
                  <td>{list.location}</td>
                  <td>{list.hobby.join(' ,')}</td>
                  <td><i class="fa fa-trash-o text-danger" style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => handledelete(i)}></i></td>
                </tr>
              })
            }

          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Studentform