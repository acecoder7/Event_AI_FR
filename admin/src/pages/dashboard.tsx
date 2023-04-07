import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../config/firebase";
import toast from 'react-hot-toast'
import { signOut } from "firebase/auth";


export default function Dashboard() {
    const router = useRouter();
    const [events, setEvents] = useState([]);


    const handleEdit = (event) => {
        router.push(`/edit/${event.id}`);
    };

    const getallEvent = async () => {
        try {
            const response = await fetch("https://EventBKFB.harshitadeep.repl.co/api/event/all");
          const data = await response.json();
          setEvents(data);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getallEvent();
      }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            toast.success('Logout successful!');
            // Redirect to another page
            router.push('/signin');
        } catch(err) {
            console.error(err);
        }
    }

    const handleDelete = async (id) => {
        try {
          const res = await fetch(`https://EventBKFB.harshitadeep.repl.co/api/event/${id}`, {
            method: "DELETE"
          });
          toast.success('Event deleted!');
          getallEvent();

        } catch (err) {
          console.error(err);
          toast.error('Failed to delete event. Please try again.');
        }
      };

      const openForm = async () => {
        try {
            // Redirect to another page
            router.push('/form');
        } catch(err) {
            console.error(err);
        }
    }
    
  return (
    <>
    <div>
        <h1>HI ADMIN</h1>
        <button style={{ marginRight: '10px', color: 'navy' }} onClick={logout}> Logout </button>
        <button style={{ marginRight: '10px', color: 'navy' }} onClick={openForm}>Add Event </button>
        <div>
        {events.map((event) => (
        <div className="event-card" style={{ 
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            backgroundColor: 'powderblue'
          }} key={event.id}>
          <h2>{event.title}</h2>
          <img src={event.image_url} style={{ width: '30%', height: '25%' }} alt={event.title}></img>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>{event.desc}</p>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>{event.date}</p>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>{event.time}</p>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>{event.venue}</p>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>{event.mode}</p>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>{event.category}</p>


          
          <button style={{ marginRight: '10px', color: 'navy' }} onClick={() => handleDelete(event.id)}>Delete</button>
          <button style={{ marginRight: '10px', color: 'navy' }} onClick={() => handleEdit(event)}>Edit</button>
        </div>
      ))}
            
        </div>
    </div>
    </>
  );
}