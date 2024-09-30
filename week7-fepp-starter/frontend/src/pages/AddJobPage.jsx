import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [job,setJob] = useState({
    title: "",
    type: "FUll-Time",
    description: "",
    companyName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  // const submitForm =async (e) => {
  //   e.preventDefault();
  //   console.log("submitForm called");
  //   res=await axios.put("/api/jobs",job);
  // };
  const addJob = async (newJob) => {
    try {
      
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("job", job);
    const newJob = {
      title:job.title,
      type:job.type,
      description:job.description,
      company: {
        name: job.companyName,
        contactEmail:job.contactEmail,
        contactPhone:job.contactPhone,
      },
    };

    addJob(newJob);
    return navigate("/");
  };
  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <label>Job type:</label>
        <select value={job.type} onChange={(e) => setJob({ ...job, type: e.target.value })}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}

        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          value={job.companyName}
          onChange={(e) => setJob({ ...job, companyName: e.target.value })}
        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={job.contactEmail}
          onChange={(e) => setJob({ ...job, contactEmail: e.target.value })}
        />
        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={job.contactPhone}
          onChange={(e) => setJob({ ...job, contactPhone: e.target.value })}
        />
        <button >Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
