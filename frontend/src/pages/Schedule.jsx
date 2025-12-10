import { useState } from "react";

function Schedule() {
  const [form, setForm] = useState({
    businessName: "",
    name: "",
    email: "",
    serviceInterest: "",
    date: "",
    time: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const scheduleMeeting = async () => {
    await fetch("http://localhost:3001/api/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setSuccess(true);
  };

  return (
    <div className="page">
      <h1>Schedule a Strategy Call</h1>

      <input
        name="businessName"
        placeholder="Business Name"
        onChange={handleChange}
      />
      <br />

      <input name="name" placeholder="Your Name" onChange={handleChange} />
      <br />

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />

      <input
        name="serviceInterest"
        placeholder="Services Needed"
        onChange={handleChange}
      />
      <br />

      <input type="date" name="date" onChange={handleChange} />
      <br />

      <input type="time" name="time" onChange={handleChange} />
      <br />

      <textarea
        name="message"
        placeholder="Additional details"
        onChange={handleChange}
      />
      <br />
      <br />

      <button onClick={scheduleMeeting}>Schedule</button>

      {success && (
    <p className="success">
    ✅ Meeting scheduled successfully! We’ll reach out shortly.
    </p>
    )}
    </div>
  );
}

export default Schedule;
