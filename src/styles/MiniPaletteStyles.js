
const styles = {
    root: {
        backgroundColor: "#fff",
        borderRadius: "5px",
        padding: ".5rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover $deleteIcon": {
            opacity: 1
        }
    },
    colors: {
        backgroundColor: "grey",
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "#000",
        paddingTop: ".5rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji: {
        marginLeft: ".5rem",
        fontSize: "1.5rem"
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3px"
    },
    deleteIcon: {
        color: "#fff",
        backgroundColor: "#eb3d30",
        width: "20px",
        height: "20px",
        padding: ".5rem",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 5,
        opacity: 0,
        transition: "all .4s ease-in-out"
    }
};

export default styles;