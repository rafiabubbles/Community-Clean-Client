
# Community Cleanliness & Issue Reporting Portal

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application that allows users to report, track, and contribute to resolving community cleanliness and public space issues in their local area. Users can post issues, contribute to cleanup drives, view their issue history, and interact with the community in a modern, secure environment.

---

## 🌐 Live Site

[View Live Website](https://your-client-vercel-url.com)

---

## 🛠️ Technologies Used

- **Frontend:** React.js, Tailwind CSS, DaisyUI, React Router, React Hook Form
- **Backend:** Node.js, Express.js, MongoDB, MongoDB Client
- **Authentication:** Firebase Email & Google login
- **Other Libraries:** Axios, React Toastify, jsPDF + AutoTable (PDF reports)

---

## 💡 Features

1. **User Authentication**
   - Email/password login and registration
   - Google login
   - Private routes for logged-in users

2. **Issue Management**
   - Add new issues with title, description, category, location, image, and suggested fix budget
   - View all issues in a grid layout
   - See detailed issue information
   - Update or delete issues (only for the logged-in user)

3. **Community Contributions**
   - Contribute to cleanup efforts with payment info
   - View your contribution history
   - Download PDF reports for personal contributions

4. **Dynamic Home Page**
   - Banner slider showcasing community cleaning and sustainability
   - Issue categories: Garbage, Illegal Construction, Broken Public Property, Road Damage
   - Recent complaints with “See Details” buttons
   - Community stats: total users, issues resolved, and pending
   - Volunteer Call-to-Action section

5. **Additional Features**
   - Responsive design for mobile, tablet, and desktop
   - Toast and SweetAlert notifications for CRUD actions
   - 404 Not Found page and loading spinner during API calls
   - Optional: Dark/Light mode toggle

---

## 📂 Folder Structure

**Client (React)**
src/
├─ Components/
├─ Pages/
├─ hooks/
├─ assets/
├─ App.jsx
└─ index.js


**Server (Node.js + Express)**

routes/
controllers/
models/
index.js

##  How to Run Locally

**1. Clone the repos**
# Client
git clone https://github.com/rafiabubbles/Community-Clean-Client.git
cd Community-Clean-Client
npm install

# Server
git clone https://github.com/rafiabubbles/Community-Clean-Server.git
cd Community-Clean-Server
npm install

**2. Setup Environment Variables**

**Client (.env)**


REACT_APP_API_URL=http://localhost:5000

**Server (.env)**

PORT=5000
MONGO_URI=your_mongo_connection_string

**3. Run Locally**
# Server
npm run dev

# Client
npm start

## Future Improvements

* Dark/light mode toggle across all pages
* Email verification and forgot password 

##  Credits

Developed by **Rafia**
