import { Box } from "@mui/material";

const Header = (props) => {
  return (
    <Box sx={{
      zIndex: 2,
      width: "100%",
      height: 60,
      bgcolor: props.bg && "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: props.borderBottom && "1px solid #2c2c2c"
    }}>
      {props.children}
    </Box>
  );
};

export default Header;