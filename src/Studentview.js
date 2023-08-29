import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

function Studentview() {
    const [studentDetail, setstudentDetail] = useState({})
    const params = useParams()
    console.log(params.id);

    const fetchstudentDetails = () => {
        const res = axios.get(`https://64d9c2fee947d30a260a44d5.mockapi.io/user/${params.id}`).then((res) => {
            setstudentDetail(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    /*we use use effect to run when the page mount so that it will run first */
    useEffect(() => {
        fetchstudentDetails()
    }, [])
    return (
        <div>
            <div class="card" style={{ width: "18rem" }}>
                <div class="card-body">
                    <h5 class="card-title">{studentDetail.firstname} {studentDetail.lastname}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">{studentDetail.email}</h6>
                    <p>{studentDetail.location}</p>
                    <p>{studentDetail?.hobby?.join(' ')}</p>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
    )
}

export default Studentview