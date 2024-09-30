import JobListing from "./JobListing";
import { Link } from "react-router-dom";

const JobListings = ({jobs}) => {
  return (
    <div>
    
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job._id}>
        <JobListing  job={job} />
        <Link to={`/jobs/${job._id}` }>View Job</Link>
        <br />
        <Link to={`/edit-job/${job._id}` }>Edit Job</Link>
        </div>
        
      ))}
      {/* <JobListing />
      <JobListing />
      <JobListing /> */}
    </div>
    </div>
  );
};

export default JobListings;
