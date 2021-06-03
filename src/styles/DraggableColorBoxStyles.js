const styles = {
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-5px',
        "&:hover $deleteIcon": {
            color: 'white',
            transform: "scale(1.5)"
        }
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        padding: '10px',
        left: '0',
        bottom: '0',
        color: 'black',
        letterSpacing: '1',
        textTransform: 'uppercase',
        fontSize: '12px',
        display: "flex",
        justifyContent: "space-between",
    },
    deleteIcon: {
        color: 'black',
        transition: "all 0.3s ease-in-out"
    }
};

export default styles;