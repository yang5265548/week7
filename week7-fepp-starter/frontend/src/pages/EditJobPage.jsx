import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const EditJobPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState({
        title: '',
        type: '',
        description: '',
        companyName: '',
        contactEmail: '',
        contactPhone: ''
      });
      useEffect(() => {
        const fetchJob = async () => {
          try {
            const res = await axios.get(`/api/jobs/${id}`);
            if (res.data) {
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
    
        fetchJob();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newJob = {
                title:job.title,
                type:job.type,
                description:job.description,
                company: {
                  name: job.companyName,
                  contactEmail:job.contactEmail,
                  contactPhone:job.contactPhone,
                },};
          const res = await axios.put(`/api/jobs/${id}`, newJob);
          if (res) {
            console.log('Job updated:', res.data);
          }
          return navigate("/");
        } catch (error) {
          console.error('Error updating job:', error);
        }
    }

    return (
      <div>
        <h1>Edit Job</h1>
        <form>
          <label>
            Title:
            <input type="text" value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value })} />
          </label>
          <label>
            Type:
           
          </label>
          <select value={job.type} onChange={(e) => setJob({ ...job, type: e.target.value })}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>
        
          <label>
            Description:
            <textarea value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} />
          </label>
          <label>
            Company Name:
            <input type="text" value={job.companyName} onChange={(e) => setJob({ ...job, companyName: e.target.value })} />
          </label>
          <label>
            Contact Email:
            <input type="email" value={job.contactEmail} onChange={(e) => setJob({ ...job, contactEmail: e.target.value })} />
          </label>
          <label>
            Contact Phone:
            <input type="tel" value={job.contactPhone} onChange={(e) => setJob({ ...job, contactPhone: e.target.value })} />
          </label>
          <button type="submit" onClick={handleSubmit}>Save</button>
        </form>
      </div>
    );
};
export default EditJobPage;