import React from "react";
import Navbar from "../../components/Navbar";
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
import Loader from "../../components/Loader";
import clsx from "clsx";
import Button from "@material-ui/core/Button";

export default function AllManufacture(props) {
    const supplyChainContract = props.supplyChainContract;
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    const [allManufacture, setAllManufacture] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const navItem = [
        ["Add Product", "/manufacturer/manufacture"],
        ["Ship Product", "/manufacturer/ship"],
        ["All Products", "/manufacturer/allManufacture"],
    ];

    React.useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const cnt = await supplyChainContract.methods.getProductCount().call();
                const countNumber = Number(cnt);

                setCount(countNumber);
            } catch (error) {
                console.error("Error fetching product count:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [supplyChainContract]);

    React.useEffect(() => {
        if (count > 0) {
            setLoading(true);
            (async () => {
                const arr = [];
                try {
                    for (var i = 1; i < count; i++) {
                        const prodState = await supplyChainContract.methods.getProductState(i).call();
                        const productState = Number(prodState);

                        if (productState === 0) {
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
                    setAllManufacture(arr);
                    console.log("All Manufactured Products:", arr);
                } catch (error) {
                    console.error("Error fetching product details:", error);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [count, supplyChainContract]);

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

    return (
        <div className={classes.pageWrap}>
            <Navbar pageTitle={"Manufacturer"} navItems={navItem}>
                {loading ? (
                    <Loader />
                ) : (
                    <div>
                        <ProductModal
                            prod={modalData}
                            open={open}
                            handleClose={handleClose}
                        />
                        <h1 className={classes.pageHeading}>Manufactured Products</h1>
                        <h3 className={classes.tableCount}>
                            Total: {allManufacture.length}
                        </h3>
                        <>
                            <div>
                                <Paper className={classes.TableRoot}>
                                    <TableContainer className={classes.TableContainer}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className={classes.TableHead} align="left">
                                                        ID
                                                    </TableCell>
                                                    <TableCell
                                                        className={classes.TableHead}
                                                        align="center"
                                                    >
                                                        Product Code
                                                    </TableCell>
                                                    <TableCell
                                                        className={classes.TableHead}
                                                        align="center"
                                                    >
                                                        Product Name
                                                    </TableCell>
                                                    <TableCell
                                                        className={classes.TableHead}
                                                        align="center"
                                                    >
                                                        Manufacturer
                                                    </TableCell>
                                                    <TableCell
                                                        className={classes.TableHead}
                                                        align="center"
                                                    >
                                                        Manufacture Date
                                                    </TableCell>
                                                    <TableCell
                                                        className={clsx(
                                                            classes.TableHead,
                                                            classes.AddressCell
                                                        )}
                                                        align="center"
                                                    >
                                                        Owner
                                                    </TableCell>
                                                    <TableCell
                                                        className={classes.TableHead}
                                                        align="center"
                                                    >
                                                        Details
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {allManufacture.length !== 0 ? (
                                                    allManufacture
                                                        .slice(
                                                            page * rowsPerPage,
                                                            page * rowsPerPage + rowsPerPage
                                                        )
                                                        .map((prod) => {
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
                                                                <TableRow
                                                                    hover
                                                                    role="checkbox"
                                                                    tabIndex={-1}
                                                                    key={prod[0][0]}
                                                                >
                                                                    <TableCell
                                                                        className={classes.TableCell}
                                                                        component="th"
                                                                        align="left"
                                                                        scope="row"
                                                                    >
                                                                        {prod[0][0]}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        className={classes.TableCell}
                                                                        align="center"
                                                                    >
                                                                        {prod[1][2]}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        className={classes.TableCell}
                                                                        align="center"
                                                                    >
                                                                        {prod[1][1]}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        className={classes.TableCell}
                                                                        align="center"
                                                                    >
                                                                        {prod[0][4]}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        className={classes.TableCell}
                                                                        align="center"
                                                                    >
                                                                        {d}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        className={clsx(
                                                                            classes.TableCell,
                                                                            classes.AddressCell
                                                                        )}
                                                                        align="left"
                                                                    >
                                                                        {prod[0][2]}
                                                                    </TableCell>
                                                                    <TableCell
                                                                        className={clsx(classes.TableCell)}
                                                                        align="center"
                                                                    >
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            onClick={(event) => handleClick(event, prod)}
                                                                        >
                                                                            Details
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
                                        count={allManufacture.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </div>
                        </>
                    </div>
                )}
            </Navbar>
        </div>
    );
}
