import { useState } from 'react';

function App() { //This represents the entire webpage workspace.Everything inside this function creates the structural logic and elements for this app
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    role: "Event Help"
  });

  
  const [currentView, setCurrentView] = useState("form"); // Tracks whether to show "form" or "admin" layout
  const [allApplicants, setAllApplicants] = useState([]); // Stores data fetched from your MongoDB backend

  // Function to fetch database records when entering Admin View
  const fetchAdminData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/volunteers");
      const data = await response.json();
      setAllApplicants(data);
      setCurrentView("admin");
    } catch (err) {
      alert("Could not load admin portal data.");
    }
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/volunteers", { //You create it yourself when you write your backend code
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {//if the backend server sent back a successful HTTP code (like 200 or 201)
        alert("Success! Your registration has been saved to MongoDB Atlas!");
        setFormData({ fullName: "", email: "", phone: "", skills: "", role: "Event Help" });
      } else {
        alert(`Server Error: ${data.message || "Could not register user."}`);
      }
    } catch (error) {//backend server was turned off entirely
      console.error("Connection error:", error);
      alert("Could not reach the backend server. Make sure it is running!");
    }
  };

  return (
    <div className="page-container">
      
      {/* Header Info Section */}
      <header className="info-section">
        <img src="/logo.png" alt="Naye Pankh Foundation Logo" className="logo" />
        <h1 className="main-title">Naye Pankh Foundation</h1>
        <p className="motto">Think global, Act local.</p>
        <p className="about-text">
          "NayePankh Foundation" is a non governmental organisation with a strong desire to help the society and make it a better place for all, by doing everything in our power and to make our vision successful we would require your vital support. Service to mankind is the service to god. Let’s revolutionise the society together!.
        </p>

        
        <div className="view-toggle-box">
          <button 
            onClick={() => setCurrentView("form")} 
            className={`toggle-btn ${currentView === 'form' ? 'active' : ''}`}
          >
            Registration Form
          </button>
          <button 
            onClick={fetchAdminData} 
            className={`toggle-btn ${currentView === 'admin' ? 'active' : ''}`}
          >
            Admin Dashboard
          </button>
        </div>
      </header>

      {/* Form Section */}
      <main className="form-section">
        {currentView === "form" ? (
          
          
          <>
            <h2 className="form-title">Volunteer Registration</h2>
            <form onSubmit={handleSubmit} className="registration-form">
              
              <div className="input-group">
                <label>Full Name:</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address:</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="input-group">
                <label>Phone Number:</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                />
              </div>

              <div className="input-group">
                <label>Preferred Volunteer Role:</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="Event Help">Event Planning & Coordination</option>
                  <option value="Technical Support">Technical Support / IT</option>
                  <option value="Social Media">Social Media & Design</option>
                  <option value="Community Outreach">Community Outreach</option>
                </select>
              </div>

              <div className="input-group">
                <label>Relevant Skills / Experience:</label>
                <textarea 
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Graphic design, coding, managing events, etc."
                />
              </div>

              <button type="submit" className="submit-btn">
                Register Application
              </button>
            </form>
          </>
        ) : (
          
          /* THE BASIC ADMIN DASHBOARD PANEL */
          <div className="admin-dashboard-view">
            <h2 className="form-title">Welcome, Admin!</h2>
            <p className="admin-subtitle">
              Reviewing live submissions from MongoDB Cloud.
            </p>

            
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Skills</th>
                  </tr>
                </thead>
                <tbody>
                  {allApplicants.map((person) => (
                    <tr key={person._id}>
                      <td className="applicant-name">{person.fullName}</td>
                      <td>{person.role}</td>
                      <td className="applicant-skills">{person.skills || "None listed"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Link Routing To Main Website */}
            <div className="external-link-container">
              <a 
                href="https://nayepankh.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="external-link-btn"
              >
                Visit Official Naye Pankh Website 🌐
              </a>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

export default App;