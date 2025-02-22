import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import {
  TextField,
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

function Enquiry() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });
    
     const [enquiries, setEnquiries] = useState([]);

     const fetchEnquiries = async () => {
       try {
         const response = await axios.get(
           "http://localhost:3000/enquiry/getEnquiries"
         );
         setEnquiries(response.data.enquiries);
       } catch (error) {
         console.error("Error fetching enquiries:", error);
       }
     };

     useEffect(() => {
       fetchEnquiries(); 
     }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/enquiry/createEnquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert("Form submitted successfully");
        setFormData({ fullName: "", email: "", mobileNumber: "", message: "" });
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ textAlign: "center", marginBottom: 2 }}
      >
        Enquiry Form
      </Typography>

      <form ref={formRef} onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <label>Full Name *</label>
            <TextField
              fullWidth
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item lg={6} xs={12}>
            <label>Email *</label>
            <TextField
              fullWidth
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item lg={6} xs={12}>
            <label>Mobile Number *</label>
            <TextField
              fullWidth
              variant="outlined"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              inputProps={{ type: "tel", maxLength: 10 }}
            />
          </Grid>

          <Grid item xs={12}>
            <label>Message</label>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ marginBottom: 2, display: "flex", justifyContent: "center" }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                boxShadow: "none",
                backgroundColor: "green",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "green",
                  boxShadow: "none",
                  borderRadius: "20px",
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" fontWeight={600}>
          Submitted Enquiries
        </Typography>
        <List>
          {enquiries.length > 0 ? (
            enquiries.map((enquiry, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${enquiry.fullName} (${enquiry.email})`}
                  secondary={`Mobile: ${enquiry.mobileNumber} | Message: ${enquiry.message}`}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No enquiries submitted yet.</Typography>
          )}
        </List>
      </Box>
    </Box>
  );
}

export default Enquiry;
