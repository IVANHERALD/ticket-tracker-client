import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from './Navbar'
import { TableContainer,Table,TableBody,TableCell,TableRow,Paper,TableHead, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Home() {
    const [TicketArray,setTicketArray]=useState([]);
    const history=useNavigate();
    useEffect(()=>
    {
        const fetchAllTicket = async () => {
            try {
              const response = await fetch(`http://localhost:5000/ticket/getAllTickets`);
              const data = await response.json();
              console.log(data.tickets);
              setTicketArray(data.tickets);
            } catch (error) {
              console.error('Error fetching customers:', error);
            } 
          };
          fetchAllTicket();
    },[])
    const EditTicket=(ticket)=>{
      console.log(ticket._id);
      const updatedTicket = {
        e_issueId: ticket.issueId,
        e_openBy: ticket.openBy,
        e_openOn: ticket.openOn,
        e_priority: ticket.priority,
        e_status: ticket.status,
        e_description:ticket.description
      };
      history(`/create/${ticket._id}`,{state:updatedTicket})
    }
  return (
    <div className='main-container'>
        <Navbar/>
        <div className='issue_cards'>
        <TableContainer component={Paper} sx={{width:1000}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> Issue Id</TableCell>
                    <TableCell>Opened By</TableCell>
                    <TableCell>Opened On</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                    {TicketArray.map((ticket)=>(
                        <TableRow key={ticket.id}>
                            <TableCell>{ticket.issueId}</TableCell>
                            <TableCell>{ticket.openBy}</TableCell>
                            <TableCell>{ticket.openOn}</TableCell>
                            <TableCell>{ticket.priority}</TableCell>
                            <TableCell>{ticket.status}</TableCell>
                            <TableCell >
                                <Button onClick={()=>EditTicket(ticket)}startIcon={<EditIcon sx={{color:"black"}}/>}/>
                                <Button startIcon={<DeleteIcon sx={{color:"black"}} />}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default Home