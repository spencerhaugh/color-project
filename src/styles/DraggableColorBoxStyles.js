import sizes from './mediaSizes';
import chroma from 'chroma-js';

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
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "20%",
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%",
        },
        [sizes.down("sm")]: {
            width: "100%",
            height: "5%",
        },
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        padding: '10px',
        left: '0',
        bottom: '0',
        color: props => chroma(props.color).luminance() <= .2 ? "rgba(255,255,255,0.8)" : "#333",
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