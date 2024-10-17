import * as React from 'react';
import { useRef, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Tooltip } from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import ContextMenu from './contextMenu';
import apiHelper from '../Commen/ApiHelper';

export default function ImageModel({ open, setOpen, setFetureImage }) {
    const [Images, setImages] = useState([])
    const [OpenContext, setOpenContext] = useState({})
    const fileLabelRef = useRef(null)
    async function fetchGallery() {
        try {
            const result = await apiHelper.fetchGallery()
            setImages(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGallery()
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    async function handelFileUpload(file) {
        try {

            const formData = new FormData()
            formData.append("file", file)
            await apiHelper.fileUpload(formData)
            fetchGallery()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={"xl"}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Availabel Images</DialogTitle>
                <hr />
                <DialogContent >
                    <div className="row">
                        <Tooltip title="Click to upload new image on system">
                            <label ref={fileLabelRef} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" htmlFor="file">
                                <IconButton color='primary' onClick={() => {
                                    fileLabelRef.current.click()
                                }} style={{ width: "100%", minHeight: "235px", borderRadius: "10px", height: "100%", border: "3px dashed #0d6efd" }}>
                                    <AddAPhoto style={{ fontSize: "5rem" }} />
                                </IconButton>
                                <input type="file" hidden id='file' onChange={(e) => {
                                    handelFileUpload(e.target.files[0])
                                    e.target.files = null
                                }} />
                            </label>
                        </Tooltip>
                        {
                            Images.map((x) => {
                                return <div style={{ position: 'relative' }} key={x._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                    {OpenContext?._id === x._id ? <ContextMenu setOpenContext={setOpenContext} fileData={x} fetchGallery={fetchGallery} /> : ""}
                                    <Tooltip title="Double tap for select this image">
                                        <img
                                            onContextMenu={(e) => {
                                                e.preventDefault()
                                                setOpenContext(x)
                                            }}
                                            onDoubleClick={() => {
                                                setFetureImage(x)
                                                setOpen(false)
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.bottom = "0.2rem"
                                                e.target.style.boxShadow = "0px 0px 10px 1.7px #007bff"
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.bottom = "0rem"
                                                e.target.style.boxShadow = "none"
                                            }}
                                            src={x.url} alt='img' width={"100%"} height={"235px"} style={{ transition: "0.2s bottom linear", cursor: "pointer", borderRadius: "10px", position: 'relative', overflow: "hidden", boxShadow: "0px 0px 0px gray" }} />
                                    </Tooltip>
                                </div>
                            })
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
