import React from "react";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { useStyles } from "./Styles";

export default function ProductModal({
    prod, open, handleClose, handleReceiveButton, aText
}) {
    const [rData, setRdata] = React.useState({
        long: "",
        lat: "",
    });

    const handleChangeForm = async (e) => {
        setRdata({
            ...rData,
            [e.target.name]: e.target.value
        });
    };

    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {prod.length === 0 ? (
                            <></>
                        ) : (
                            <>
                                <h1 className={classes.pageHeadingReceipt}>Details</h1>
                                <div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>ID:</div>
                                        <div className={classes.dCol2}>{prod[0][0].toString()}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Stock Keeping Unit:</div>{" "}
                                        <div className={classes.dCol2}> {prod[0][1].toString()}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Owner: </div>{" "}
                                        <div className={classes.dCol2}>{prod[0][2]}</div>
                                    </div>

                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Manufacturer:</div>{" "}
                                        <div className={classes.dCol2}>{prod[0][3]}</div>
                                    </div>

                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Manufacturer Name:</div>{" "}
                                        <div className={classes.dCol2}> {prod[0][4]}</div>
                                    </div>

                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Manufactured date:</div>{" "}
                                        <div className={classes.dCol2}>
                                            {new Date(parseInt(prod[1][0]) * 1000).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZoneName: 'short' })}
                                        </div>
                                    </div>

                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Manufacturer Details:</div>{" "}
                                        <div className={classes.dCol2}> {prod[0][5]}</div>
                                    </div>

                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Manufacture Longitude: </div>{" "}
                                        <div className={classes.dCol2}>{prod[0][6]}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Manufacture Latitude:</div>{" "}
                                        <div className={classes.dCol2}>{prod[0][7]}</div>
                                    </div>

                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Product Name: </div>{" "}
                                        <div className={classes.dCol2}>{prod[1][1]}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Product Code:</div>{" "}
                                        <div className={classes.dCol2}>{prod[1][2].toString()}</div>
                                    </div>

                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Product Price: </div>{" "}
                                        <div className={classes.dCol2}>{prod[1][3].toString()}</div>
                                    </div>

                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}> Product Category: </div>
                                        <div className={classes.dCol2}>{prod[1][4]}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Product State: </div>{" "}
                                        <div className={classes.dCol2}>{prod[1][5].toString()}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Retailer Address: </div>{" "}
                                        <div className={classes.dCol2}>{prod[1][6]}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Retailer Longitude: </div>{" "}
                                        <div className={classes.dCol2}>{prod[1][7]}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Retailer Latitude: </div>{" "}
                                        <div className={classes.dCol2}>{prod[2][0]}</div>
                                    </div>

                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Distribution Hub Address:</div>{" "}
                                        <div className={classes.dCol2}> {prod[2][1]}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Distribution Hub Longitude:</div>{" "}
                                        <div className={classes.dCol2}>{prod[2][2]}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Distribution Hub Latitude:</div>{" "}
                                        <div className={classes.dCol2}> {prod[2][3]}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Customer Address: </div>{" "}
                                        <div className={classes.dCol2}>{prod[2][4]}</div>
                                    </div>
                                    <div className={classes.dRow}>
                                        <div className={classes.dCol1}>Tx Hash: </div>{" "}
                                        <div className={classes.dCol2}>
                                            {prod[2][5].length > 41
                                                ? prod[2][5].substring(0, 41) + "..."
                                                : prod[2][5].toString()}
                                        </div>
                                    </div>
                                    <br />
                                    {console.log(handleReceiveButton)}
                                    {handleReceiveButton ? (
                                        prod[1][5] == 2 || prod[1][5] == 5 ? (
                                            <>
                                                <TextField
                                                    name="long"
                                                    variant="outlined"
                                                    value={rData.long}
                                                    onChange={handleChangeForm}
                                                    label="Longitude"
                                                />
                                                &nbsp;
                                                <TextField
                                                    name="lat"
                                                    variant="outlined"
                                                    value={rData.lat}
                                                    onChange={handleChangeForm}
                                                    label="Latitude"
                                                />
                                            </>
                                        ) : (
                                            <> </>
                                        )
                                    ) : (
                                        <> </>
                                    )}
                                    {handleReceiveButton ? (
                                        prod[1][5] == 2 ||
                                            prod[1][5] == 5 ||
                                            prod[1][5] == 7 ? (
                                            <>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    style={{ margin: 10 }}
                                                    onClick={() =>
                                                        handleReceiveButton(
                                                            prod[0][0],
                                                            rData.long,
                                                            rData.lat
                                                        )
                                                    }
                                                >
                                                    Receive
                                                </Button>
                                                <p>
                                                    <b style={{ color: "red" }}>
                                                        {aText.length !== 0 ? aText : ""}
                                                    </b>
                                                </p>
                                            </>
                                        ) : (
                                            <> </>
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
