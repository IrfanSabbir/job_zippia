import { useEffect, useState } from 'react'
import { CircularProgress, Typography, Divider, Button,
   Container, makeStyles, TextField, Grid} from '@material-ui/core'

// Importing Sub List Componenet To show jobs in ui
import { Joblist } from './List'

// creating Material ui style to customize the mui components
const useStayle = makeStyles({
  root: {
    textAlign:"center",
    marginTop: "20px"
  },
  divider:{
    color: "#ff6347",
    background: "#ff6347",
    margin: "10px 0px",
  },
})
export default function JobList(props) {
  const classes = useStayle()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [fullList, setFullList] = useState([])
  const [message, setMessage] = useState("")
  const [companyName, setCompanyName] = useState("")

  // TUsing the use Effect:  when this page is first invoked, we will set The property to our local state.
  useEffect(()=>{
    // saving all jobs to local state for leter use
    setFullList(props.jobs)

    //checking if there is any jobs in array
    if(!props.jobs) {
      setMessage("No jobs found! Try Again")
    }
    else{
      //if length of array is greatr then 10, we just copying firt 10 jobs to local state.
      if(props.jobs.length > 10){
        setList(props.jobs.slice(0, 10));
      }
      // else we copy all to local state
      else{
        setList(props.jobs);
      }
    }
  },[])
 
  //This function is called, when we look for last weeks creatd jobbs.
  const lastWeekHandler = () =>{

    // getting todays date to ISO format
    const today = new Date().toISOString()

    // getting the date with 6 day less from today
    const previos = new Date(new Date().setDate(new Date().getDate()-6)).toISOString()

    let lists = []

    //we have stored the fll job list, now maping it to find list
    fullList.map(job =>{

      //This condition is to get list wheich is created between 2 date range
      if(job.OBJpostingDate >= previos && job.OBJpostingDate <= today){
        lists.push(job)
      }
      return;
    })

    // if new list is larger then 10, coping first 10 jobs to local state
    if(lists.length > 10){
      setList(lists.slice(0, 10));
    }
     //else coping all to local state
    else{
      setList(lists);
    }
    // regular message for the task done
    setMessage("Showing Jobs created last week")
  }

  // this function is called when we callsearch by any company name
  const searchHandler = () => {
    // we coping the state value to lower case
    const rename = companyName.toLowerCase()
    let lists = []
    fullList.map(job =>{

      if(job.companyName.includes(companyName) || //fist condition if innput  matches the actual
         job.companyName.includes(companyName[0].toUpperCase() + companyName.slice(1)) || //We capitelize the first character 
         job.companyName.includes(companyName[0].toLowerCase() + companyName.slice(1)) || //We lowercased the first character
         job.companyName.includes(companyName.toLowerCase()) || // we convert full state to lower case
         job.companyName.includes(companyName.toUpperCase()) || // we convert full state to uper case
         job.companyName.includes(rename[0].toUpperCase() + rename.slice(1))  // We capitelize the first character 
         ){
        // pushing th ejob to lists array   
        lists.push(job)
      }
      return;
    })
    //checking if it has large array
    if(lists.length > 10){
      setList(lists.slice(0, 10));
     }
     else{
      setList(lists);
     }

     //setting up a regular message of the task
     setMessage(`Showing all jobs for The company ${companyName}`)

  }

  return (
      <Container fixed className={classes.root}>
        <Typography variant="h5" color="textSecondary"><b>Showing The JOB List</b></Typography>
        <Divider className={classes.divider}/>
        <br/>
        {/* Using grid for responsiveness of the search and filter component */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={12} md={6} lg={6} >
             {/* This button is clicked to check the jobs of last 7 days */}
             <Button variant="contained" color="primary" onClick={lastWeekHandler}>Published Last Week</Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} >
            {/* Input field to store the company name to state */}
            <TextField 
              variant="outlined"
              size="small"
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
            />
             {/* This button is clicked to to complete the search */}
            <Button variant="contained" onClick={searchHandler} color="inherit">Search</Button>
          </Grid>
        </Grid>
        {/* Showing the message , if we have set */}
        {message && <Typography color="secondary">{message}</Typography>}
        <br/>
         {/* if loading is true we show a spinner */}
         {loading 
         ?  <CircularProgress color="primary" size= {70}/>
        //  if no jobs in List , showing simple message
          : !list 
            ? <Typography color="secondary">No Jobs found for {input}</Typography>
            //  If lists has data, passing it to Joblsit component to show in ui
              : <Joblist list={list}/>
         }
      </Container>
  )
}
