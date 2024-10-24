import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Add, ViewList, Upload, People, Storefront, MarkEmailUnread, LibraryAdd, Receipt, AddShoppingCart, CheckCircle } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import Colors from "../utils/Colors";
import ReceiptIcon from '@mui/icons-material/Receipt';
import ViewListIcon from '@mui/icons-material/ViewList';

const drawerWidth = 220;

const DisplayList = [
  {
    section: "Products",
    items: [
      { label: "Add New", link: "/product/add", icon: <Add /> },
      { label: "View All", link: "/product/view", icon: <ViewList /> },
      { label: "Upload Bulk", link: "/product/upload", icon: <Upload /> },
    ],
  },
  {
    section: "Records",
    items: [
      { label: "Clients", link: "/records/clients", icon: <People /> },
      { label: "Suppliers", link: "/records/suppliers", icon: <Storefront /> },
    ],
  },
  {
    section: "Leads",
    items: [
      { label: "View All", link: "/leads/view-all", icon: <MarkEmailUnread /> },
      { label: "Add New", link: "/leads/add-new", icon: <LibraryAdd /> },
    ],
  },
  {
    section: "Orders Tracking",
    items: [
      { label: "Create Order", link: "/orders/create-new", icon: <AddShoppingCart /> },
      { label: "View Orders", link: "/orders/view-all", icon: <ViewListIcon /> },
    ],
  },
  {
    section: "Invoice",
    items: [
      {label: "Create Invoice", link: "/invoice/create-new", icon: <ReceiptIcon />},
      {label: "View Invoice", link: "/invoice/view-all", icon: <ViewListIcon />}
    ]
  }
];

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(-1);
  const classes = useStyles();
  
  const handleClick = (link) => {
    navigate(link);
  };

  useEffect(() => {
    const url = location.pathname;
    const index = DisplayList.map((section) => section.items).findIndex((item) => url.includes(item.link));
    setActiveTab(index);
  }, [location.pathname]);

  return (
    <Drawer className={classes.drawer} variant="permanent" anchor="left">
      <List className={classes.mainList}>
        {DisplayList.map((section, sectionIndex) => (
          <div key={section.section}>
            <ListItem>
              <ListItemText primary={section.section} className={classes.sectionTitle} primaryTypographyProps={{fontSize: '14px'}} />
            </ListItem>
            {section.items.map((item, itemIndex) => {
              const { label, link, icon } = item;
              return (
                <ListItem key={label} disablePadding>
                  <ListItemButton
                    className={classes.listItemButton}
                    selected={activeTab === itemIndex + sectionIndex}
                    onClick={() => handleClick(link)}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={label} primaryTypographyProps={{fontSize: '14px'}}/>
                  </ListItemButton>
                </ListItem>
              );
            })}
            <Divider />
          </div>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;



const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      color: '#000000',
      paddingTop: '65px',
      fontSize: '10px',
    },
  },
  mainList:{
   
  },
  sectionTitle: {
    color: Colors.acent,
    fontSize: '10px',
    fontWeight: 'bold',
     paddingTop: '10px'
  },
  listItemButton: {
    '&.Mui-selected': {
      backgroundColor: Colors.darkGray, 
      '&:hover': {
        backgroundColor: Colors.darkGray, 
      },
    },
    '&:hover': {
      backgroundColor: Colors.darkGray,
    },
  },
});
