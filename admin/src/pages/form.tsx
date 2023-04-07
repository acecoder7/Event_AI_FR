import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from 'react-hot-toast'


export default function Form() {
    const router = useRouter();
    const [eventData, setEventData] = useState({
        title: "",
        desc: "",
        image_url: "",
        category: "",
        date: "",
        time: "",
        venue: "",
        mode: "",
      });
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Event Data:", eventData);
        try {
          const response = await fetch("https://EventBKFB.harshitadeep.repl.co/api/event/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
          });
          console.log("Response:", response);
          toast.success("Event added successfully!");
          // Redirect to another page
          router.push("/dashboard");
        } catch (err) {
          console.error(err);
          toast.error("Failed to add event!");
        }
      };
      
    
  return (
    <div>
       <form onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Title"
    value={eventData.title}
    onChange={(event) =>
      setEventData({ ...eventData, title: event.target.value })
    }
  />
  <input
    type="text"
    placeholder="Description"
    value={eventData.desc}
    onChange={(event) =>
      setEventData({ ...eventData, desc: event.target.value })
    }
  />


   <input
    type="text"
    placeholder="Image URL"
    value={eventData.image_url}
    onChange={(event) =>
      setEventData({ ...eventData, image_url: event.target.value })
    }
  />
  <input
    type="text"
    placeholder="Category"
    value={eventData.category}
    onChange={(event) =>
      setEventData({ ...eventData, category: event.target.value })
    }
  />
  <input
    type="text"
    placeholder="Date"
    value={eventData.date}
    onChange={(event) =>
      setEventData({ ...eventData, date: event.target.value })
    }
  />
  <input
    type="text"
    placeholder="Time"
    value={eventData.time}
    onChange={(event) =>
      setEventData({ ...eventData, time: event.target.value })
    }
  />
  <input
    type="text"
    placeholder="Venue"
    value={eventData.venue}
    onChange={(event) =>
      setEventData({ ...eventData, venue: event.target.value })
    }
  />
  <input
    type="text"
    placeholder="Mode"
    value={eventData.mode}
    onChange={(event) =>
      setEventData({ ...eventData, mode: event.target.value })
    }
  />
  <button type="submit">Add Event</button>
</form>
    </div>
  );
}