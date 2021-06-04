import sizes from './mediaSizes';

export default {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
            width: "60%"
        },
        [sizes.down("xl")]: {
            width: "70%"
        },
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        "& a": {
            color: "#fff"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2.5rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)",
            gridGap: "1.5rem",
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1.5rem",
        },
    }
};