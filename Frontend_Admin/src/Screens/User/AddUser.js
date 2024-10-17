import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import Constents from '../../Commen/constents';
import apiHelper from '../../Commen/ApiHelper';

export default function AddUser({ open, setOpen,getUsers }) {
    const [citys, setcitys] = useState([])
    const [userDetails, setuserDetails] = useState({
        fullName: "",
        city: "",
        phone: "",
        role: 1,
        password: ""
    })

    const getCitys = async () => {
        try {
            const result = await apiHelper.getCitys()
            setcitys(result.data.data)
            setuserDetails({ ...userDetails, city: result.data.data[0] })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCitys()
         // eslint-disable-next-line 
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const InsetHandler = async () => {
        try {
            if (!userDetails.fullName || userDetails.fullName.length < 4) return window.alert("Somthing with wrong with Fullname!")
            if (!userDetails.role) return window.alert("Required field Fullname is empty!")
            if (!userDetails.city) return window.alert("Required field City is empty!")
            if (!(userDetails.phone)) return window.alert("Required field Phone is empty!")
            if (!userDetails.password) return window.alert("Required field Password is empty!")
            await apiHelper.createUser({ ...userDetails })
            getUsers()
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <TextField className='my-2' label={"Fullname"} onChange={(e) => setuserDetails({ ...userDetails, fullName: e.target.value })} fullWidth />
                    <TextField value={userDetails.phone} className='mb-2' inputProps={{ maxLength: 10 }} label={"Phone"} onChange={(e) => setuserDetails({ ...userDetails, phone: Number(e.target.value) || "" })} fullWidth />
                    <Select className='mb-2' value={userDetails.role} fullWidth size='small' onChange={(e) => setuserDetails({ ...userDetails, role: Number(e.target.value) })}>
                        <MenuItem value={1}>{Constents.roles[1]}</MenuItem>
                        <MenuItem value={2}>{Constents.roles[2]}</MenuItem>
                    </Select>
                    <Select className='mb-2' value={userDetails.city} fullWidth size='small' onChange={(e) => setuserDetails({ ...userDetails, city: e.target.value })}>
                        {
                            citys && citys?.map((x) => (
                                <MenuItem key={x} value={x}>{x}</MenuItem>
                            ))
                        }
                    </Select>
                    <TextField className='mb-2' label={"password"} type='password' onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={InsetHandler}  >Create new {Constents.roles[userDetails.role]}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
