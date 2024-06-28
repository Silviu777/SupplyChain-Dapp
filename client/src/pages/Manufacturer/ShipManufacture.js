import React from "react";
import Navbar from "../../components/Navbar";
import Button from "@material-ui/core/Button";
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
import ProductModal from "../../components/Modal";
import clsx from "clsx";
import Loader from "../../components/Loader";

export default function ShipManufacture(props) {
    const supplyChainContract = props.supplyChainContract;
    const { roles } = useRole();
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    const [allSoldProducts, setAllSoldProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [alertText, setAlertText] = React.useState("");

    const navItem = [
        ["Add Product", "/manufacturer/manufacture"],
        ["Ship Product", "/manufacturer/ship"],
        ["All Products", "/manufacturer/allManufacture"],
    ];

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const cnt = await supplyChainContract.methods.getProductCount().call();
                setCount(Number(cnt));
                console.log("count:", cnt);
            } catch (error) {
                console.error("Error fetching product count:", error);
            }
        })();

        (async () => {
            const arr = [];
            try {
                for (let i = 1; i <= count; i++) {
                    const prodState = await supplyChainContract.methods.getProductState(i).call();
                    console.log("state:", prodState);

                    if (Number(prodState) === 1) {
                        const prodData = [];
                        const a = await supplyChainContract.methods.getBasicProductDetails(i, "product", 0).call();
                        const b = await supplyChainContract.methods.getAdditionalProductDetails(i, "product", 0).call();
                        const c = await supplyChainContract.methods.getRetailerDistributionDetails(i, "product", 0).call();

                        const convertBigIntFields = (obj) => {
                            const newObj = { ...obj };
                            for (const key in newObj) {
                                if (typeof newObj[key] === 'bigint') {
                                    newObj[key] = Number(newObj[key]);
                                }
                            }
                            return newObj;
                        };

                        const finalA = convertBigIntFields(a);
                        const finalB = convertBigIntFields(b);
                        const finalC = convertBigIntFields(c);

                        prodData.push(finalA);
                        prodData.push(finalB);
                        prodData.push(finalC);
                        arr.push(prodData);
                    }
                }
                setAllSoldProducts(arr);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
            setLoading(false);
        })();
    }, [count]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [open, setOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState([]);

    const handleClose = () => setOpen(false);

    const handleClick = async (event, prod) => {
        event.stopPropagation();
        await setModalData(prod);
        setOpen(true);
    };

    const handleSetTxhash = async (id, hash) => {
        try {
            await supplyChainContract.methods.setTransactionHash(id, hash).send({ from: roles.manufacturer, gas: 900000 });
        } catch (error) {
            console.error("Error setting transaction hash:", error);
        }
    };

    const handleShipButton = async (event, id) => {
        event.stopPropagation();
        try {
            await supplyChainContract.methods
                .shipToRetailer(id)
                .send({ from: roles.manufacturer, gas: 1000000 })
                .on("transactionHash", function (hash) {
                    handleSetTxhash(id, hash);
                });
            setCount(0);
        } catch (error) {
            console.error("Error shipping product:", error);
            setAlertText("You are not the owner of the product! Kindly inquire the actual holder.");
        }
    };

    return (
        <div className={classes.pageWrap}>
            <Navbar pageTitle={"Manufacturer"} navItems={navItem}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <ProductModal
                            prod={modalData}
                            open={open}
                            handleClose={handleClose}
                        />
                        <h1 className={classes.pageHeading}>Products To be Shipped</h1>
                        <h3 className={classes.tableCount}>Total: {allSoldProducts.length}</h3>
                        <div>
                            <p><b style={{ color: "red" }}>{alertText.length !== 0 ? alertText : ""}</b></p>
                            <Paper className={classes.TableRoot}>
                                <TableContainer className={classes.TableContainer}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.TableHead} align="left">ID</TableCell>
                                                <TableCell className={classes.TableHead} align="center">Product Code</TableCell>
                                                <TableCell className={classes.TableHead} align="center">Product Name</TableCell>
                                                <TableCell className={classes.TableHead} align="center">Manufacturer</TableCell>
                                                <TableCell className={classes.TableHead} align="center">Manufacture Date</TableCell>
                                                <TableCell className={clsx(classes.TableHead, classes.AddressCell)} align="center">Owner</TableCell>
                                                <TableCell className={clsx(classes.TableHead)} align="center">Details</TableCell>
                                                <TableCell className={clsx(classes.TableHead)} align="center">Ship</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {allSoldProducts.length !== 0 ? (
                                                allSoldProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((prod) => {
                                                    const d = new Date(Number(prod[1][0]) * 1000).toLocaleString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                        hour12: false,
                                                        timeZoneName: 'short'
                                                    });

                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={Number(prod[0][0])}>
                                                            <TableCell className={classes.TableCell} component="th" align="left" scope="row">{Number(prod[0][0])}</TableCell>
                                                            <TableCell className={classes.TableCell} align="center">{prod[1][2]}</TableCell>
                                                            <TableCell className={classes.TableCell} align="center">{prod[1][1]}</TableCell>
                                                            <TableCell className={classes.TableCell} align="center">{prod[0][4]}</TableCell>
                                                            <TableCell align="center">{d}</TableCell>
                                                            <TableCell className={clsx(classes.TableCell, classes.AddressCell)} align="center">{prod[0][2]}</TableCell>
                                                            <TableCell className={clsx(classes.TableCell)} align="center">
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={(event) => handleClick(event, prod)}
                                                                >
                                                                    Details
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell className={clsx(classes.TableCell)} align="center">
                                                                <Button type="submit" variant="contained" color="primary" onClick={(event) => handleShipButton(event, Number(prod[0][0]))}>SHIP</Button>
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
                                    count={allSoldProducts.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </div>
                    </>
                )}
            </Navbar>
        </div>
    );
}
