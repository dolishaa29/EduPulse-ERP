import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, CssBaseline, Button, ListItemIcon, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../CSS/Dashboard.css';
import Logo from '../assets/pic9.jpeg';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openAttendance, setOpenAttendance] = useState(false); 
  const [openAssignment,setOpenAssignment]=useState(false);
  const [openStaff,setOpenStaff]=useState(false);
  const [openStudent,setOpenStudent]=useState(false);
  const [openDepartment,setOpenDepartment]=useState(false);
  const [openSalary,setOpenSalary]=useState(false);
  const [openLibrary,setOpenLibrary]=useState(false);
  const [openNotice,setOpenNotice]=useState(false);


  const navigateTo = (route) => {
    navigate(route);
    setOpenDrawer(false); 
  };

  const toggleDrawer = () => setOpenDrawer(!openDrawer);
  const toggleAttendance = () => setOpenAttendance(!openAttendance);  
  const Notice=()=>setOpenNotice(!openNotice);
  const Library=()=>setOpenLibrary(!openLibrary);
  const Department=()=>setOpenDepartment(!openDepartment);
  const Salary=()=>setOpenSalary(!openSalary);
  const toggleAssignment=()=>setOpenAssignment(!openAssignment);
  const Staff=()=>setOpenStaff(!openStaff);
  const Student=()=>setOpenStudent(!openStudent);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ backgroundColor: "#1E2A38" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Box>
            <img src={Logo} alt="Logo" style={{ height: "40px", width: "auto" }} />
          </Box>
        </Toolbar>
      </AppBar>


      <Drawer
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItem button onClick={toggleAttendance}>
            <ListItemText primary="Attendance" />
          </ListItem>

          <Collapse in={openAttendance} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/StaffAttendance')}>
                <ListItemText primary="Staff Attendance" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/StuAttendance')}>
                <ListItemText primary="Student Attendance" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={toggleAssignment}>
            <ListItemText primary="Assignment" />
          </ListItem>

            <Collapse in={openAssignment} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/AssFeed')}>
                <ListItemText primary="Assignment Feedback" />
              </ListItem>

              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/Assignment')}>
                <ListItemText primary="Assignment" />
              </ListItem>
                <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewSubmission')}>
                <ListItemText primary="View Submission" />
              </ListItem>

            </List>
          </Collapse>


          <ListItem button onClick={Staff}>
            <ListItemText primary="Staff Details" />
          </ListItem>

            <Collapse in={openStaff} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/StaffRegistration')}>
                <ListItemText primary="Staff Registration" />
              </ListItem>
             <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewStaff')}>
                <ListItemText primary="View Staff" />  
              </ListItem>
            </List>
          </Collapse>


        <ListItem button onClick={Student}>
            <ListItemText primary="Student Details" />
          </ListItem>

            <Collapse in={openStudent} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/StudentRegistration')}>
                <ListItemText primary="Student Registration" />
              </ListItem>
             <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewStudent')}>
                <ListItemText primary="View Student" />  
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => navigateTo('/ViewFeedback')}>
            <ListItemText primary="Feedback" />
          </ListItem>


          <ListItem button onClick={() => navigateTo('/TransportRegistration')}>
            <ListItemText primary="Transport Registration" />
          </ListItem>

          <ListItem button onClick={() => navigateTo('/OnlineTest')}>
            <ListItemText primary="Online Test" />
          </ListItem>


 
      <ListItem button onClick={Department}>
            <ListItemText primary="Department" />
          </ListItem>
            <Collapse in={openDepartment} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/DeptRegistration')}>
                <ListItemText primary="Department Register" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewDepartment')}>
                <ListItemText primary="View Department" />  
              </ListItem>
            </List>
          </Collapse>


          <ListItem button onClick={Salary}>
            <ListItemText primary="Salary" />
          </ListItem>
            <Collapse in={openSalary} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/SalaryRegistration')}>
                <ListItemText primary="Salary Register" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewSalary')}>
                <ListItemText primary="View Salary" />  
              </ListItem>
            </List>
          </Collapse>


          <ListItem button onClick={Notice}>
            <ListItemText primary="Notice" />
          </ListItem>

          <Collapse in={openNotice} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/Notice')}>
                <ListItemText primary="Drop Notice" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewNotices')}>
                <ListItemText primary="View Notices" />
              </ListItem>
            </List>
          </Collapse>


          <ListItem button onClick={Library}>
            <ListItemText primary="Library" />
          </ListItem>

          <Collapse in={openLibrary} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/AddBook')}>
                <ListItemText primary="Add Book" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewBook')}>
                <ListItemText primary="View Book" />
              </ListItem>
            </List>
          </Collapse>






        </List>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          padding: "20px",
          marginLeft: openDrawer ? "240px" : "0",
          transition: "margin 0.3s ease-in-out",
          backgroundColor: "#f4f4f4",
        }}
      >
        <Button onClick={toggleDrawer} sx={{ marginBottom: "20px" }}>
          {openDrawer ? "Close Sidebar" : "Open Sidebar"}
        </Button>

        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h4">Welcome to the Dashboard!</Typography>
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            This is the area where different content is displayed based on what you select from the sidebar.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
