import React, { useEffect, useRef } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import CustomizedInputBase from "../components/Search";
import ProductModal from "../components/Modal";
import ReceiptModal from "../components/ReceiptModal";
import { MapContainer } from "../components/map";
import { useStyles } from "../components/Styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import { Grid, Container } from "@material-ui/core";

const formatPrice = (priceInCents, locale = "en-US") => {
    const priceInDollars = Number(priceInCents) / 100;
    return priceInDollars.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const columns = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "mname", label: "Manufacturer", minWidth: 170 },
    { id: "pname", label: "Product Name", minWidth: 170 },
    { id: "price", label: "Price", minWidth: 170 },
    { id: "owner", label: "Owner", minWidth: 170 },
    { id: "lastAction", label: "Last Operation", minWidth: 170 },
];

const map = [
    "Manufactured",
    "Bought By Retailer",
    "Shipped From Manufacturer",
    "Received By Retailer",
    "Bought By Customer",
    "Shipped By Retailer",
    "Received at DistributionHub",
    "Shipped From DistributionHub",
    "Received By Customer",
];

export default function Explorer(props) {
    const classes = useStyles();
    const web3 = props.web3;
    const supplyChainContract = props.supplyChainContract;
    const [productData, setProductData] = React.useState([]);
    const [productHistory, setProductHistory] = React.useState([]);
    const [Text, setText] = React.useState(false);
    const navItem = [];

    const [modalData, setModalData] = React.useState([]);
    const [modalReceiptData, setModalReceiptData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [openReceipt, setOpenReceipt] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const receiptModalRef = useRef();

    const findProduct = async (search) => {
        var arr = [];
        var temp = [];
        setLoading(true);

        try {
            setProductData([]);
            setProductHistory([]);

            var a = await supplyChainContract.methods.getBasicProductDetails(parseInt(search), "product", 0).call();
            var b = await supplyChainContract.methods.getAdditionalProductDetails(parseInt(search), "product", 0).call();
            var c = await supplyChainContract.methods.getRetailerDistributionDetails(parseInt(search), "product", 0).call();

            temp.push(a);
            temp.push(b);
            temp.push(c);

            setProductData(temp);
            arr = [];
            var l = await supplyChainContract.methods.getProductHistoryLength(parseInt(search)).call();

            arr = [];
            for (var i = 0; i < l; i++) {
                var h = await supplyChainContract.methods.getBasicProductDetails(parseInt(search), "history", i).call();
                var k = await supplyChainContract.methods.getAdditionalProductDetails(parseInt(search), "history", i).call();
                var j = await supplyChainContract.methods.getRetailerDistributionDetails(parseInt(search), "history", i).call();
                var timestamp = await supplyChainContract.methods.getOperationTimestamp(parseInt(search), i).call();

                h.operationTimestamp = timestamp;

                temp = [];
                temp.push(h);
                temp.push(k);
                temp.push(j);
                arr.push(temp);
            }
            setProductHistory(arr);

        } catch (e) {
            setText(true);
            console.log(e);
        }
        setLoading(false);
    }

    const handleClose = () => setOpen(false);
    const handleCloseReceipt = () => setOpenReceipt(false);

    const handleClick = async (prod) => {
        await setModalData(prod);
        setOpen(true);
    };

    const fetchTxReceipt = async (hash) => {
        const receipt = await web3.eth.getTransactionReceipt(hash);
        console.log("Transaction Receipt Fetched:", receipt);
        setModalReceiptData(receipt);
        setOpenReceipt(true);
    };

    const handleOutsideClick = (e) => {
        if (receiptModalRef.current && !receiptModalRef.current.contains(e.target)) {
            handleCloseReceipt();
        }
    };

    useEffect(() => {
        if (openReceipt) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [openReceipt]);

    return (
        <div className={classes.pageWrap}>
            <Navbar navItems={navItem}>
                {loading ? (
                    <Loader />
                ) : (
                    <Container>
                        <ProductModal
                            prod={modalData}
                            open={open}
                            handleClose={handleClose}
                        />
                        <ReceiptModal
                            receipt={modalReceiptData}
                            openReceipt={openReceipt}
                            handleCloseReceipt={handleCloseReceipt}
                            receiptModalRef={receiptModalRef}
                        />
                        <h1 className={classes.pageHeading}>Search for a specific product</h1>
                        <CustomizedInputBase findProduct={findProduct} />
                        {productData.length !== 0 ? (
                            <>
                                <Grid container className={classes.Explorerroot} spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Paper className={classes.ProductPaper}>
                                            <div>
                                                <div className={classes.ExplorerdRow}>
                                                    ID: {productData[0][0].toString()}
                                                </div>
                                                <div className={classes.ExplorerdRow}>
                                                    Stock Keeping Unit: {productData[0][1].toString()}
                                                </div>
                                                <div className={classes.ExplorerdRow}>
                                                    Owner: {productData[0][2]}
                                                </div>
                                                <div className={classes.ExplorerdRow}>
                                                    Manufacturer: {productData[0][3]}
                                                </div>
                                                <div className={classes.ExplorerdRow}>
                                                    Manufacturer Name: {productData[0][4]}
                                                </div>
                                                <div className={classes.ExplorerdRow}>
                                                    Manufacturer Details: {productData[0][5]}
                                                </div>
                                                <div className={classes.ExplorerdRow}>
                                                    Manufacture Longitude: {productData[0][6]}
                                                </div>
                                                <div className={classes.ExplorerdRow}>
                                                    Manufacture Latitude: {productData[0][7]}
                                                </div>
                                                <div className={classes.ExplorerdRow}>
                                                    Manufactured date : {new Date(Number(productData[1][0]) * 1000).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZoneName: 'short' })}
                                                </div>

                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        console.log("DATA: ", productData);
                                                        handleClick(productData);
                                                    }}
                                                    style={{ margin: "10px auto" }}
                                                >
                                                    MORE DETAILS
                                                </Button>
                                            </div>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6} style={{ position: "relative" }}>
                                        <MapContainer prodData={productData} />
                                    </Grid>
                                </Grid>
                                <br />
                                <h1 className={classes.tableCount}> Product History</h1>
                                <Paper className={classes.TableRoot2}>
                                    <TableContainer className={classes.TableContainer}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align="center"
                                                            className={classes.TableHead}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))}
                                                    <TableCell
                                                        align="center"
                                                        className={classes.TableHead}
                                                    >
                                                        Operation Date
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        className={classes.TableHead}
                                                    >
                                                        Details
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        className={classes.TableHead}
                                                    >
                                                        Receipt
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {productHistory.length !== 0 ? (
                                                    productHistory.map((row) => {
                                                        const operationDate = new Date(Number(row[0].operationTimestamp) * 1000);
                                                        return (
                                                            <TableRow
                                                                hover
                                                                role="checkbox"
                                                                tabIndex={-1}
                                                                key={row[0][0]}
                                                            >
                                                                <TableCell
                                                                    className={classes.TableCell}
                                                                    align="center"
                                                                    onClick={() => handleClick(row)}
                                                                >
                                                                    {row[0][0].toString()}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={classes.TableCell}
                                                                    align="center"
                                                                    onClick={() => handleClick(row)}
                                                                >
                                                                    {row[0][4]}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={classes.TableCell}
                                                                    align="center"
                                                                    onClick={() => handleClick(row)}
                                                                >
                                                                    {row[1][1]}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={classes.TableCell}
                                                                    align="center"
                                                                    onClick={() => handleClick(row)}
                                                                >
                                                                    {formatPrice(row[1][3])}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={classes.TableCell}
                                                                    align="center"
                                                                    onClick={() => handleClick(row)}
                                                                >
                                                                    {row[0][2].length > 15
                                                                        ? row[0][2].substring(0, 15) + "..."
                                                                        : row[0][2]}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{ color: "#f00 !important" }}
                                                                    className={classes.TableCell}
                                                                    align="center"
                                                                >
                                                                    {map[row[1][5]]}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={classes.TableCell}
                                                                    align="center"
                                                                    onClick={() => handleClick(row)}
                                                                >
                                                                    {operationDate.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZoneName: 'short' })}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={classes.TableCell}
                                                                    align="center"
                                                                >
                                                                    <Button
                                                                        type="submit"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick={() => handleClick(row)}
                                                                    >
                                                                        DETAILS
                                                                    </Button>
                                                                </TableCell>

                                                                <TableCell
                                                                    className={classes.TableCell}
                                                                    align="center"
                                                                >
                                                                    <Button
                                                                        type="submit"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick={() => fetchTxReceipt(row[2][5])}
                                                                    >
                                                                        RECEIPT
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })
                                                ) : (
                                                    <></>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </>
                        ) : (
                            <>{Text ? <p>Product Not Found!</p> : <></>}</>
                        )}
                    </Container>
                )}
            </Navbar>
        </div>
    );
}
