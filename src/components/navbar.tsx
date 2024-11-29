import { useState } from 'react';
import {
  ListItemText, 
  ListItemIcon, 
  ListItemButton, 
  ListItem, 
  List, 
  IconButton, 
  Divider, 
  Box, 
  Theme,
  CSSObject,
  styled,
  Drawer as MuiDrawer,
  Avatar,
  Paper,
  Typography,
} from '@mui/material';
import { Receipt, Tapas, RadioButtonUnchecked, RadioButtonChecked, Category } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveTab, changeOpen } from '@store/slice/navbar';
import { useBreakpoint } from '@composables/useBreakpoint';

const drawerWidth = 240;
const menuList = [
  {
    id: 1,
    title: 'Recipes',
    icon: <Receipt />,
    link: '/recipes',
  },
  {
    id: 2,
    title: 'Ingredients',
    icon: <Tapas />,
    link: '/ingredients',
  },
  {
    id: 3,
    title: 'Categories',
    icon: <Category />,
    link: '/categories',
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer)(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function AppDrawer(props: any) {
  const [keepOpen, setKeepOpen] = useState(() => {return false});
  const navbar = useSelector((state: any) => state.navbar);
  const dispatch = useDispatch();

  const { resolveBreakpoint } = useBreakpoint();
  
  const isOpen = () => {
    return keepOpen ? keepOpen : navbar.isOpen;
  };
  
  const toggleKeepOpen = () => {
    setKeepOpen(!keepOpen);
  };

  return (
    <Box 
      sx={{ display: 'flex' }}
      onClick={() => (!resolveBreakpoint('md')) && navbar.isOpen ? dispatch(changeOpen(false)) : null}
    >
      <Drawer
        variant={resolveBreakpoint('md') ? 'permanent' : 'temporary'}
        open={resolveBreakpoint('md') ? isOpen() : navbar.isOpen }
        onMouseEnter={() => resolveBreakpoint('md') ? dispatch(changeOpen(true)) : () => null}
        onMouseLeave={() => resolveBreakpoint('md') ? dispatch(changeOpen(false)) : () => null}
        PaperProps={{sx: { backgroundColor: 'primary.main' }}}
      >
        <DrawerHeader
          sx={!isOpen() ? { justifyContent: 'center' } : null}
        >
          
          {resolveBreakpoint('md') ?
            <IconButton onClick={ toggleKeepOpen }>
              {keepOpen ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
            </IconButton>
            : 
            <IconButton
              size="large"
              edge="start"
              onClick={() => dispatch(changeOpen(false))}
            >
            </IconButton> 
          }
        </DrawerHeader>
        <Divider />
        <List >
          {menuList.map(item => (
            <ListItem key={item.title} 
              disablePadding sx={{ display: 'block',fontWeight: 'bold' }}
            >
              <Link 
                to={item.link} 
                style={{
                  textDecoration: 'none', 
                  color: 'inherit',
                }}
                onClick={() => {
                  dispatch(changeActiveTab(item.id));
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen() ? 'initial' : 'center',
                    px: 2.5,
                    backgroundColor: navbar.activeTab === item.id ? 'primary.dark' : 'transparent',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen() ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} sx={{ opacity: isOpen() ? 1 : 0 }} primaryTypographyProps={{fontWeight: 'bold'}}/>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }} color={'secondary.contrastText'}>
        {props.children}
      </Box>
    </Box>
  );
}