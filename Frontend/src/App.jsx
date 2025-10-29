import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AllLogin from './Pages/AllLogin'
import AdminLogin from './Pages/AdminLogin'
import Dashboard from './Pages/Dashboard'
import Stafflogin from './Pages/StaffLogin'
import Stulogin from './Pages/StudentLogin'
import UpdateStaff from './Pages/UpdateStaff'
import UpdateStudent from './Pages/UpdateStudent'
import ViewStaff from './Pages/ViewStaff'
import ViewStudent from './Pages/ViewStudent'
import Registration from './Pages/StaffRegistration'
import StudentRegistration from './Pages/StudentRegistration'
import UpdateDepartment from './Pages/UpdateDepartment'
import ViewDepartment from './Pages/ViewDepartment'
import DeptRegistration from './Pages/DepartRegistration'
import StaffProfile from './Pages/StaffProfile'
import StudentDashboard from './Pages/StudentDashboard'
import StaffDashboard from './Pages/StaffDashboard'
import StudentProfile from './Pages/StudentProfile'
import Notices from './Pages/Notices'
import ViewNotices from './Pages/ViewNotices'
import ViewFeedback from './Pages/ViewFeedback'
import ViewBook from './Pages/ViewBook'
import UpdateSalary from './Pages/UpdateSalary'
import Question from './Pages/Question'
import Feedback from './Pages/Feedback'
import TransportDetais from './Pages/TransportDetail'
import TransportRegistration from './Pages/TransportRegistration'
import Test from './Pages/Test'
import SalaryRegister from './Pages/SalaryRegister'
import AddBook from './Pages/AddBook'
import ViewSalary from './Pages/ViewSalary'
import ViewAssignment from './Pages/ViewAssignment'
import AssFeed from './Pages/AssFeed'
import Assignment from './Pages/Assignment'
import ViewAssFeed from './Pages/ViewAssFeed'
import AssignmentSubmission from './Pages/AssignmentSubmission'
import ViewSubmissions from './Pages/ViewSubmission'
import StuAttendance from './Pages/StuAttendance'
import StaffAttendance from './Pages/StaffAttendance'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/AllLogin' element={<AllLogin/>}/>
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/StaffLogin' element={<Stafflogin/>}/>
        <Route path='/StudentLogin' element={<Stulogin/>}/>
        <Route path='/UpdateStaff/:staffId' element={<UpdateStaff/>}/>
        <Route path='/UpdateStudent/:studentId' element={<UpdateStudent/>}/>
        <Route path='/ViewStaff' element={<ViewStaff/>}/>
        <Route path='/ViewStudent' element={<ViewStudent/>}/>
        <Route path='/StaffRegistration' element={<Registration/>}/>
        <Route path='/StudentRegistration' element={<StudentRegistration/>}/>
        <Route path='/UpdateDepartment/:deptId' element={<UpdateDepartment/>}/>
        <Route path='/ViewDepartment' element={<ViewDepartment/>}/>
        <Route path='/DeptRegistration' element={<DeptRegistration/>}/>
        <Route path='/StaffProfile' element={<StaffProfile/>}/>
        <Route path='/StudentDashboard' element={<StudentDashboard/>}/>
        <Route path='/StaffDashboard' element={<StaffDashboard/>}/>
        <Route path='/StudentProfile' element={<StudentProfile/>}/>
        <Route path='/Notices' element={<Notices/>}/>
        <Route path='/ViewNotices' element={<ViewNotices/>}/>
        <Route path='/ViewFeedback' element={<ViewFeedback/>}/>
        <Route path='/AddBook' element={<AddBook/>}/>
        <Route path='/ViewBook' element={<ViewBook/>}/>
        <Route path='/UpdateSalary/:salaryId' element={<UpdateSalary/>}/>
        <Route path='/Test' element={<Test/>}/>
        <Route path='/SalaryRegistration' element={<SalaryRegister/>}/>
        <Route path='/OnlineTest' element={<Question/>}/>
        <Route path='/Feedback' element={<Feedback/>}/>
        <Route path='/TransportDetail' element={<TransportDetais/>}/>
        <Route path='/TransportRegistration' element={<TransportRegistration/>}/>
        <Route path='/ViewSalary' element={<ViewSalary/>}/>
        <Route path='/AssFeed/:submissionId' element={<AssFeed/>}/>
        <Route path='/Assignment' element={<Assignment/>}/>
        <Route path='/ViewAssFeed' element={<ViewAssFeed/>}/>
        <Route path='/AssignmentSubmission/:assignmentId' element={<AssignmentSubmission/>}/>
        <Route path='/ViewSubmission' element={<ViewSubmissions/>}/>
        <Route path='/ViewAssignment' element={<ViewAssignment/>}/>
        <Route path='/StuAttendance' element={<StuAttendance/>}/>
        <Route path='/StaffAttendance' element={<StaffAttendance/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
