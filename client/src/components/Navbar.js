import React from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const drawerWidth = 230;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#0A1F44",
        color: "#FFFFFF",
        borderBottom: "1px solid #2E3A45",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#021B33",
        color: "#fff",
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft({ pageTitle, navItems, children }) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        backgroundColor="#D3D3D3"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <img
                            alt="."
                            src="/logo-transp.png"
                            style={{ height: "70px", width: "auto" }}
                        />
                        &nbsp;Decentralised Supply Chain Platform
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <ListItemText><b>{pageTitle}</b></ListItemText>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon style={{ color: "#fff" }} />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <List>
                    <Link to="/" style={{ textDecoration: "none", color: "#D3D3D3" }}>
                        <ListItem>
                            <ListItemText primary={<Typography style={{ fontSize: '23px', fontWeight: 'bold' }}>Home</Typography>}></ListItemText>
                        </ListItem>
                    </Link>
                    <Link
                        to="/explorer"
                        style={{ textDecoration: "none", color: "#D3D3D3" }}
                    >
                        <ListItem>
                            <ListItemText primary={<Typography style={{ fontSize: '23px', fontWeight: 'bold' }}>Explorer</Typography>}></ListItemText>
                        </ListItem>
                    </Link>
                </List>
                <List>
                    {navItems.length !== 0 ? (
                        navItems.map((item) => (
                            <Link
                                to={item[1]}
                                style={{ textDecoration: "none", color: "#D3D3D3" }}
                            >
                                <ListItem button key={item[0]}>
                                    <ListItemText primary={item[0]} />
                                </ListItem>
                            </Link>
                        ))
                    ) : (
                        <> </>
                    )}
                </List>
                <div
                    style={{ height: "100%", display: "flex", alignItems: "flex-end" }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "70px",
                            display: "flex",
                            color: "#D3D3D3",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: 500,
                            fontSize: 14,
                            borderTop: "1px solid #44a",
                        }}
                    >
                        Syncing Supply, Forging Future Networks &nbsp;&nbsp;

                    </div>
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <div style={{ margin: "0 auto", maxWidth: 1300 }}>{children}</div>
            </main>
        </div >
    );
}