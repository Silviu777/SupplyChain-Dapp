import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        paddingTop: "300px",
    },
}));

export default function Loader() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress style={{ fontSize: "200px" }} />
        </div>
    );
}