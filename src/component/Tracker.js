import React, { useState, useEffect } from 'react';
import { TextField,InputLabel,Select,MenuItem ,Button,Snackbar, FormControl} from '@mui/material';
import { useLocation, useParams,useNavigate } from 'react-router-dom';
import './styles/Tracker.css'
import Navbar from './Navbar';
function Tracker() {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [issueId,setIssueId] = useState(1)
  const [openBy,setOpenBy] = useState('')
  const [requestedFor,setrequestedFor] = useState('')
  const [description,setdescription] = useState('')
  const [priority,setPriority] = useState('')
  const [status,setStatus] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const location = useLocation();
  const ticket = location.state || {};
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  

  useEffect(() => {
    const getCurrentDateTime = () => {
      const now = new Date();
      const formattedDateTime = `${now.toDateString()} ${now.toLocaleTimeString()}`;
      setCurrentDateTime(formattedDateTime);
    };


    getCurrentDateTime();
  }, []);
  useEffect(() => {
    const fetchLastTicketNumber = async () => {
      console.log("inside")
      try {
        const lastTicketResponse = await fetch(`http://localhost:5000/ticket/getTicketNum`);
        const lastTicketData = await lastTicketResponse.json();
        const lastTicketNumber = lastTicketData.lastTicketNumber || 0;
        const newTicketNumber = parseInt(lastTicketNumber)+1;
        setIssueId(newTicketNumber);
      } catch (error) {
        console.error('Error fetching last Ticket number:', error);
      }
    };
   fetchLastTicketNumber();
},[]);

if (!ticket) {
  return (
    <div>
      <p>ticket not found</p>
    </div>
  );
}


  const handleSubmit=async()=>{
    if(!issueId ||!currentDateTime||!openBy||!requestedFor||!description||!priority||!status)
    {
      showSnackbar('Please fill in all the fields')
      return
    }
    console.log(issueId,currentDateTime,openBy,requestedFor,description,priority,status)
    const lastTicketData={
      issueId,
      openOn:currentDateTime,
      openBy,
      requestedFor,
      description,
      priority,
      status
    }
    console.log(lastTicketData)

    try{
      const response = await fetch(`http://localhost:5000/ticket/createTicket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lastTicketData),
      });

      const data = await response.json();
      console.log('Response from server:', data);
      if (response.status === 201) {
        showSnackbar('Ticket saved Successfully');
        setTimeout(() => {
          //history('/home',{ replace: true }); 
        },3000)
      }
    }
    catch(error)
    {
      console.log('error',error);
    }

    setIssueId('')
    setOpenBy('')
    setrequestedFor('')
    setdescription('')
    setPriority('')
    setStatus('')

  }

  return (
<div className='main-container'>
    <Navbar/>
    <div className='tracker-container' >
        
      <h1>Issue Tracker</h1>
      <TextField variant="outlined" label="Issue Id" value={issueId} InputProps={{
        readOnly: true,
      }} onChange={(e)=>setIssueId(e.target.value)} ></TextField><br /><br />
      <TextField variant="outlined" label="Opened on" value={currentDateTime} InputProps={{
        readOnly: true,
      }}></TextField><br /><br />
      <TextField variant="outlined" label="Opened by" value={openBy} onChange={(e)=>setOpenBy(e.target.value)}></TextField><br /><br />
      <TextField variant="outlined" label="Requested For" value={requestedFor} onChange={(e)=>setrequestedFor(e.target.value)}></TextField><br /><br />
     
      
      
      <FormControl sx={{width:"210px"}}>

      <InputLabel id="priority-label">Priority</InputLabel>
      <Select
        labelId="priority-label"
        label="Priority"
        fullWidth
        value={priority}
        onChange={(e)=>setPriority(e.target.value)}
      >
        <MenuItem value={'High'}>High</MenuItem>
        <MenuItem value={'Medium'}>Medium</MenuItem>
        <MenuItem value={'Low'}>Low</MenuItem>
      </Select>
      </FormControl >
       <br/><br/>
       <FormControl sx={{width:"210px"}}>
       <InputLabel id="Status-label">Status</InputLabel>
       <Select
       labelId="Status-label"
        label="Status"
        fullWidth
        value={status}
        onChange={(e)=>setStatus(e.target.value)}
      >
        <MenuItem value={'Open'}>Open</MenuItem>
        <MenuItem value={'Close'}>Close</MenuItem>
      </Select>
      </FormControl >

        <br/><br/>
        <TextField variant="outlined" label="Description" value={description} multiline maxRows={4}fullWidth onChange={(e)=>setdescription(e.target.value)}></TextField><br /><br />
      <Button variant='outlined' onClick={handleSubmit}>Submit</Button>
      <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        />
    </div>
    </div>
  );
}

export default Tracker;