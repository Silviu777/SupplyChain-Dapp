import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useRole } from "../../context/RoleData";
import Navbar from "../../components/Navbar";
import { useStyles } from "../../components/Styles";
import Grid from "@material-ui/core/Grid";
import Loader from "../../components/Loader";

export default function Manufacture(props) {
    const supplyChainContract = props.supplyChainContract;
    const classes = useStyles();
    const { roles } = useRole();
    const [loading, setLoading] = React.useState(false);
    const [fvalid, setfvalid] = React.useState(false);

    const navItem = [
        ["Add Product", "/manufacturer/manufacture"],
        ["Ship Product", "/manufacturer/ship"],
        ["All Products", "/manufacturer/allManufacture"],
    ];

    const [manForm, setManForm] = React.useState({
        id: 0,
        manufacturerName: "",
        manufacturerDetails: "",
        manufacturerLongitude: "",
        manufacturerLatitude: "",
        productName: "",
        productCode: 0,
        productPrice: 0,
        productCategory: "",
    });

    const handleChangeManufacturerForm = async (e) => {
        setManForm({
            ...manForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitManufacturerForm = async () => {
        setLoading(true);

        if (manForm.manufacturerName !== "" && manForm.manufacturerDetails !== "" && manForm.manufacturerLongitude !== "" && manForm.manufacturerLatitude !== "" && manForm.productName !== "" && manForm.productCode !== 0 && manForm.productPrice !== 0 && manForm.productCategory !== "") {

            setfvalid(false);
            await supplyChainContract.methods.manufactureProduct(
                manForm.manufacturerName,
                manForm.manufacturerDetails,
                manForm.manufacturerLongitude,
                manForm.manufacturerLatitude,
                manForm.productName,
                parseInt(manForm.productCode),
                parseInt(manForm.productPrice),
                manForm.productCategory
            ).send({ from: roles.manufacturer, gas: 999999 })
                .on('transactionHash', function (hash) {
                    handleSetTxhash(hash);
                });

            setManForm({
                id: 0,
                manufacturerName: "",
                manufacturerDetails: "",
                manufacturerLongitude: "",
                manufacturerLatitude: "",
                productName: "",
                productCode: 0,
                productPrice: 0,
                productCategory: "",
            })
        } else {
            setfvalid(true);
        }
        setLoading(false);

    };

    const handleSetTxhash = async (hash) => {
        console.log("Transaction Hash:", hash);
        await supplyChainContract.methods.setTransactionHashOnManufacture(hash).send({ from: roles.manufacturer, gas: 900000 });
    };

    return (
        <div className={classes.pageWrap}>
            <Navbar pageTitle={"Manufacturer"} navItems={navItem}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className={classes.FormWrap}>
                            <h1 className={classes.pageHeading}>Add a Product</h1>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="manufacturerName"
                                        variant="outlined"
                                        value={manForm.manufacturerName}
                                        onChange={handleChangeManufacturerForm}
                                        label="Manufacturer Name"
                                        className={classes.textField}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="manufacturerDetails"
                                        variant="outlined"
                                        value={manForm.manufacturerDetails}
                                        onChange={handleChangeManufacturerForm}
                                        label="Manufacturer Details"
                                        className={classes.textField}
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        name="manufacturerLongitude"
                                        variant="outlined"
                                        value={manForm.manufacturerLongitude}
                                        onChange={handleChangeManufacturerForm}
                                        className={classes.textField}
                                        label="Longitude"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        name="manufacturerLatitude"
                                        variant="outlined"
                                        value={manForm.manufacturerLatitude}
                                        onChange={handleChangeManufacturerForm}
                                        className={classes.textField}
                                        label="Latitude"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="productName"
                                        variant="outlined"
                                        value={manForm.productName}
                                        onChange={handleChangeManufacturerForm}
                                        className={classes.textField}
                                        label="Product Name"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        name="productCode"
                                        variant="outlined"
                                        value={manForm.productCode}
                                        onChange={handleChangeManufacturerForm}
                                        className={classes.textField}
                                        label="Product Code"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        name="productPrice"
                                        variant="outlined"
                                        value={manForm.productPrice}
                                        onChange={handleChangeManufacturerForm}
                                        className={classes.textField}
                                        label="Product Price"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        name="productCategory"
                                        variant="outlined"
                                        value={manForm.productCategory}
                                        onChange={handleChangeManufacturerForm}
                                        className={classes.textField}
                                        label="Product Category"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                            </Grid>
                            <br />
                            <p><b style={{ color: "red" }}>{fvalid ? "Please enter all data" : ""}</b></p>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleSubmitManufacturerForm}
                                className={classes.assignButton}
                            >
                                SUBMIT
                            </Button>
                            <br />
                            <br />
                        </div>
                    </>
                )}
            </Navbar>
        </div>
    );
}
