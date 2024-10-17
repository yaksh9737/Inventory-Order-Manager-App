import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Typography,
  Divider,
  Button,
  Stack,
  Snackbar,
  Alert
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import apiHelper from "../Commen/ApiHelper";
import Constents from "../Commen/Constents";

export default function OrderDetails() {
  const [product, setProduct] = useState([]);
  let [totalAmount, setTotalAmount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const userDetails = Constents.getUserDetails();

  const getOrder = async () => {
    try {
      const query = {
        role: userDetails.role || "NAN",
        deliveryStatus: "NAN",
        orderStatus: "NAN",
        productId: "NAN",
        orderedBy: userDetails._id || "NAN",
        city: userDetails.city || ""
      };
      let keys = Object.keys(query);
      let tmp = "?";
      keys.forEach((x) => {
        if (query[x] !== "NAN" && query[x] !== undefined) {
          tmp += (x + "=" + query[x] + "&");
        }
      });
      if (tmp[tmp.length - 1] === "&") {
        tmp = tmp.substring(0, tmp.length - 1);
      }
      const result = await apiHelper.listOrder(tmp.length <= 1 ? "" : tmp);
      setProduct(result.data.data);
      result.data.data.forEach((x) => setTotalAmount((totalAmount += x.totalAmount)));
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelivery = async (index) => {
    try {
      const item = product[index];
      const data = {
        _id: item._id,
        paymentMethod: item.paymentMethod,
        paymentStatus: 1,
        orderedBy: item.orderedBy._id,
        orderStatus: item.orderStatus,
        deliveryStatus: 1,
        deliveryDue: item.deliveryDue,
        lastActionedBy: item.lastActionedBy,
        qty: item.qty,
        productId: item.productId._id
      };
      await apiHelper.updateOrder(data);
      setSnackbarMessage("Delivery Confirmed Successfully");
      setSnackbarOpen(true);
      getOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Box
        component="section"
        sx={{ 
          height: "100%", 
          background: "linear-gradient(135deg, #f5f5f5 30%, #ffffff 100%)", 
          py: 5 
        }}
      >
        <Container sx={{ height: "100%" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Grid item lg={10} xl={8}>
              <Card sx={{ borderRadius: "12px", mb: 4 }}>
                <CardHeader
                  title={
                    <Typography variant="h5" color="white">
                      Thanks for your Order,{" "}
                      <span style={{ color: "#FFD700" }}>{userDetails.fullName}</span>
                    </Typography>
                  }
                  sx={{ px: 4, py: 4, backgroundColor: "#6A1B9A", color: "white" }}
                />
                <CardContent sx={{ p: 4 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={4}
                  >
                    <Typography variant="h6" sx={{ color: "#6A1B9A" }}>
                      Your Order
                    </Typography>
                  </Box>
                  {product.map((item, index) => (
                    <Card
                      key={item._id}
                      variant="outlined"
                      sx={{
                        mb: 4,
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <CardMedia
                              component="img"
                              image={item.productId.productImage.url}
                              alt="Product"
                              sx={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "10px",
                                objectFit: "cover"
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="h6" color="text.primary">
                              {item.productId.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.productId.category.name}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                              <Typography variant="body2" color="text.secondary">
                                Quantity: {item.qty}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                              <Typography variant="h6" color="text.primary">
                                ₹ {item.totalAmount}
                              </Typography>
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                              <LocalShippingIcon color="action" />
                              <Typography variant="body2" color="text.secondary">
                                Delivery Status: {Constents.deliveryStatus[item.deliveryStatus]}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                              <AccessTimeIcon color="action" />
                              <Typography variant="body2" color="text.secondary">
                                Delivery Due: {new Date(item.deliveryDue).toLocaleDateString()}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                              <CheckCircleIcon color="action" />
                              <Typography variant="body2" color="text.secondary">
                                Order Status: {Constents.orderStatus[item.orderStatus]}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                              <AttachMoneyIcon color="action" />
                              <Typography variant="body2" color="text.secondary">
                                Payment Method: {Constents.paymentMethod[item.paymentMethod]}
                              </Typography>
                            </Stack>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              mt={2}
                            >
                              <Button
                                variant="contained"
                                color={item.deliveryStatus === 1 ? "success" : "primary"}
                                onClick={() => confirmDelivery(index)}
                                disabled={item.deliveryStatus < 2 || item.deliveryStatus === 1}
                                sx={{
                                  transition: "background-color 0.3s",
                                  ":hover": {
                                    backgroundColor:
                                      item.deliveryStatus === 1
                                        ? "#4caf50"
                                        : "#1976d2",
                                  },
                                }}
                              >
                                {item.deliveryStatus === 1
                                  ? "Delivered"
                                  : "Confirm Delivery"}
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
                <CardActions
                  sx={{
                    px: 4,
                    py: 4,
                    backgroundColor: "#6A1B9A",
                    color: "white",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px"
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      textTransform: "uppercase",
                    }}
                  >
                    Total Amount: <span className="h4 ms-2">₹ {totalAmount}</span>
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
