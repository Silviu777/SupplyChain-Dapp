import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Button from "@material-ui/core/Button";
import ProductModal from "../../components/Modal";
import { useRole } from "../../context/RoleData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { useStyles } from "../../components/Styles";
import clsx from "clsx";
import Loader from "../../components/Loader";

export default function ReceiveCustomer(props) {
    const supplyChainContract = props.supplyChainContract;
    const { roles } = useRole();
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const [allReceiveProducts, setAllReceiveProducts] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertText, setAlertText] = useState("");

    const navItem = [
        ["Purchase Product", "/Customer/buy"],
        ["Receive Product", "/Customer/receive"],
        ["Your Products", "/Customer/allReceived"],
    ];

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const cnt = await supplyChainContract.methods.getProductCount().call();
                setCount(Number(cnt));
            } catch (error) {
                console.error("Error fetching product count:", error);
                setLoading(false);
            }
        })();

        (async () => {
            const arr = [];
            for (let i = 1; i < count; i++) {
                try {
                    const prodState = await supplyChainContract.methods.getProductState(i).call();
                    console.log("prod state: ", prodState);

                    if (Number(prodState) === 7) {
                        const a = await supplyChainContract.methods.getBasicProductDetails(i, "product", 0).call();
                        const b = await supplyChainContract.methods.getAdditionalProductDetails(i, "product", 0).call();
                        const c = await supplyChainContract.methods.getRetailerDistributionDetails(i, "product", 0).call();

                        const convertBigIntFields = (obj) => {
                            const newObj = { ...obj };
                            for (const key in newObj) {
                                if (typeof newObj[key] === "bigint") {
                                    newObj[key] = Number(newObj[key]);
                                }
                            }
                            return newObj;
                        };

                        const finalA = convertBigIntFields(a);
                        const finalB = convertBigIntFields(b);
                        const finalC = convertBigIntFields(c);

                        const prodData = [finalA, finalB, finalC];
                        arr.push(prodData);
                    }
                } catch (error) {
                    console.error("Error fetching product details for ID:", i, error);
                }
            }
            setAllReceiveProducts(arr);
            setLoading(false);
        })();
    }, [count, supplyChainContract.methods]);

    const handleReceiveButton = (prod) => {
        setModalData(prod);
        setOpen(true);
    };

    const handleConfirmReceive = async () => {
        try {
            const id = modalData[0][0];
            console.log("Attempting to receive product with ID:", id);
            console.log("Using customer address:", roles.customer);
            await supplyChainContract.methods
                .receiveByCustomer(parseInt(id))
                .send({ from: roles.customer, gas: 1000000 })
                .on("transactionHash", function (hash) {
                    handleSetTxhash(id, hash);
                });
            setCount(0);
            setOpen(false);
        } catch (error) {
            console.error("Error during receiving:", error);
            setAlertText("Error during receiving: " + error.message);
        }
    };

    const handleSetTxhash = async (id, hash) => {
        try {
            await supplyChainContract.methods
                .setTransactionHash(id, hash)
                .send({ from: roles.manufacturer, gas: 900000 });
        } catch (error) {
            console.error("Error setting transaction hash:", error);
        }
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClose = () => setOpen(false);

    const handleClick = async (prod) => {
        await setModalData(prod);
        setOpen(true);
    };

    return (
        <div className={classes.pageWrap}>
            <Navbar pageTitle={"Customer"} navItems={navItem}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <ProductModal
                            prod={modalData}
                            open={open}
                            handleClose={handleClose}
                            handleReceiveButton={handleConfirmReceive}
                            aText={alertText}
                        />

                        <h1 className={classes.pageHeading}>Products to be Received</h1>
                        <h3 className={classes.tableCount}>Total: {allReceiveProducts.length}</h3>

                        <div>
                            <Paper className={classes.TableRoot}>
                                <TableContainer className={classes.TableContainer}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.TableHead} align="left">
                                                    ID
                                                </TableCell>
                                                <TableCell className={classes.TableHead} align="center">
                                                    Product Code
                                                </TableCell>
                                                <TableCell className={classes.TableHead} align="center">
                                                    Product Name
                                                </TableCell>
                                                <TableCell className={classes.TableHead} align="center">
                                                    Manufacturer
                                                </TableCell>
                                                <TableCell className={classes.TableHead} align="center">
                                                    Manufacture Date
                                                </TableCell>
                                                <TableCell className={clsx(classes.TableHead, classes.AddressCell)} align="center">
                                                    Owner
                                                </TableCell>
                                                <TableCell className={clsx(classes.TableHead)} align="center">
                                                    Details
                                                </TableCell>
                                                <TableCell className={clsx(classes.TableHead)} align="center">
                                                    Receive
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {allReceiveProducts.length !== 0 ? (
                                                allReceiveProducts
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((prod) => {
                                                        const d = new Date(Number(prod[1][0]) * 1000).toLocaleString("en-US", {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            second: "2-digit",
                                                            hour12: false,
                                                            timeZoneName: "short",
                                                        });

                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={prod[0][0]}>
                                                                <TableCell className={classes.TableCell} component="th" align="left" scope="row">
                                                                    {prod[0][0]}
                                                                </TableCell>
                                                                <TableCell className={classes.TableCell} align="center">
                                                                    {prod[1][2]}
                                                                </TableCell>
                                                                <TableCell className={classes.TableCell} align="center">
                                                                    {prod[1][1]}
                                                                </TableCell>
                                                                <TableCell className={classes.TableCell} align="center">
                                                                    {prod[0][4]}
                                                                </TableCell>
                                                                <TableCell align="center">{d}</TableCell>
                                                                <TableCell className={clsx(classes.TableCell, classes.AddressCell)} align="center">
                                                                    {prod[0][2]}
                                                                </TableCell>
                                                                <TableCell className={clsx(classes.TableCell)} align="center">
                                                                    <Button type="submit" variant="contained" color="primary" onClick={() => handleClick(prod)}>
                                                                        Details
                                                                    </Button>
                                                                </TableCell>
                                                                <TableCell className={clsx(classes.TableCell)} align="center">
                                                                    <Button type="submit" variant="contained" color="primary" onClick={() => handleReceiveButton(prod)}>
                                                                        RECEIVE
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                            ) : (
                                                <> </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={allReceiveProducts.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </div>
                    </>
                )}
            </Navbar>
        </div>
    );
}
