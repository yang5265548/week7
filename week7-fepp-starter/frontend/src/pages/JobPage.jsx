import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const JobPage=()=>{
    const { id } = useParams();
    console.log("idshisha", id);
    const [job,setJob] = useState({
        title: "",
        type: "FUll-Time",
        description: "",
        companyName: "",
        contactEmail: "",
        contactPhone: "",
      });
      const handleJob = async () => {
        try {
          const res = await axios.get(`/api/jobs/${id}`);
          if(res){
            setJob({
                title: res.data.title,
                type: res.data.type,
                description: res.data.description,
                companyName: res.data.company.name,
                contactEmail: res.data.company.contactEmail,
                contactPhone: res.data.company.contactPhone
              });
        }
          
        } catch (error) {
          console.error('Error fetching job:', error);
        }
      };
      useEffect(() => {
        handleJob();
      }, [id]);
    return(
        <div>
            <h1>Job Page</h1>
            <h2>Title:{job.title}</h2>
            <p>Type: {job.type}</p> 
            <p>Description: {job.description}</p>
            <p>Company: {job.companyName}</p>  
            <p>Contact:{job.contactEmail}</p>
            <p>Phone:{job.contactPhone}</p>
        </div>
    );
};
export default JobPage;