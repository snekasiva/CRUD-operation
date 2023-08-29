import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { Modal, ModalBody, ModalFooter, ModalHeader, Popover, PopoverBody, PopoverHeader } from 'reactstrap'
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
function Teacher() {
  const [data, setdata] = useState([])
  const [deleteId, setdeleteId] = useState()
  const [editmodal, seteditmodal] = useState(false)
  const [editdata, seteditdata] = useState({})
  const fetchTeacherlist = async() => {
    const res =await axios.get("https://64d9c2fee947d30a260a44d5.mockapi.io/teacher")
      if (res.status === 200) {
        setdata(res.data);
      }
    

  }
  console.log(data);
  useEffect(() => {
    fetchTeacherlist()
  }, [])
  const handledelete = (id) => {
    axios.delete(`https://64d9c2fee947d30a260a44d5.mockapi.io/teacher/${id}`).then((res) => {
      toast.success("deleted successfully")
      fetchTeacherlist()
    }).catch((err) => {
      console.log(err);
    })
  }
  const onDelete = (id) => {
    setdeleteId(id)
  }
  const handleedit = (data) => {
    seteditdata(data)
    {/*the data is stored in seteditdata now the modal poppop also want to open so we use below line */ }
    seteditmodal(!editmodal)
  }
  const handlechange=(e)=>{
    seteditdata((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleupdate=()=>{
    console.log(editdata);
    axios.put(`https://64d9c2fee947d30a260a44d5.mockapi.io/teacher/${editdata.id}`,editdata).then((res)=>{
      toast.success("updated successfully")
      seteditmodal(!editmodal)
      fetchTeacherlist()
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className='container mt-5'>
      <h2>Teacher List</h2>
      <div className='text-end'>
      <Link to={'/Teacherform'}><button className='btn btn-sm btn-outline-primary'>Add Teacher+</button></Link>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Email</th>
            <th scope="col">Experience</th>
            <th scope="col">Skill</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((list, i) => {
              return <tr>
                <th scope="row">{i}</th>
                <td>{list.Firstname}</td>
                <td>{list.Lastname}</td>
                <td>{list.Email}</td>
                <td>{list.Experience}</td>
                <td>{list.Skill}</td>
                <td>
                  <Link to={`/Teacherview/${list.id}`}>
                    <button className='btn btn-sm btn-outline-primary mx-2'>view</button>
                  </Link>
                  {/* //if u click this edit (onclick)it have to open so i gonna write func of handleedit */}
                  <button className='btn btn-sm btn-outline-warning mx-2'
                    onClick={() => handleedit(list)} >
                    edit
                  </button>
                  <button
                    id={`delete_Teacher_${i}`}
                    className='btn btn-sm btn-outline-danger mx-2'
                    onClick={() => onDelete(list.id)}
                  >
                    delete
                  </button>
                  <Popover
                    flip
                    target={`delete_Teacher_${i}`}
                    isOpen={list.id === deleteId}
                  >
                    <PopoverHeader>
                      Delete
                    </PopoverHeader>
                    <PopoverBody>
                      Are you sure you want to delete{list.Firstname}?
                      <div>
                        <button className="btn btn-sm btn-outline-primary mx-2" onClick={() => handledelete(list.id)}>Yes</button>
                        <button className='btn btn-sm btn-outline-warning mx-2' onClick={() => setdeleteId('')}>No</button>
                      </div>
                    </PopoverBody>
                  </Popover>
                </td>

              </tr>
            })
          }
        </tbody>
      </table>
      {/* //modal poppop from reactstrap is used for edit */}
      {/*to close the modal poppop use toggle */}
      <Modal isOpen={editmodal} toggle={() => seteditmodal(!editmodal)}>
        <ModalHeader>
          Edit Teacher
        </ModalHeader>
        <ModalBody>
          <div className='container m-4'>
            <div className='row mt-4  m-auto'>
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
                  value={editdata.Firstname}//empty value and show blank space
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
                  value={editdata.Lastname}
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
                 value={editdata.Email}
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
                value={editdata.Password}
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
                  value={Experienceoption.filter((e) => (e.value === editdata.Experience))}
                   onChange={(e) => seteditdata({ ...editdata, Experience: e.value })} 
                  />
              </div>
              <div className='col-6'>
                <label for="exampleInputEmail1"
                  class="form-label">
                  Skill
                </label>
                <Select isMulti
                  options={Skilloption}
                  value={Skilloption.filter((e) => {
                    return editdata?.Skill?.some((opt) => opt === e.value)//return is used to return the value after finishing one method
                  })}
                   onChange={(e) => seteditdata({ ...editdata, Skill: e.map((Skill) => Skill.value) })} 
                  />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* //to open edit we need usestate so by boolean u can open edit */}
          <button className="btn btn-sm btn-outline-primary mx-2"onClick={()=>handleupdate()}>Update</button>
          <button className="btn btn-sm btn-outline-danger mx-2" onClick={() => seteditmodal(!editmodal)}>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Teacher