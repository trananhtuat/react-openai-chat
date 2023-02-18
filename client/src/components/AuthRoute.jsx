import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCheckTkn } from "../api/user.api";
import Loading from "./Loading";
import Header from "./Header";

const AuthRoute = (props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);

      const { response, err } = await userCheckTkn();

      if (err) {
        localStorage.removeItem("tkn");
        setIsLoading(false);
      }

      if (response) navigate("/");
    };

    const tkn = localStorage.getItem("tkn");

    if (tkn) checkToken();
    else setIsLoading(false);
  }, [navigate]);

  return (
    isLoading ? (
      <Loading />
    ) : (
      <Container
        component="main"
        maxWidth="md"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Header>
          <Typography variant="h5" fontWeight="600">
            AI Chat
          </Typography>
        </Header>

        <Box width="100%">
          {props.children}
        </Box>

        <Box padding={2}>
          <Typography variant="caption" color="primary">
            youtube.com/tuattrananh
          </Typography>
        </Box>
      </Container>
    )
  );
};

export default AuthRoute;