import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Teacherview() {
    const[Teacherdetails,setTeacherdetails]=useState({})
    const params = useParams()
    console.log(params.id);

    const fetchTeacherdetails=()=>{
        const res=axios.get(`https://64d9c2fee947d30a260a44d5.mockapi.io/teacher/${params.id}`).then((res)=>{
           setTeacherdetails(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        fetchTeacherdetails()
    },[])
    return (
        <div className='container mt-5'>
            <div>
            <div class="card" style={{width:"18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">{Teacherdetails.Firstname}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">
                        {Teacherdetails.Email}
                        </h6>
                        <p>{Teacherdetails.Experience}</p>
                        <p>{Teacherdetails.Skill}</p>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Teacherview