import { Button, Chip, IconButton, InputAdornment, MenuItem, Select, TextField, Tooltip } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import Constents from "../../Commen/constents"
import { Search, Visibility } from "@mui/icons-material"
import apiHelper from "../../Commen/ApiHelper"
import { Link, useNavigate } from "react-router-dom"
import { Path } from "../../Commen/Path"

export default function OrderList({ Auth }) {
    const [PaginationModel, setPaginationModel] = useState({
        pageSize: 8,
        page: 0
    })
    const query = Constents.getQuery()
    const navigate = useNavigate()
    const [Query, setQuery] = useState({
        role: query.role || (Auth.role + 1),
        deliveryStatus: query.deliveryStatus || "NAN",
        orderStatus: query.orderStatus || "NAN",
        productId: query.productId || "NAN",
        city: query.city || (Auth.role > 0 ? Auth.city : "NAN")
    })
    const [Citys, setCitys] = useState([])
    const [Products, setProducts] = useState([])
    const [Orders, setOrders] = useState([])
    const [FilteredOrders, setFilteredOrders] = useState([])

    const getOrderlist = async () => {
        try {
            let keys = Object.keys(Query)
            let tmp = "?"
            keys.forEach((x) => {
                if (Query[x] !== "NAN" && Query[x] !== undefined) {
                    tmp += (x + "=" + Query[x] + "&")
                }
            })
            if (tmp[tmp.length - 1] === "&") {
                tmp = tmp.substring(0, tmp.length - 1)
            }
            const result = await apiHelper.listOrder(tmp.length <= 1 ? "" : tmp)
            setOrders([...result.data.data])
            setFilteredOrders([...result.data.data])
            navigate(Path.orderlist + (tmp.length <= 1 ? "" : tmp))
        } catch (error) {
            console.log(error)
        }
    }

    const getCitys = async () => {
        try {
            const result = await apiHelper.listUser(1)
            setCitys(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getProducts = async () => {
        try {
            const result = await apiHelper.listProduct()
            setProducts(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getOrderlist()
        // eslint-disable-next-line 
    }, [Query])

    useEffect(() => {
        getProducts()
        getCitys()
    }, [])


    const columns = [
        // { field: "_id", headerName: "ID", width: 200, renderCell: (cell) => <Link className="text-primary" style={{ textDecoration: "underline" }} to={Path.orderdetails.split(":")[0] + cell.row?._id}>{cell.row?._id} </Link> },
        {
            field: "product", headerName: "Product", width: 200, renderCell: (cell) => {
                if (cell.row?.productId && cell.row?.productId?._id) {
                    return <Tooltip title={cell.row.productId.title}>
                        <span style={{ cursor: "pointer" }}> {cell.row.productId.title}</span>
                    </Tooltip>
                }
                return "N/A"
            }
        },
        {
            field: "orderedBy", headerName: "Ordered By", width: 150, renderCell: (cell) => {
                if (cell.row?.orderedBy && cell.row?.orderedBy?._id) {
                    return <Tooltip title={cell.row.orderedBy.fullName}>
                        <span style={{ cursor: "pointer" }}> {cell.row.orderedBy.fullName}</span>
                    </Tooltip>
                }
                return "N/A"
            }
        },
        {
            field: "orderStatus", headerName: "OrderStatus", width: 150, renderCell: (cell) => {
                return <Chip style={{ width: "100px" }} color={cell.row?.orderStatus < 1 ? "warning" : cell.row?.orderStatus < 2 ? "info" : cell.row?.orderStatus < 3 ? "success" : "error"} label={Constents.orderStatus[cell.row?.orderStatus]?.toUpperCase()} />

            }
        },
        {
            field: "deliveryStatus", headerName: "Delivery Status", width: 150, renderCell: (cell) => {
                return <Chip style={{ width: "100px" }} color={cell.row?.deliveryStatus < 1 ? "warning" : cell.row?.deliveryStatus < 2 ? "success" : "error"} label={Constents.deliveryStatus[cell.row?.deliveryStatus]?.toUpperCase()} />

            }
        },
        {
            field: "deliveryDue", headerName: "Delivery Due", width: 150, renderCell: (cell) => {
                let date = new Date(cell.row?.deliveryDue)
                date = date.toString()
                date = date.substring(0, date.length - 40)
                return date
            }
        },
        {
            field: "OrderedAt", headerName: "Ordered AT", width: 150, renderCell: (cell) => {
                let date = new Date(cell.row?.createdAt)
                date = date.toString()
                date = date.substring(0, date.length - 40)
                return date
            }
        },
        {
            field: "action", width: 100, renderCell: (cell) => {
                if (cell.row?._id) {
                    return <IconButton onClick={(e) => navigate(Path.orderdetails.split(":")[0] + cell.row._id)}>
                        <Tooltip title={"Click To View Order Details"}>
                            <Visibility color="primary" />
                        </Tooltip >
                    </IconButton>
                }
                return "N/A"
            }
        }

    ]

    return <>
        <div className="d-flex justify-content-between mb-3">
            <h3>Your Customer Orders</h3>
            {Auth.role <= 0 && <Button variant="outlined" onClick={() => setQuery({
                role: Auth.role + 1,
                orderStatus: "NAN",
                deliveryStatus: "NAN",
                productId: "NAN",
                city: "NAN",

            })}>Clear Filter</Button>}
        </div>
        {
            Auth.role <= 0 && <div style={{ maxWidth: "100%", flexWrap: "warp" }} className="row m-0 mb-3">
                <div className="col-lg-2 col-6 col-md-3">
                    <Select fullWidth value={Query.role} onChange={(e) => setQuery({ ...Query, role: Number(e.target.value) || Auth.role + 1 })}>
                        <MenuItem value={1}>{Constents.roles[1]}</MenuItem>
                        <MenuItem value={2}>{Constents.roles[2]}</MenuItem>
                    </Select>
                </div>
                <div className="col-lg-2 col-6 col-md-3 mb-2">
                    <Select fullWidth value={Query.orderStatus} onChange={(e) => setQuery({ ...Query, orderStatus: !isNaN(Number(e.target.value)) ? Number(e.target.value) : "NAN" })}>
                        <MenuItem value={"NAN"}>--Filter Order Status--</MenuItem>
                        <MenuItem value={0}>{Constents.orderStatus[0]}</MenuItem>
                        <MenuItem value={1}>{Constents.orderStatus[1]}</MenuItem>
                        <MenuItem value={2}>{Constents.orderStatus[2]}</MenuItem>
                        <MenuItem value={3}>{Constents.orderStatus[3]}</MenuItem>
                    </Select>
                </div>
                <div className="col-lg-2 col-6 col-md-3 mb-2">
                    <Select fullWidth value={Query.deliveryStatus} onChange={(e) => setQuery({ ...Query, deliveryStatus: !isNaN(Number(e.target.value)) ? Number(e.target.value) : "NAN" })}>
                        <MenuItem value={"NAN"}>--Filter Delevery Status--</MenuItem>
                        <MenuItem value={0}>{Constents.deliveryStatus[0]}</MenuItem>
                        <MenuItem value={1}>{Constents.deliveryStatus[1]}</MenuItem>
                        <MenuItem value={2}>{Constents.deliveryStatus[2]}</MenuItem>
                    </Select>
                </div>
                <div className="col-lg-2 col-6 col-md-3 mb-2">
                    <Select fullWidth value={Query.city} onChange={(e) => setQuery({ ...Query, city: e.target.value })} >
                        <MenuItem value={"NAN"}>--Filter With City--</MenuItem>
                        {
                            Citys?.map((x) => {
                                return <MenuItem key={x} value={x.city}>{x.city}</MenuItem>
                            })
                        }
                    </Select>
                </div>
                <div className="col-lg-2 col-6 col-md-3 mb-2">
                    <Select fullWidth value={Query.productId} onChange={(e) => setQuery({ ...Query, productId: e.target.value })}>
                        <MenuItem value={"NAN"}>--Filter With Products--</MenuItem>
                        {
                            Products?.map((x) => {
                                return <MenuItem key={x._id} value={x._id}>{x.title}</MenuItem>
                            })
                        }
                    </Select>
                </div>
                <div className="col-lg-2 col-6 col-md-3 mb-2">
                    <TextField
                        onChange={(e) => {
                            setFilteredOrders(Orders?.filter((x) => x.orderedBy?.fullName.includes(e.target.value)))
                            if (e.target.value.length <= 0) return getOrderlist()
                        }}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}

                        placeholder="Search Customer Fullname" />
                </div>

            </div >
        }
         {
            Auth.role == 1 && <div style={{ maxWidth: "100%", flexWrap: "warp" }} className="row m-0 mb-3">
                <div className="col-lg-2 col-6 col-md-3 mb-2">
                    <Select fullWidth value={Query.orderStatus} onChange={(e) => setQuery({ ...Query, orderStatus: !isNaN(Number(e.target.value)) ? Number(e.target.value) : "NAN" })}>
                        <MenuItem value={"NAN"}>--Filter Order Status--</MenuItem>
                        <MenuItem value={0}>{Constents.orderStatus[0]}</MenuItem>
                        <MenuItem value={1}>{Constents.orderStatus[1]}</MenuItem>
                        <MenuItem value={2}>{Constents.orderStatus[2]}</MenuItem>
                        <MenuItem value={3}>{Constents.orderStatus[3]}</MenuItem>
                    </Select>
                </div>
                <div className="col-lg-2 col-6 col-md-3 mb-2">
                    <Select fullWidth value={Query.deliveryStatus} onChange={(e) => setQuery({ ...Query, deliveryStatus: !isNaN(Number(e.target.value)) ? Number(e.target.value) : "NAN" })}>
                        <MenuItem value={"NAN"}>--Filter Delevery Status--</MenuItem>
                        <MenuItem value={0}>{Constents.deliveryStatus[0]}</MenuItem>
                        <MenuItem value={1}>{Constents.deliveryStatus[1]}</MenuItem>
                        <MenuItem value={2}>{Constents.deliveryStatus[2]}</MenuItem>
                    </Select>
                </div>
                <div className="col-lg-2 col-6 col-md-3 mb-2">
                    <TextField
                        onChange={(e) => {
                            setFilteredOrders(Orders?.filter((x) => x.orderedBy?.fullName.includes(e.target.value)))
                            if (e.target.value.length <= 0) return getOrderlist()
                        }}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}

                        placeholder="Search Customer Fullname" />
                </div>

            </div >
        }
<DataGrid
    rows={[...FilteredOrders]}
    columns={columns}
    style={{ minHeight: 200 }}
    autoHeight={true}
    getRowId={(e) => e._id}
    paginationModel={PaginationModel}
    pagination={true}
    onPaginationModelChange={(e) => {
        setPaginationModel({ ...PaginationModel, page: e.page })
    }}
/>

    </>
}