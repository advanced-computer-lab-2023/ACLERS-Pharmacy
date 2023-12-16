import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken-promisified';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ViewListIcon from '@mui/icons-material/ViewList';
import MoneyIcon from '@mui/icons-material/Money';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';

const ContentContainer = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(7),
  padding: theme.spacing(3),
}));

const logoImageUrl = 'https://i.ibb.co/vP2dX46/el7a2nilogo.png';

const menuItems = [
  { id: 'viewpharmacists', label: 'Pharmacists', icon: <GroupIcon /> },
  { id: 'viewpatients', label: ' Patients', icon: <GroupIcon /> },
  { id: 'AdminAdd', label: 'Add Admin', icon: <PersonAddIcon /> },
  { id: 'view-applicants', label: 'Applicants', icon: <AssignmentIndIcon /> },
  { id: 'view-Medicines', label: 'Medicines', icon: <ViewListIcon /> },
  { id: 'sales', label: 'Sales', icon: <MoneyIcon /> },
  { id: 'change-password', label: 'Change Password', icon: <LockIcon /> },
];

function AdminNavbar() {
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token);
  const navigate = useNavigate();

  if (!token) {
    return <div>ACCESS DENIED, You are not authenticated, please log in</div>;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <Drawer variant="permanent">
        <div style={{ width: '100%' }}>
          <Link to="/admin/dashboard">
            <img
              src={logoImageUrl}
              alt="Drawer Logo"
              style={{ width: '260px' }}
            />
          </Link>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.id}
              component={Link}
              to={`/admin/${item.id}`}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <ContentContainer>
        {/* Content section */}
      </ContentContainer>
    </div>
  );
}

export default AdminNavbar;
