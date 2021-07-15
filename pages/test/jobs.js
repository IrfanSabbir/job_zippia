// importing React Component to Show and manage Job List
import JobList from '../../components/JobList'
import axios from 'axios'

// Main Page for the test/jobs route
export default function Jobs(props) {
  return (
    <div>
      {/* Child Component and also passing the jobs*/}
      <JobList jobs={props.result}/>
    </div>
  )
}

// Server side rendering , doing api call and sending it to page 
Jobs.getInitialProps = async (ctx) =>{
  try {   
    // Post Body data for the request body
    let input = {
      "companySkills": true,
      "dismissedListingHashes": [],
      "fetchJobDesc": true,
      "jobTitle": "Business Analyst",
      "locations": [],
      "numJobs": 20,
      "previousListingHashes": [],
      }
    //axios Api call, 1st parameter is the URL and 2nd is request body data  
    const res = await axios.post(`https://www.zippia.com/api/jobs/`,input)
    // Returning to page with Props
    return {result: res.data.jobs}
  } catch (error) {
    // Passing empty Array for error response
    return {result: []}
  }

}