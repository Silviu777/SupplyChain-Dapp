import React, { useRef } from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import { useStyles } from "./Styles";

export default function ReceiptModal({ receipt, openReceipt, handleCloseReceipt }) {
    const classes = useStyles();
    const receiptModalRef = useRef();

    const totalGasCostInEther = receipt ?
        (Number(receipt.effectiveGasPrice) * Number(receipt.gasUsed) / 10 ** 18).toFixed(6) : 0;

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openReceipt}
            onClose={handleCloseReceipt}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openReceipt}>
                <div className={classes.Receiptpaper} ref={receiptModalRef}>
                    <h1 className={classes.pageHeadingReceipt}>Receipt</h1>
                    <div>
                        {receipt !== null ? (
                            <>
                                <div className={classes.dRow}>
                                    <div className={classes.dCol1}>Transaction hash: </div>
                                    <div className={classes.dCol2}>{receipt.transactionHash}</div>
                                </div>
                                <div className={classes.dRow}>
                                    <div className={classes.dCol1}>Block hash: </div>
                                    <div className={classes.dCol2}>{receipt.blockHash}</div>
                                </div>
                                <div className={classes.dRow}>
                                    <div className={classes.dCol1}>Block Number: </div>
                                    <div className={classes.dCol2}>{Number(receipt.blockNumber)}</div>
                                </div>
                                <div className={classes.dRow}>
                                    <div className={classes.dCol1}>From: </div>
                                    <div className={classes.dCol2}>{receipt.from}</div>
                                </div>
                                <div className={classes.dRow}>
                                    <div className={classes.dCol1}>To: </div>
                                    <div className={classes.dCol2}>{receipt.to}</div>
                                </div>
                                <div className={classes.dRow}>
                                    <div className={classes.dCol1}>Gas: </div>
                                    <div className={classes.dCol2}>{Number(receipt.gasUsed)}</div>
                                </div>
                                <div className={classes.dRow}>
                                    <div className={classes.dCol1}>Transaction Value: </div>
                                    <div className={classes.dCol2}>{totalGasCostInEther} ETH</div>
                                </div>
                                <div className={classes.dRow}>
                                    <div className={classes.dCol1}>Status: </div>
                                    <div className={classes.dCol2}>
                                        {Number(receipt.status) === 1 ? 'Processed' : 'Failed'}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <> </>
                        )}
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}
