import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({

    pageWrap: {
        background: "linear-gradient(54deg, rgba(3,15,30,1) 55%, rgba(6,22,40,1) 60%, rgba(10,30,47,1) 64%, rgba(20,41,70,1) 72%, rgba(36,56,86,1) 79%, rgba(53,73,100,1) 84%, rgba(70,89,115,1) 88%, rgba(95,112,135,1) 93%, rgba(120,136,155,1) 96%, rgba(150,165,190,1) 98%, rgba(200,200,210,1) 99%)",
        height: "100vh",
        width: "100vw",
        margin: "0",
        padding: "0",
        overflow: "auto",
        textAlign: "center",
        color: "#FFFFFF",
        position: "relative",

        boxShadow: "inset 0 0 10px 1px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.3)"
    },

    assignPage: {
        background: "linear-gradient(58deg, rgba(45,60,80,1) 43%, rgba(55,70,90,1) 56%, rgba(65,80,100,1) 65%, rgba(75,90,110,1) 72%, rgba(85,100,120,1) 79%, rgba(95,110,130,1) 84%, rgba(105,120,140,1) 88%, rgba(115,130,150,1) 93%, rgba(125,140,160,1) 96%, rgba(135,150,170,1) 98%, rgba(145,160,180,1) 99%)",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "inset 0 0 10px 1px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.3)",
        color: "#FFFFFF",
        margin: "20px",
        textAlign: "center"
    },

    noWrap: {
        whiteSpace: 'nowrap',
    },

    textField: {
        '& .MuiInputBase-input': {
            color: 'white',
        },
        '& .MuiInputLabel-outlined': {
            color: 'white',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
        '& input:-webkit-autofill': {
            'background-color': '#465a69 !important',
            '-webkit-box-shadow': '0 0 0 1000px #425167 inset !important',
            '-webkit-text-fill-color': 'white !important',
        },
        '& input:-webkit-autofill:hover': {
            'background-color': '#465a69 !important',
            '-webkit-box-shadow': '0 0 0 1000px #4c5d76 inset !important',
            '-webkit-text-fill-color': 'white !important',
        },
        '& input:-webkit-autofill:focus': {
            'background-color': '#465a69 !important',
            '-webkit-box-shadow': '0 0 0 1000px #465a69 inset !important',
            '-webkit-text-fill-color': 'white !important',
        },
        '& input:-webkit-autofill:active': {
            'background-color': '#465a69 !important',
            '-webkit-box-shadow': '0 0 0 1000px #465a69 inset !important',
            '-webkit-text-fill-color': 'white !important',
        },
    },

    rolesTextField: {
        width: '70%',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'lightSlateGray',
            },
            '&:hover fieldset': {
                borderColor: 'lightSlateGray',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'lightSlateGray',
            },
        },
        '& .MuiInputBase-input': {
            color: 'white',
        },
        '& .MuiInputLabel-outlined': {
            color: 'white',
        },
    },

    assignButton: {
        backgroundColor: "#0a2f5a",
        color: "#FFFFFF",
        '&:hover': {
            backgroundColor: "#0c3d73"
        },
    },

    pageHeading: {
        textAlign: "center",
        margin: "20px auto 40px auto",
        padding: 0,
        color: "#FFFF",
        fontSize: "2.4rem",

    },

    pageHeadingReceipt: {
        textAlign: "center",
        margin: "20px auto 40px auto",
        padding: 0,
        color: "#5677A2",
        fontSize: "2.2rem",

    },

    pageHeadingReceipt: {
        textAlign: "center",
        margin: "20px auto 40px auto",
        padding: 0,
        color: "#001861",
        fontSize: "2.2rem",
    },

    TableRoot: {
        width: "100%",
        maxWidth: 1200,
        margin: "5px auto",
        border: "2px solid #1a237e",
        borderRadius: 10,
        boxShadow: "2px 2px 10px #9fa8da",
    },

    TableContainer: {
        maxHeight: 500,
        borderRadius: 7,
    },

    container: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
    },

    AddressCell: {
        maxWidth: 150,
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    tableCount: {
        textAlign: "center",
        fontSize: "33px",
        margin: "10px auto",
        marginTop: "40px",
        padding: 0,
        color: "#AED6F2",
    },

    tableCountAddresses: {
        textAlign: "center",
        fontSize: "20px",
        margin: "10px auto",
        marginTop: "40px",
        padding: 0,
        color: "#AED6F2",
    },

    // #002D72 -- good
    TableHead: {
        backgroundColor: "#00356B !important",
        color: "#fff !important",
        fontSize: "15px",
        fontWeight: "bold"
    },

    TableCell: {
        color: "#1a237e !important"
    },

    FormWrap: {
        maxWidth: 900,
        margin: "30px auto",
        padding: 20,
        borderRadius: 10,
        boxShadow: "2px 2px 10px #9fa8da",
        background: "linear-gradient(58deg, rgba(45,60,80,1) 36%, rgba(55,70,90,1) 50%, rgba(65,80,100,1) 60%, rgba(75,90,110,1) 68%, rgba(85,100,120,1) 73%, rgba(95,110,130,1) 79%, rgba(105,120,140,1) 84%, rgba(115,130,150,1) 93%, rgba(125,140,160,1) 96%, rgba(135,150,170,1) 98%, rgba(145,160,180,1) 99%)",
        // padding: "20px",
        borderRadius: "10px",
        boxShadow: "inset 0 0 10px 1px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 0, 0, 0.3)",
        color: "#FFFFFF",
        // margin: "20px",
        textAlign: "center"
    },

    RoleForm: {
        display: "flex",
        alignItems: "center",
        margin: "20px auto",
    },

    Explorerroot: {
        padding: "2px 4px",
        margin: "10px",
        width: "100%",
    },

    ProductPaper: {
        padding: 10,
        borderRadius: 10,
        boxShadow: "2px 2px 10px #9fa8da",
        border: "2px solid #1a237e",
    },

    ExplorerdRow: {
        width: "100%",
        borderBottom: `0px solid #222`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: "0 auto",
        fontWeight: 600,
        color: "#1a237e",
    },

    TableRoot2: {
        width: "100%",
        maxWidth: 1300,
        margin: "5px auto",
        border: "2px solid #1a237e",
        borderRadius: 10,

        boxShadow: "2px 2px 10px #9fa8da",
    },

    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    paper: {
        backgroundColor: "#fff",
        padding: 15,
        outline: "none",
        width: "min(90%, 650px)",
        height: "80%",
        border: "2px solid #1a237e",
        borderRadius: 10,
        boxShadow: "2px 2px 10px #9fa8da",
        overflow: "scroll",
    },

    Receiptpaper: {
        backgroundColor: "#ECEEF2",
        // border: "0px solid #000",
        padding: 2,
        outline: "none",
        width: "min(95%, 950px)",
        height: "444px",
        border: "2px solid #1a237e",
        borderRadius: 10,
        boxShadow: "2px 2px 10px #9fa8da",
        overflow: "scroll",
    },

    dRow: {
        width: "100%",
        borderBottom: `1px solid #222`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: "0 auto",
    },

    dCol1: {
        width: "30%",
        textAlign: "left",
        fontWeight: 600,
        color: "#1a237e",
        fontSize: "14.5px",
    },

    dCol2: {
        width: "70%",
        textAlign: "left",
        fontWeight: 600,
        color: "#1a237e",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    HomeBtn: {
        backgroundColor: "#1E90FF",
        color: "#021B33",
        margin: "10px",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        boxSizing: "border-box",
        transition: "background-color 0.2s ease-in-out, transform 0.2s ease-in-out",
        '&:hover': {
            backgroundColor: "#00BFFF"
        },
        position: "relative",
    },

    HomeCardWrap: {
        maxWidth: 500,
        width: "90%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#2A4B78", // Medium Blue
        color: "#FFFFFF", // White
        border: "1px solid #00BFFF", // Neon Blue
        boxShadow: "0 0 10px #00BFFF", // Subtle Glow
        margin: "10px auto",
        position: "relative"
    }
});
