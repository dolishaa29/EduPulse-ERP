import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
    Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, 
    Typography, IconButton, CssBaseline, Button, ListItemIcon, 
    Collapse, Divider, Paper
} from '@mui/material';
import { 
    Menu as MenuIcon, AccessTime, Assignment, People, School, 
    RateReview, BusAlert, EditNote, Business, AttachMoney, 
    Notifications, LocalLibrary, ExpandLess, ExpandMore, 
    Home, Logout, Chat, Analytics, TrendingUp 
} from '@mui/icons-material';

const drawerWidth = 260;
const primaryColor = '#202d3f';
const accentColor = '#3f78e0';
const hoverColor = 'rgba(63, 120, 224, 0.15)'; 
const footerColor = '#141d26';
const Dashboard = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  
  const [openAttendance, setOpenAttendance, ] = useState(false); 
  const [openAssignment, setOpenAssignment] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openSalary, setOpenSalary] = useState(false);
  const [openLibrary, setOpenLibrary] = useState(false);
  const [openNotice, setOpenNotice] = useState(false);
  
  const [totalNotifications, setTotalNotifications] = useState(48); 
  const [totalAssignments, setTotalAssignments] = useState(157);
  const [totalFeedback, setTotalFeedback] = useState(25); 
  const navigateTo = (route) => {
    navigate({ pathname: route }); 
    console.log(`Navigating to: ${route} using object syntax.`);
    setOpenDrawer(false); 
  };

  const toggleDrawer = () => setOpenDrawer(!openDrawer);
  const toggleAttendance = () => setOpenAttendance(!openAttendance);  
  const toggleNotice = () => setOpenNotice(!openNotice);
  const toggleLibrary = () => setOpenLibrary(!openLibrary);
  const toggleDepartment = () => setOpenDepartment(!openDepartment); 
  const toggleSalary = () => setOpenSalary(!openSalary);
  const toggleAssignment = () => setOpenAssignment(!openAssignment);
  const toggleStaff = () => setOpenStaff(!openStaff);
  const toggleStudent = () => setOpenStudent(!openStudent);

  const menuItems = [
    { text: "Home", icon: <Home />, path: '/', alwaysOpen: true },
    { 
      text: "Attendance", icon: <AccessTime />, onClick: toggleAttendance, open: openAttendance, 
      subItems: [
        { text: "Staff Attendance", path: '/StaffAttendance' },
        { text: "Student Attendance", path: '/StuAttendance' }
      ]
    },
    { 
      text: "Assignment", icon: <Assignment />, onClick: toggleAssignment, open: openAssignment,
      subItems: [
        { text: "Assignment", path: '/Assignment' },
        { text: "View Submission", path: '/ViewSubmission' }
      ]
    },
    { 
      text: "Staff Details", icon: <People />, onClick: toggleStaff, open: openStaff,
      subItems: [
        { text: "Staff Registration", path: '/StaffRegistration' },
        { text: "View Staff", path: '/ViewStaff' }
      ]
    },
    { 
      text: "Student Details", icon: <School />, onClick: toggleStudent, open: openStudent,
      subItems: [
        { text: "Student Registration", path: '/StudentRegistration' },
        { text: "View Student", path: '/ViewStudent' },
        { text: "adm", path: '/Admission' }
      ]
    },
    { text: "Feedback", icon: <RateReview />, path: '/ViewFeedback' },
    { text: "Transport Registration", icon: <BusAlert />, path: '/TransportRegistration' },
    { text: "Online Test", icon: <EditNote />, path: '/OnlineTest' },
    { 
      text: "Department", icon: <Business />, onClick: toggleDepartment, open: openDepartment,
      subItems: [
        { text: "Department Register", path: '/DeptRegistration' },
        { text: "View Department", path: '/ViewDepartment' }
      ]
    },
    { 
      text: "Salary", icon: <AttachMoney />, onClick: toggleSalary, open: openSalary,
      subItems: [
        { text: "Salary Register", path: '/SalaryRegistration' },
        { text: "View Salary", path: '/ViewSalary' }
      ]
    },
    { 
      text: "Notice", icon: <Notifications />, onClick: toggleNotice, open: openNotice,
      subItems: [
        { text: "Drop Notice", path: '/Notice' },
        { text: "View Notices", path: '/ViewNotices' }
      ]
    },
    { 
      text: "Library", icon: <LocalLibrary />, onClick: toggleLibrary, open: openLibrary,
      subItems: [
        { text: "Add Book", path: '/AddBook' },
        { text: "View Book", path: '/ViewBook' }
      ]
    },
  ];

  const mockChats = [
    { name: "Driver Rahul", time: "10:30 AM", message: "Route 3 minor delay." },
    { name: "Principal Ma'am", time: "Yesterday", message: "Need bus report by EOD." },
    { name: "Maintenance Head", time: "9:00 AM", message: "Vehicle V007 service request." },
  ];


  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      
      <AppBar 
        position="fixed" 
        elevation={3} // Halka shadow
        sx={{ 
          backgroundColor: primaryColor, 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          {/* TITLE CHANGE: TMS Admin Panel -> ERP Admin Dashboard */}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            ERP Admin Dashboard 
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<Logout />} 
            onClick={() => console.log('Logout')}
            sx={{
                borderRadius: '8px',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
            }}
          >
              Logout
          </Button>
        </Toolbar>
      </AppBar>


      {/* 2. Drawer (Sidebar) - Ekikrit dark design */}
      <Drawer
        variant="temporary"
        open={openDrawer}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }} 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: primaryColor, 
            color: '#ffffff', 
            borderRight: 'none', 
          },
        }}
      >
        <Toolbar sx={{ backgroundColor: '#141d26', minHeight: '64px!important' }}> {/* Contrast ke liye gehra header */}
            <Typography variant="h6" sx={{ color: accentColor, fontWeight: 700, letterSpacing: 1.5 }}>
                MENU
            </Typography>
        </Toolbar>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem 
                button 
                onClick={item.path ? () => navigateTo(item.path) : item.onClick}
                sx={{
                  py: 1.5,
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: hoverColor, // Accent hover state
                    color: '#fff',
                  }
                }}
              >
                <ListItemIcon sx={{ color: accentColor }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ 
                    '& .MuiListItemText-primary': { fontWeight: 500, fontSize: '0.95rem' } 
                }} />
                {item.subItems && (item.open ? <ExpandLess sx={{ color: '#fff' }}/> : <ExpandMore sx={{ color: '#fff' }}/>)}
              </ListItem>

              {/* Collapsible Sub-menu */}
              {item.subItems && (
                <Collapse in={item.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem, subIndex) => (
                      <ListItem 
                        key={subIndex} 
                        button 
                        sx={{ 
                          pl: 6, 
                          py: 1,
                          backgroundColor: 'rgba(0, 0, 0, 0.15)',
                          transition: 'background-color 0.2s',
                          '&:hover': {
                            backgroundColor: hoverColor,
                            color: accentColor // Highlight text on hover
                          }
                        }} 
                        onClick={() => navigateTo(subItem.path)}
                      >
                        <ListItemText primary={subItem.text} sx={{ 
                            '& .MuiListItemText-primary': { fontSize: '0.9rem' } 
                        }} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      {/* 3. Main Content Area (Mukhya Content Shetra) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0, // Padding footer/content ke andar manage karenge
          mt: 8, // AppBar ke liye margin
          backgroundColor: "#f0f2f5", 
          overflowY: 'auto', // Scrollable content
          width: '100%',
          display: 'flex',
          flexDirection: 'column', 
        }}
      >
        <Toolbar /> 
        <Box sx={{ flexGrow: 1, p: 3 }}>
          
          <Button 
            onClick={toggleDrawer} 
            variant="contained"
            sx={{ 
              marginBottom: "20px", 
              backgroundColor: accentColor,
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              '&:hover': { 
                  backgroundColor: '#3366cc',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
              }
            }}
            startIcon={<MenuIcon />}
          >
            {openDrawer ? "Close Menu" : "Open Menu"}
          </Button>

          {/* Welcome Card - Swagat Sandesh */}
          <Box 
            sx={{ 
              padding: { xs: "20px", md: "40px" },
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
              borderLeft: `5px solid ${accentColor}`,
              transition: 'box-shadow 0.3s',
              mb: 4 // Niche space
            }}
          >
            {/* TITLE CHANGE 2 */}
            <Typography variant="h4" gutterBottom sx={{ color: primaryColor, fontWeight: 700 }}>
              ERP Admin Dashboard Welcomes you! 
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.7, maxWidth: '800px' }}>
              Youre admin and you can do all changes from here. Manage staff, students, departments, salaries, notices, library resources, and more with ease. Use the sidebar to navigate through different sections and keep the institution running smoothly.
            </Typography>
          </Box>

          {/* Dashboard Widgets (Cards) - UPDATED METRICS */}
          <Box sx={{ 
              mt: 4, 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '20px' ,
              mb: 4
          }}>
              {/* Widget 1: Total Notifications (New) */}
              <Box 
                  sx={{ 
                      p: 4, 
                      bgcolor: '#fff', 
                      borderRadius: '12px', 
                      boxShadow: 2, 
                      borderBottom: '4px solid #4caf50', // Green
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                  }}
              >
                  <Typography variant="h6" color="#4caf50" sx={{ fontWeight: 600 }}>Total Notifications</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 800, color: primaryColor }}>{totalNotifications}</Typography>
              </Box>
              
              {/* Widget 2: Assignments Submitted (New) */}
              <Box 
                  sx={{ 
                      p: 4, 
                      bgcolor: '#fff', 
                      borderRadius: '12px', 
                      boxShadow: 2, 
                      borderBottom: '4px solid #ff9800', // Orange
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                  }}
              >
                  <Typography variant="h6" color="#ff9800" sx={{ fontWeight: 600 }}>Assignments Submitted</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 800, color: primaryColor }}>{totalAssignments}</Typography>
              </Box>

              {/* Widget 3: Feedback Received (New) */}
              <Box 
                  sx={{ 
                      p: 4, 
                      bgcolor: '#fff', 
                      borderRadius: '12px', 
                      boxShadow: 2, 
                      borderBottom: '4px solid #f44336', // Red
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                  }}
              >
                  <Typography variant="h6" color="#f44336" sx={{ fontWeight: 600 }}>Feedback Received</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 800, color: primaryColor }}>{totalFeedback}</Typography>
              </Box>

              {/* Widget 4: Route Performance (Analytics Look) - Kept as is for variety */}
              <Box 
                  sx={{ 
                      p: 4, 
                      bgcolor: '#fff', 
                      borderRadius: '12px', 
                      boxShadow: 2, 
                      borderBottom: `4px solid ${accentColor}`,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                  }}
              >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color={primaryColor} sx={{ fontWeight: 600 }}>Route Performance</Typography>
                      <TrendingUp sx={{ fontSize: 40, color: accentColor }} />
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: primaryColor }}>92%</Typography>
                  <Typography variant="body2" color="#777">On-time Completion Rate</Typography>
              </Box>
          </Box>
          
          {/* Live Chat/Notifications Section (Chat ki image/look) */}
          <Paper 
            elevation={4} 
            sx={{ 
                p: 3, 
                borderRadius: '12px', 
                mb: 4, 
                borderLeft: '5px solid #28a745' // Green highlight
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chat sx={{ color: '#28a745', mr: 1, fontSize: 30 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: primaryColor }}>
                    Live Notifications & Driver Chat
                </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {/* Mock Chat/Notifications List */}
            <List disablePadding>
                {mockChats.map((chat, index) => (
                    <ListItem 
                        key={index} 
                        secondaryAction={
                            <Typography variant="caption" color="text.secondary">{chat.time}</Typography>
                        }
                        sx={{ 
                            borderBottom: '1px solid #eee', 
                            '&:last-child': { borderBottom: 'none' },
                            py: 1,
                            transition: 'background-color 0.2s',
                            '&:hover': { backgroundColor: '#fafafa' }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 35 }}>
                           <Notifications color="info" />
                        </ListItemIcon>
                        <ListItemText
                            primary={chat.name}
                            secondary={chat.message}
                            primaryTypographyProps={{ fontWeight: 500, color: primaryColor }}
                            secondaryTypographyProps={{ 
                                style: { 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis', 
                                    whiteSpace: 'nowrap' 
                                } 
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <Button size="small" variant="text" sx={{ mt: 2, color: accentColor }}>
                View All Messages
            </Button>
          </Paper>


        </Box>

        {/* 4. Footer (Sabse Niche ka Hissa) */}
        <Box 
            component="footer"
            sx={{
                width: '100%',
                py: 2,
                px: 3,
                backgroundColor: footerColor,
                color: '#aaa',
                textAlign: 'center',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)'
            }}
        >
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                &copy; {new Date().getFullYear()} ERP Admin Panel. All rights reserved. | Powered by NextGen Systems.
            </Typography>
        </Box>

      </Box>
    </Box>
  );
};

// FIX: BrowserRouter wrapper hata diya gaya hai. Ab Dashboard mukhya component hai.
export default Dashboard;
