import './App.css';
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import ClassForm from './Components/forms/ClassForm'
import ClassDetails from './Components/ClassDetails'
import StudentForm from './Components/forms/StudentForm'
import TeacherForm from './Components/forms/TeacherForm'
import ClassAnalyticsPage from './Pages/ClassAnalyticsPage'
import EditClassForm from './Components/forms/EditClassForm';
import EditStudentForm from './Components/forms/EditStudentForm';
import EditTeacherForm from './Components/forms/EditTeacherForm';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/create_class" element={<ClassForm />} />
            <Route path="/create_student" element={<StudentForm />} />
            <Route path="/create_teacher" element={<TeacherForm />} />
            <Route path="/class/:id" element={<ClassDetails />} />
            <Route path="/analytics_class/:id" element={<ClassAnalyticsPage />} />
            <Route path="/edit_class/:id" element={<EditClassForm />} />
            <Route path="/edit_student/:id" element={<EditStudentForm />} />
            <Route path="/edit_teacher/:id" element={<EditTeacherForm />} />
            
            
          </Routes>


          <Toaster
            position="top-center"
            toastOptions={{ style: { width: "300px ", fontSize: "20px" } }}
          />


    </div>
  );
}

export default App;
