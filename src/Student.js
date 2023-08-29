import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Modal, ModalBody, ModalFooter, ModalHeader, Popover, PopoverBody, PopoverHeader } from 'reactstrap';

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

function Student() {
  const [data, setdata] = useState([])
  const [deleteId, setdeleteId] = useState()
  const [editModal, seteditModal] = useState(false)
  const [editdata, seteditdata] = useState({})

  const fetchstudentlist = async () => {
    const res = await axios.get("https://64d9c2fee947d30a260a44d5.mockapi.io/user")
    if (res.status === 200) {
      setdata(res.data);
    }

  }
  console.log(data);

  useEffect(() => {
    fetchstudentlist()
  }, [])

  const handleDelete = (id) => {
    axios.delete(`https://64d9c2fee947d30a260a44d5.mockapi.io/user/${id}`).then((res) => {
      toast.success('deleted successfully')
      fetchstudentlist()
    })
      .catch((err) => {
        console.log(err);
      })
  }
  const onDelete = (id) => {
    setdeleteId(id);
  };
  const handleEdit = (data) => {
    seteditdata(data);
    seteditModal(!editModal);
  };

  const handlechange = (e) => {
    seteditdata((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleupdate = () => {
    console.log(editdata);
    axios.put(`https://64d9c2fee947d30a260a44d5.mockapi.io/user/${editdata.id}`, editdata).then((res) => {
      toast.success("Updated successfully")
      seteditModal(!editModal)
      fetchstudentlist()
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className='container mt-4'>

      <h2>Student list</h2>
      <div className='text-end'>
        <Link to={'/studentform'} ><button className='btn btn-sm btn-outline-primary'>Add Student+</button></Link>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">email</th>
            <th scope="col">password</th>
            <th scope="col">location</th>
            <th scope="col">hobby</th>
            <th scope="col">Action</th>

          </tr>
        </thead>
        <tbody>
          {
            data.map((list, i) => {
              return <tr>
                <th scope="row">{i}</th>
                <td>{list.firstname}</td>
                <td>{list.lastname}</td>
                <td>{list.email}</td>
                <td>{list.password}</td>
                <td>{list.location}</td>
                <td>{list.hobby}</td>
                <td>
                  <Link to={`/Studentview/${list.id}`}>
                    <button className='btn btn-sm btn-outline-primary mx-2'>view</button>
                  </Link>

                  <button className='btn btn-sm btn-outline-warning mx-2' onClick={() => handleEdit(list)}>
                    edit
                  </button>
                  <button
                    id={`delete_student_${i}`}
                    className='btn btn-sm btn-outline-danger mx-2'
                    onClick={() => onDelete(list.id)}
                  >
                    delete
                  </button>
                  <Popover
                    flip
                    target={`delete_student_${i}`}
                    isOpen={list.id === deleteId}

                  >
                    <PopoverHeader>
                      Delete
                    </PopoverHeader>
                    <PopoverBody>
                      Are you sure you want to delete{list.firstname}?
                      <button className="btn btn-sm btn-outline-primary mx-2" onClick={() => handleDelete(list.id)}>yes</button>
                      <button className="btn btn-sm btn-outline-danger mx-2" onClick={() => setdeleteId('')}>no</button>
                    </PopoverBody>
                  </Popover>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
      <Modal isOpen={editModal} toggle={() => seteditModal(!editModal)}>
        <ModalHeader>Edit student</ModalHeader>
        <ModalBody>
          <div className='container mt-5'>
            <div className='row mt-3  m-auto'>

              <div className='col-6'>
                <label for="exampleInputEmail1" class="form-label">
                  first name
                </label>
                <input type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name='firstname'
                  value={editdata.firstname}
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
                  value={editdata.lastname}
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
                  value={editdata.email}
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
                  value={editdata.password}
                  onChange={(event) => handlechange(event)}
                />
              </div>
              <div className='col-6'>
                <label for="exampleInputEmail1" class="form-label">
                  location
                </label>
                <Select
                  options={locationoption}
                  value={locationoption.filter((e) => e.value === editdata.location)}
                  onChange={(e) => seteditdata({ ...editdata, location: e.value })}
                />
              </div>
              <div className='col-6'>
                <label for="exampleInputEmail1" class="form-label">
                  hobby
                </label>
                <Select
                  isMulti options={hobbyoption}
                  value={hobbyoption.filter((e) => {
                    return editdata?.hobby?.some((opt) => opt === e.value);
                  })}
                  onChange={(e) => seteditdata({ ...editdata, hobby: e.map((hobby) => hobby.value) })}
                />
              </div>
            </div>

          </div>

        </ModalBody>
        <ModalFooter>
          <button className="btn btn-sm btn-outline-primary mx-2" onClick={() => handleupdate()}>update</button>
          <button className="btn btn-sm btn-outline-danger mx-2" onClick={() => seteditModal(!editModal)} >cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Student