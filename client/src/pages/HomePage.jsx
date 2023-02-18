import Header from "../components/Header";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { chatCompletion } from "../api/chat.api";
import { toast } from "react-toastify";
import TypeWriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Stack, Box, Typography, IconButton, FormControl, OutlinedInput, CircularProgress } from "@mui/material";

const messageType = {
  answer: "answer",
  question: "question"
};

const HomePage = () => {
  const username = localStorage.getItem("username");

  const navigate = useNavigate();
  const inputRef = useRef();
  const chatWrapperRef = useRef();

  const [onRequest, setOnRequest] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const getAnswer = async () => {
    if (onRequest) return;

    const newMessages = [...messages, {
      type: messageType.question,
      content: question
    }];

    setMessages(newMessages);
    setQuestion("");
    setOnRequest(true);

    const { response, err } = await chatCompletion({ prompt: question });

    if (response) {
      setMessages([...newMessages, {
        type: messageType.answer,
        content: response.text
      }]);
    }

    if (err) {
      toast.error(err.message);
      setOnRequest(false);
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) getAnswer();
  };

  const onSignOut = () => {
    localStorage.removeItem("tkn");
    navigate("/signin");
  };

  useEffect(() => {
    setTimeout(() => {
      chatWrapperRef.current.addEventListener("DOMNodeInserted", e => {
        e.currentTarget.scroll({
          top: e.currentTarget.scrollHeight,
          behavior: "smooth"
        });
      });
    }, 200);
  }, []);

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >
      <Header bg borderBottom>
        <Box sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          paddingX: 2,
          maxWidth: "md"
        }}>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            {username}
          </Typography>
          <IconButton
            onClick={onSignOut}
            sx={{
              position: "absolute",
              top: "50%",
              right: "16px",
              transform: "translateY(-50%)"
            }}
          >
            <LogoutOutlinedIcon />
          </IconButton>
        </Box>
      </Header>

      <Box ref={chatWrapperRef} sx={{
        height: "100%",
        position: "fixed",
        zIndex: 1,
        maxWidth: "md",
        width: "100%",
        overflowY: "auto",
        paddingTop: "60px",
        paddingBottom: "90px",
        "&::-webkit-scrollbar": {
          width: "0px"
        }
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          maxWidth: "md",
          width: "100%"
        }}>
          {messages.map((item, index) => (
            <Box key={index} padding={1}>
              <Box sx={{
                padding: 2,
                bgcolor: item.type === messageType.answer && "#2f2f2f",
                borderRadius: 3
              }}>
                {index === messages.length - 1 ? (
                  item.type === messageType.answer ? (
                    <TypeWriter onInit={(writer) => {
                      writer.typeString(item.content)
                        .callFunction(() => {
                          document.querySelector(".Typewriter__cursor").style.display = "none";

                          setOnRequest(false);
                          setTimeout(() => {
                            inputRef.current.focus();
                          }, 200);
                        })
                        .changeDelay(50)
                        .start();
                    }} />
                  ) : item.content
                ) : (
                  item.content
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Stack
        width="100%"
        alignItems="center"
        justifyContent="center"
        borderTop="1px solid #2c2c2c"
        bgcolor="#000"
        zIndex={3}
      >
        <Box
          padding={2}
          width="100%"
          maxWidth="md"
        >
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              inputRef={inputRef}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none"
                }
              }}
              endAdornment={
                onRequest ? (
                  <CircularProgress size="1.5rem" />
                ) : (
                  <SendOutlinedIcon />
                )
              }
              autoFocus
              disabled={onRequest}
              onKeyUp={onEnterPress}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something..."
            />
          </FormControl>
        </Box>
      </Stack>
    </Stack>
  );
};

export default HomePage;