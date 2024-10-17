import { Edit, Visibility } from "@mui/icons-material";
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import apiHelper from "../../Commen/ApiHelper";
import { Path } from "../../Commen/Path";
import { useNavigate } from "react-router-dom";

export default function ProductList({ Auth }) {
    const [PaginationModel, setPaginationModel] = useState({
        pageSize: 8,
        page: 0
    });
    const [Products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const result = await apiHelper.listProduct();
            setProducts([...result.data.data]);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const orderNewStock = async ({ _id, price }) => {
        try {
            const qty = Number(window.prompt("Please Enter a Number of packs."));
            if (!qty) return window.alert("Something went wrong with the entered number of packs");
            if (!window.confirm("Total Amount is " + (qty * price) + " INR. click Confirm to confirm Your order.")) return window.alert("Order not confimed by user !")
            const orderDetails = {
                orderedFor: Auth.adminDetails?._id,
                orderedBy: Auth._id,
                productId: _id,
                qty: qty,
                lastActionedBy: Auth._id,
                totalAmount: price * qty
            };
            await apiHelper.createOrder(orderDetails);
            navigate(Path.yourOrders)
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickOpen = (row) => {
        setSelectedProduct(row);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    const columns = [
        // { field: "_id", headerName: "ID", width: 100 },
        { field: "title", headerName: "Title", flex: 1 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "price", headerName: "Price(Rs.)", width: 100 },
        {
            field: "createdAt", headerName: "Actions", width: 250, renderCell: (cell) => {
                return <div className="d-flex gap-2 pt-2 align-items-center" key={cell._id}>
                    <IconButton color="primary" onClick={() => handleClickOpen(cell.row)}>
                        <Visibility />
                    </IconButton>
                    {
                        Auth.role < 1 && <IconButton color="primary" onClick={() => navigate(Path.updateProduct.split(":id")[0] + cell.row._id)}>
                            <Edit />
                        </IconButton>
                    }
                    {/* <IconButton  color="error">
                        <Delete />
                    </IconButton> */}
                    {Auth.adminDetails && <Button onClick={() => orderNewStock({ ...cell.row })} size="small" color="success" variant="outlined">
                      Add in stock
                    </Button>}
                </div>
            }
        }
    ];

    return (
        <>
            <div className="d-flex mb-3 justify-content-between">
                <h3>Products</h3>
                {Auth.role < 1 && <Button variant="outlined" onClick={() => navigate(Path.addProduct)} >Add Product</Button>}
            </div>
            <DataGrid
                rows={Products}
                columns={columns}
                style={{ minHeight: 200 }}
                autoHeight
                getRowId={(e) => e._id}
                paginationModel={PaginationModel}
                pagination={true}
                onPaginationModelChange={(e) => {
                    setPaginationModel({ ...PaginationModel, page: e.page })
                }}
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="product-details-dialog" style={{ zIndex: 100000000 }}>
                <DialogTitle id="product-details-dialog">Product Details</DialogTitle>
                <DialogContent>
                    {selectedProduct && (
                        <>
                            <Typography>Product Image: <img src={selectedProduct.productImage.url} alt={selectedProduct.productImage.name} style={{ maxWidth: '100%' }} /></Typography>
                            <Typography>Title: {selectedProduct.title}</Typography>
                            <Typography>Name: {selectedProduct.name}</Typography>
                            <Typography>Price: {selectedProduct.price}</Typography>
                            <Typography>Content: <span dangerouslySetInnerHTML={{ __html: selectedProduct.content }} /></Typography>
                            <Typography>Description: <span dangerouslySetInnerHTML={{ __html: selectedProduct.discription }} /></Typography>
                            <Typography>Benefits: <span dangerouslySetInnerHTML={{ __html: selectedProduct.benefits }} /></Typography>
                            <Typography>Category: {selectedProduct.category.name}</Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
