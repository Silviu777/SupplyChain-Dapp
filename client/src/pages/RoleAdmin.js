import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ResponsiveDrawer from "../components/Navbar";
import { useStyles } from "../components/Styles";
import { useRole } from "../context/RoleData";

function RoleAdmin(props) {
    const accounts = props.accounts;
    const supplyChainContract = props.supplyChainContract;

    const { roles, setRoles } = useRole();
    const classes = useStyles();

    const [manufacturerRole, setManufacturerRole] = React.useState("");
    const [retailerRole, setRetailerRole] = React.useState("");
    const [distributionHubRole, setDistributionHubRole] = React.useState("");
    const [customerRole, setCustomerRole] = React.useState("");
    const navItem = [];

    const handleAddManufacturerRole = async () => {
        await setRoles({
            ...roles,
            manufacturer: manufacturerRole
        })

        localStorage.setItem("mRole", manufacturerRole);
        await supplyChainContract.methods.addManufacturerRole(manufacturerRole).send({ from: accounts[0], gas: 100000 }).then(console.log);

        setManufacturerRole("");
    }

    const handleAddRetailerRole = async () => {
        await setRoles({
            ...roles,
            retailer: retailerRole
        })

        localStorage.setItem("rRole", retailerRole);
        await supplyChainContract.methods.addRetailerRole(retailerRole).send({ from: accounts[0], gas: 100000 }).then(console.log);

        setRetailerRole("");
    }

    const handleAddDistributionHubRole = async () => {
        await setRoles({
            ...roles,
            distributionHub: distributionHubRole
        })

        localStorage.setItem("hRole", distributionHubRole);
        await supplyChainContract.methods.addDistributionHubRole(distributionHubRole).send({ from: accounts[0], gas: 100000 }).then(console.log);

        setDistributionHubRole("");
    }

    const handleAddCustomerRole = async () => {
        await setRoles({
            ...roles,
            customer: customerRole
        })

        localStorage.setItem("cRole", customerRole);
        await supplyChainContract.methods.addCustomerRole(customerRole).send({ from: accounts[0], gas: 100000 }).then(console.log);

        setCustomerRole("");
    }


    return (
        <div className={classes.pageWrap}>

            <ResponsiveDrawer navItems={navItem}>

                {/* <div className={classes.FormWrap}> */}
                <div className={classes.FormWrap}>
                    <h1 className={classes.pageHeading}>Add Roles</h1>
                    {console.log(roles)}


                    <form className={classes.root} noValidate autoComplete="off">
                        <div className={classes.RoleForm} >
                            <TextField
                                id="manufacturerRole"
                                label="Enter Manufacturer Address"
                                variant="outlined"
                                value={manufacturerRole}
                                onChange={(e) => setManufacturerRole(e.target.value)}
                                className={classes.rolesTextField}
                                style={{ width: "70%" }}
                                InputProps={{
                                    style: { color: 'white' }
                                }}
                                InputLabelProps={{
                                    style: { color: 'white' }
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddManufacturerRole}
                                className={classes.assignButton}
                                style={{ width: "25%", marginLeft: "30px", fontSize: "15px" }}
                            >
                                Add Manufacturer
                            </Button>
                        </div>
                    </form>

                    <form className={classes.root} noValidate autoComplete="off">
                        <div className={classes.RoleForm} >
                            <TextField
                                id="retailerRole"
                                label="Enter Retailer Address "
                                variant="outlined"
                                value={retailerRole}
                                onChange={(e) => setRetailerRole(e.target.value)}
                                className={classes.rolesTextField}
                                style={{ width: "70%" }}
                                InputProps={{
                                    style: { color: 'white' }
                                }}
                                InputLabelProps={{
                                    style: { color: 'white' }
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddRetailerRole}
                                className={classes.assignButton}
                                style={{ width: "25%", marginLeft: "30px", fontSize: "15px" }}
                            >
                                Add retailer
                            </Button>
                        </div>
                    </form>

                    <form className={classes.root} noValidate autoComplete="off">
                        <div className={classes.RoleForm} >
                            <TextField
                                id="distributionHubRole"
                                label="Enter Distribution Hub Address"
                                variant="outlined"
                                value={distributionHubRole}
                                onChange={(e) => setDistributionHubRole(e.target.value)}
                                className={classes.rolesTextField}
                                style={{ width: "70%" }}
                                InputProps={{
                                    style: { color: 'white' }
                                }}
                                InputLabelProps={{
                                    style: { color: 'white' }
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddDistributionHubRole}
                                className={classes.assignButton}
                                style={{ width: "25%", marginLeft: "30px", fontSize: "15px" }}
                            >
                                add distribution hub
                            </Button>
                        </div>
                    </form>

                    <form className={classes.root} noValidate autoComplete="off">
                        <div className={classes.RoleForm} >
                            <TextField
                                id="customerRole"
                                label=" Enter Customer Address"
                                variant="outlined"
                                value={customerRole}
                                onChange={(e) => setCustomerRole(e.target.value)}
                                className={classes.rolesTextField}
                                style={{ width: "70%" }}
                                InputProps={{
                                    style: { color: 'white' }
                                }}
                                InputLabelProps={{
                                    style: { color: 'white' }
                                }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddCustomerRole}
                                className={classes.assignButton}
                                style={{ width: "25%", marginLeft: "30px", fontSize: "15px" }}
                            >
                                add customer
                            </Button>
                        </div>
                    </form>
                </div>

                <div className={classes.FormWrap}>
                    <h1 className={classes.pageHeading}>Local Accounts</h1>
                    {accounts.slice(1).map((acc) => (
                        <h3 className={classes.tableCountAddresses}>{acc}</h3>
                    ))}

                </div>
                {/* </div> */}


            </ResponsiveDrawer >
        </div >
    );
}

export default RoleAdmin;