import { useState } from "react";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";

import useShoppingCart from "../hooks/useShoppingCart";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Header from "./components/header/Header";
import React from "react";

function Contact() {
  const { shoppingCart } = useShoppingCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Clear form after submission (optional)
    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
  };

  return (
    <>
      <Box style={{ margin: 0 }}>
        <Header shoppingCart={shoppingCart} />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21006.256508195936!2d2.3180921847656686!3d48.8432955822624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671ef9e7dda15%3A0xd09f9f377dd84a37!2sTibet%20Art!5e0!3m2!1sfr!2sfr!4v1706642451746!5m2!1sfr!2sfr"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </Box>
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant="h3"
          sx={{ marginTop: "2rem" }}
          gutterBottom
        >
          Contactez-nous
        </Typography>
        <Typography variant="body1" component="p">
          Si vous avez des questions concernant la taille, des difficultés à
          passer votre commande, ou toute autre information que vous souhaitez
          nous communiquer, n'hésitez pas à nous contacter. Remplissez le
          formulaire de contact ci-dessous ou envoyez-nous un courriel à
          l'adresse tibetartfr@hotmail.com Nous sommes toujours à votre
          disposition
        </Typography>

        <Container sx={{ marginTop: "2rem" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Container>

        <Container>
          <IconButton aria-label="facebook">
            <Facebook />
          </IconButton>
          <IconButton aria-label="instagram">
            <Instagram />
          </IconButton>
          <IconButton aria-label="youtube">
            <YouTube />
          </IconButton>
        </Container>
      </Container>
    </>
  );
}

export default Contact;
