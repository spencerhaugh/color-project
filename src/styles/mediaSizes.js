// Extra small devices (portrait phones, less than 576px)
// @media(max-width: 576px) { ... }

// Small devices (landscape phones, 576px and up)
// @media(max-width: 768px) { ... }

// Medium devices (tablets, 768px and up)
// @media(max-width: 992px) { ... }

// Large devices (desktops, 992px and up)
// @media(max-width: 1200px) { ... }

// Extra large devices (large desktops, 1200px and up)
// No media query for `xl` since this is the default in this app

export default {
    up() {

    },
    down(size) {
        const sizes = {
            xs: "576px",
            sm: "768px",
            md: "992px",
            lg: "1200px",
            xl: "1500px"
        }
        return `@media(max-width: ${sizes[size]})`
    }
}