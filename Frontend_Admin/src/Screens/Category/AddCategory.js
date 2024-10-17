import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import apiHelper from '../../Commen/ApiHelper';

export default function AddCategory({open, setOpen,getCategory}) {
    const [Category, setCategory] = useState({
       name:"",
       alias:""
    })

    const handleClose = () => {
        setOpen(false);
    };

    const InsetHandler = async () => {
        try {
            if (!Category.name || Category.name.length < 1) return window.alert("Somthing with wrong with Fullname!")
            if (!Category.alias) return window.alert("Required field Alias is empty!")
            await apiHelper.createCategory({ ...Category })
            getCategory()
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
                <TextField className='my-2' label={"Name"} onChange={(e) => setCategory({ ...Category, name: e.target.value })} fullWidth />
                <TextField className='mb-2' label={"Alias"} onChange={(e) => setCategory({ ...Category, alias: e.target.value })} fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={InsetHandler} >Create new</Button>
            </DialogActions>
        </Dialog>
    </>
}
