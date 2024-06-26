import React from "react";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 10px',
        display: 'flex',
        margin: '20px auto',
        width: '40%',
        border: "2px solid #1a237e",
        borderRadius: 50,
        boxShadow: "2px 2px 10px #9fa8da"

    },
    input: {
        justifyContent: 'center',
        flex: 1,
        outline: "none",
        border: "none",
        padding: 0,
        borderRadius: 40,
        fontSize: 17
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },

}));

export default function CustomizedInputBase(props) {

    const classes = useStyles();
    const [search, setSearch] = React.useState("");

    const onTextChange = async (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <Paper className={classes.root}>
                <input
                    className={classes.input}
                    placeholder="Enter Product ID"
                    inputProps={{ 'aria-label': 'Enter Product ID' }}
                    onChange={onTextChange}
                    onKeyPress={(e) => e.key === 'Enter' ? props.findProduct(search) : onTextChange}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={() => props.findProduct(search)}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </>
    );
}