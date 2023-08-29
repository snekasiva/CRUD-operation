import axios from 'axios'
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

function Teacherform() {
    const [Teacherlist, setTeacherlist] = useState([])
    const navigate = useNavigate()
    const [data, setdata] = useState({
        Firstname: "",
        Lastname: "",
        Email: "",
        Password: "",
        Experience: "",
        Skill: []
    })


    const Experienceoption = [
        {
            label: "0-1 yr",
            value: "0-1 yr"
        },
        {
            label: "1-2 yr",
            value: "1-2 yr"
        },
        {
            label: "2-3 yr",
            value: "2-3 yr"
        },
        {
            label: "5 yr",
            value: "5 yr"
        }
    ]

    const Skilloption = [
        {
            label: "Python",
            value: "Python"
        },
        {
            label: "Java",
            value: "Java"
        },
        {
            label: "Computer science",
            value: "Computer science"
        },
        {
            label: "JavaScript",
            value: "JavaScript"
        },
        {
            label: "Communication",
            value: "Communication"
        },
        {
            label: "Logical Thinking",
            value: "Logical Thinking"
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
        if (data.Firstname === "") {
            return toast.error("enter your firstname")
        }
        if (data.Firstname <= "5") {
            return toast.error("enter atleast 5 character")
        }
        if (data.Lastname === "") {
            return toast.error("enter your lastname")
        }
        if (data.Email === "") {
            return toast.error("enter your email")
        }
        if (data.Password === "") {
            return toast.error("enter your password")
        }
        if (!checkpassword(data.Password)) {
            return toast.error("enter atleast 8 characters and use symbols and integers")
        }
        if (!checkemail(data.Email)) {
            return toast.error("email is not valid")
        }
       axios.post('https://64d9c2fee947d30a260a44d5.mockapi.io/teacher',data).then((res) => {
            toast.success("form submitted successfully")
            navigate('/Teacher')
        }).catch((err) => {
            console.log(err);
        })

        setTeacherlist([...Teacherlist, data])

        setdata({
            Firstname: "",//form empty the front page after submitting data
            Lastname: "",
            Email: "",
            Password: "",
            Experience: "",
            Skill: []
        })
    }
    const handledelete = (i) => {
        Teacherlist.splice(i, 1)
        setTeacherlist([...Teacherlist])
    }
    return (
        <div className='container m-4'>
            <h1 className='text-center'>Teacher Appplication Form</h1>
            <div className='row mt-4 w-50 m-auto'>
                <div className='col-6'>
                    <label for="exampleInputEmail1"
                        class="form-label">
                        Firstname
                    </label>
                    <input type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name='Firstname'
                        value={data.Firstname}//empty value and show blank space
                        onChange={(event) => handlechange(event)}
                    />

                </div>
                <div className='col-6'>
                    <label for="exampleInputEmail1"
                        class="form-label">
                        Lastname
                    </label>
                    <input type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name='Lastname'
                        value={data.Lastname}
                        onChange={(event) => handlechange(event)}
                    />
                </div>
                <div className='col-6'>
                    <label for="exampleInputEmail1"
                        class="form-label">
                        Email
                    </label>
                    <input type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name='Email'
                        value={data.Email}
                        onChange={(event) => handlechange(event)}
                    />
                </div>
                <div className='col-6'>
                    <label for="exampleInputEmail1"
                        class="form-label">
                        Password
                    </label>
                    <input type="password"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name='Password'
                        value={data.Password}
                        onChange={(event) => handlechange(event)}
                    />
                </div>
                <div className='col-6'>
                    <label for="exampleInputEmail1"
                        class="form-label">
                        Experience
                    </label>
                    <Select
                        options={Experienceoption}
                        value={Experienceoption.filter((e) => (e.value === data.Experience))}
                        onChange={(e) => setdata({ ...data, Experience: e.value })} />
                </div>
                <div className='col-6'>
                    <label for="exampleInputEmail1"
                        class="form-label">
                        Skill
                    </label>
                    <Select isMulti
                        options={Skilloption}
                        value={Skilloption.filter((e) => {
                            return data.Skill.some((opt) => opt === e.value)//return is used to return the value after finishing one method
                        })}
                        onChange={(e) => setdata({ ...data, Skill: e.map((Skill) => Skill.value) })} />
                </div>
            </div>
            <div className='m-auto w-50 mt-4 d-flex justify-content-end'>
                <button className='btn btn-sm btn-outline-success' onClick={()=>handlesubmit()}>Submit</button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Experience</th>
                        <th scope="col">Skill</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Teacherlist.map((list, i) => {
                            return <tr>
                                <th scope="row">{i}</th>
                                <td>{list.Firstname}</td>
                                <td>{list.Lastname}</td>
                                <td>{list.Email}</td>
                                <td>{list.Password}</td>
                                <td>{list.Experience}</td>
                                <td>{list.Skill.join(",")}</td>
                                <td><i class="fa fa-trash-o text-danger" style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => handledelete()}></i></td>
                            </tr>
                        })
                    }


                </tbody>
            </table>

        </div>

    )
}

export default Teacherform

