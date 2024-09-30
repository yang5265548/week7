import JobListings from "../components/JobListings";
import { useEffect, useState } from "react";

const Home = () => {
  const[jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setJobs(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div className="home">

      <JobListings  jobs={jobs}/>
    </div>
  );
};

export default Home;
