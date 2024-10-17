import React from 'react'
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import apiHelper from '../../Commen/ApiHelper';
import AddCategory from './AddCategory';

export default function CategoryList(Auth) {
  const [PaginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0
  })
  const [Category, setCategory] = useState([])
  const [open, setOpen] = useState(false)

  const getCategory = async () => {
    try {
      const result = await apiHelper.getCategory()
      setCategory(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])


  const columns = [
    { field: "_id", width: 100, headerName: "ID" },
    { field: "name", flex: 1, headerName: "Name" },
    { field: "alias", flex: 1, headerName: "Alias" },
  ]
  return <>
    <AddCategory open={open} setOpen={setOpen} getCategory={getCategory} />
    <div className="d-flex justify-content-between mb-3">
      <h3>Category</h3>
      {
        Auth.Auth.role < 1 && <Button variant="outlined" onClick={() => setOpen(true)}>Add Category</Button>
      }
    </div>
    <DataGrid
      rows={Category}
      columns={columns}
      autoHeight
      getRowId={(e) => e._id}
      pagination
      style={{ minHeight: 200 }}
      paginationModel={PaginationModel}
      onPaginationModelChange={(e) => {
        setPaginationModel({ ...PaginationModel, page: e.page })
      }}
    />
  </>
}
