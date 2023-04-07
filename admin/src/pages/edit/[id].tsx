import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState({
    title: "",
    desc: "",
    image_url: "",
    category: "",
    date: "",
    time: "",
    venue: "",
    mode: "",
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
      const res = await fetch(`https://EventBKFB.harshitadeep.repl.co/api/event/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success('Event updated!');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update event. Please try again.');
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await fetch(`https://EventBKFB.harshitadeep.repl.co/api/event/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
      }
    };
    getEvent();
  }, [id]);

  return (
    <div>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            value={event.desc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image_url">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={event.image_url}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={event.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            name="date"
            value={event.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input
            type="text"
            name="time"
            value={event.time}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="venue">Venue</label>
          <input
            type="text"
            name="venue"
            value={event.venue}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="mode">Mode</label>
          <input
            type="text"
            name="mode"
            value={event.mode}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Edit Event</button>
</form>
    </div>
  );
}