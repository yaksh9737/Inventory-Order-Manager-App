import { Button, MenuItem, Select } from "@mui/material";
import Constents from "../../Commen/constents";
import { useEffect, useState } from "react";
import apiHelper from "../../Commen/ApiHelper";
import { DataGrid } from "@mui/x-data-grid";
import AddUser from "./AddUser";

export default function UserList({ Auth }) {
    const [PaginationModel, setPaginationModel] = useState({
        pageSize: 8,
        page: 0
    })
    const [selectedRole, setselectedRole] = useState(Auth.role < 1 ? - 1 : 2)
    const [Users, setUsers] = useState([])
    const [UserOpen, setUserOpen] = useState(false)
    const getUsers = async () => {
        try {
            const result = await apiHelper.listUser(selectedRole < 0 ? undefined : selectedRole, Auth.city)
            setUsers([...result.data.data])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line
    }, [selectedRole])


    const columns = [
        // { field: "_id", width: 100, headerName: "ID" },
        { field: "fullName", flex: 1, headerName: "Fullname" },
        { field: "role", flex: 1, renderCell: (cell) => Constents.roles[cell.row.role] },
        { field: "city", flex: 1, renderCell: (cell) => cell.row.city },
        { field: "phone", flex: 1 },
    ]


    return <>
        <AddUser getUsers={getUsers} open={UserOpen} setOpen={setUserOpen} />
        <div className="d-flex justify-content-between mb-3">
            <h3>Users</h3>
            <div className="d-flex align-items-center gap-3">
                {
                    Auth.role > 1 &&
                    <Select onChange={(e) => setselectedRole(Number(e.target.value))} value={selectedRole} style={{ minWidth: "150px" }} size="small">
                        <MenuItem value={-1}>
                            {"All"}
                        </MenuItem>
                        <MenuItem value={0}>
                            {Constents.roles[0]}
                        </MenuItem>
                        <MenuItem value={1}>
                            {Constents.roles[1]}
                        </MenuItem>
                        <MenuItem value={2}>
                            {Constents.roles[2]}
                        </MenuItem>
                    </Select>
                }
                {
                    Auth.role < 1 && <Button onClick={() => setUserOpen(true)} variant="outlined">Add User</Button>
                }
            </div>
        </div>
        <DataGrid
            rows={Users}
            columns={columns}
            autoHeight
            style={{ minHeight: 200 }}
            getRowId={(e) => e._id}
            pagination
            paginationModel={PaginationModel}
            onPaginationModelChange={(e) => {
                setPaginationModel({ ...PaginationModel, page: e.page })
            }}
        />

    </>
}