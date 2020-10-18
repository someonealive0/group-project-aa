import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  toolbar : {
      position : "sticky",
      backgroundColor : '#7289da'
  }
}));

const Navbar = () => {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            AppName
          </Typography>
          <LoginForm />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar