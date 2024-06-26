import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useStyles } from "../components/Styles";
import sp1 from '../sp3.jpeg';

export default function Home() {
    const classes = useStyles();
    const navItem = [];

    return (
        <>
            <div className={classes.pageWrap}>
                <Navbar navItems={navItem}>
                    <Grid
                        container
                        spacing={3}
                        style={{ height: "100%", minHeight: "90vh", width: "100%" }}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            style={{
                                minHeight: "100%",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <img
                                alt="."
                                src={sp1}
                                style={{ width: "90%", height: "auto" }}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            style={{
                                minHeight: "100%",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <div className={classes.HomeCardWrap} style={{ textAlign: "center", width: "100%" }}>
                                <h1 className={classes.pageHeading} style={{ marginBottom: "15px", marginRight: "10px" }}>Assign Roles</h1>
                                <Link
                                    to="/roleAdmin"
                                    style={{ textDecoration: "none", color: "#fff" }}
                                >
                                    <Button
                                        className={classes.HomeBtn}
                                        size="large"
                                        variant="outlined"
                                        color="primary"
                                        style={{ width: "150px", height: "50px", fontSize: "18px", marginRight: "15px" }}
                                    >
                                        Assign
                                    </Button>
                                </Link>
                                <br />

                                <h1 className={classes.pageHeading} style={{ marginTop: "65px", marginBottom: "10px", marginRight: "7px" }}>Log In</h1>
                                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                                    <Link
                                        to="/manufacturer/manufacture"
                                        style={{ textDecoration: "none", color: "#fff", display: "inline-block", margin: "3px" }}
                                    >
                                        <Button
                                            className={classes.HomeBtn}
                                            size="large"
                                            variant="outlined"
                                            color="primary"
                                            style={{ width: "160px", height: "50px", fontSize: "16px" }}
                                        >
                                            Manufacturer
                                        </Button>
                                    </Link>
                                    <Link
                                        to="/Retailer/allProducts"
                                        style={{ textDecoration: "none", color: "#fff", display: "inline-block", margin: "3px" }}
                                    >
                                        <Button
                                            className={classes.HomeBtn}
                                            size="large"
                                            variant="outlined"
                                            color="primary"
                                            style={{ width: "160px", height: "50px", fontSize: "16px" }}
                                        >
                                            Retailer
                                        </Button>
                                    </Link>
                                    <Link
                                        to="/DistributionHub/receive"
                                        style={{ textDecoration: "none", color: "#fff", display: "inline-block", margin: "3px" }}
                                    >
                                        <Button
                                            className={classes.HomeBtn}
                                            size="large"
                                            variant="outlined"
                                            color="primary"
                                            style={{ width: "160px", height: "50px", fontSize: "16px" }}
                                        >
                                            Distribution Hub
                                        </Button>
                                    </Link>
                                    <Link
                                        to="/Customer/buy"
                                        style={{ textDecoration: "none", color: "#fff", display: "inline-block", margin: "3px" }}
                                    >
                                        <Button
                                            className={classes.HomeBtn}
                                            size="large"
                                            variant="outlined"
                                            color="primary"
                                            style={{ width: "160px", height: "50px", fontSize: "16px" }}
                                        >
                                            Customer
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Navbar>
            </div >
        </>
    );
}
