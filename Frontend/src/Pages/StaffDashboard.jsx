import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, IconButton, CssBaseline, Button, Collapse } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/pic9.jpeg'; 

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
    const [openAssignment,setOpenAssignment]=useState(false);
  
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openStudent, setOpenStudent] = useState(false); 
  const [openNotice,setOpenNotice]=useState(false);

  const navigateTo = (route) => {
    navigate(route);
    setOpenDrawer(false);
  };

  const toggleDrawer = () => setOpenDrawer(!openDrawer);
  const toggleAttendance = () => setOpenAttendance(!openAttendance);
  const toggleStudent = () => setOpenStudent(!openStudent);
  const toggleNotice=()=>setOpenNotice(!openNotice); 
  const toggleAssignment=()=>setOpenAssignment(!openAssignment);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ backgroundColor: "#1E2A38" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Staff Dashboard
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
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/StudentAttendance')}>
                <ListItemText primary="Student Attendance" />
              </ListItem>
            </List>
          </Collapse>


                     <ListItem button onClick={toggleAssignment}>
                       <ListItemText primary="Assignment" />
                     </ListItem>
           
                       <Collapse in={openAssignment} timeout="auto" unmountOnExit>
                       <List component="div" disablePadding>
                         <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewAssignment')}>
                           <ListItemText primary="View Assignment" />
                         </ListItem>
                         <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewAssFeed')}>
                           <ListItemText primary="Assignment Feedback" />
                         </ListItem>
                        <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/AssignmentSubmission')}>
                           <ListItemText primary="Assignment Submission" />
                         </ListItem>
                         </List>
                         </Collapse>


          <ListItem button onClick={toggleNotice}>
            <ListItemText primary="Notice" />
          </ListItem>
          <Collapse in={openAttendance} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/Notice')}>
                <ListItemText primary="Drop Notice" />
              </ListItem>
               <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewNoice')}>
                <ListItemText primary="View Notice" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={toggleStudent}>
            <ListItemText primary="Student" />
          </ListItem>
          <Collapse in={openStudent} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/StudentRegistration')}>
                <ListItemText primary="Student Registration" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/ViewStudent')}>
                <ListItemText primary="View Student" />
              </ListItem>
              <ListItem button sx={{ pl: 4 }} onClick={() => navigateTo('/StudentProfile')}>
                <ListItemText primary="Student Profile" />
              </ListItem>
            </List>
          </Collapse>

                    <ListItem button onClick={() => navigateTo('/ViewFeedback')}>
                      <ListItemText primary="View Feedback" />
                    </ListItem>
          
          
                    <ListItem button onClick={() => navigateTo('/ViewBook')}>
                      <ListItemText primary="View Books" />
                    </ListItem>
          
                    <ListItem button onClick={() => navigateTo('/Question')}>
                      <ListItemText primary="Question" />
                    </ListItem>


                    <ListItem button onClick={() => navigateTo('/TransportDetails')}>
                      <ListItemText primary="Transport Details" />
                    </ListItem>


                    <ListItem button onClick={() => navigateTo('/StaffProfile')}>
                      <ListItemText primary="Staff Profile" />
                    </ListItem>



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
          <Typography variant="h4">Welcome to the Admin Dashboard!</Typography>
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            This is the area where different content is displayed based on what you select from the sidebar.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StaffDashboard;
