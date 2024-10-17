import { Button, TextField } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import apiHelper from "../../Commen/ApiHelper";
import { useRef, useState, useEffect } from "react";
import { Path } from "../../Commen/Path";
import { useNavigate } from "react-router-dom";
import ImageModel from "../../Components/ImageModel"
import { MenuItem, Select } from '@mui/material';
import Constents from "../../Commen/constents";

export default function AddProduct({ Auth }) {
    const navigate = useNavigate()
    const [category, setcategory] = useState([])
    const [productDetails, setproductDetails] = useState({
        title: "",
        name: "",
        price: "",
        qty: "",
        category: "0"
    })
    // eslint-disable-next-line
    const [FetureImage, setFetureImage] = useState(null)
    const [open, setOpen] = useState(false)
    const contentRef = useRef(null)
    const discriptionRef = useRef(null)
    const benefitsRef = useRef(null)


    const handelPublish = async () => {
        try {
            const data = {
                title: productDetails.title,
                name: productDetails.name,
                price: productDetails.price,
                productImage: FetureImage._id,
                content: contentRef.current && contentRef.current.getContent ? contentRef.current.getContent() : contentRef.current,
                discription: discriptionRef.current && discriptionRef.current.getContent ? discriptionRef.current.getContent() : discriptionRef.current,
                benefits: benefitsRef.current && benefitsRef.current.getContent ? benefitsRef.current.getContent() : benefitsRef.current,
                qty: productDetails.qty,
                category:productDetails.category,
                userId: Auth._id
            }
            if (!data.title) return alert("title is not defined!")
            if (!data.name) return alert("name is not defined!")
            if (!data.price) return alert("price is not defined!")
            if (!data.qty) return alert("Qty is not defined!")
            if (!data.category) return alert("Category is not defined!")
            await apiHelper.addProduct(data)
            navigate(Path.product)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategory = async () => {
        try {
            const result = await apiHelper.getCategory()
            setcategory(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategory()
    }, [])

    return <>
        <ImageModel setOpen={setOpen} open={open} setFetureImage={setFetureImage} />
        <div className="d-flex mb-4 justify-content-between">
            <h3>Add new Product</h3>
            <Button onClick={handelPublish} variant="contained">
                Publish
            </Button>
        </div>

        <div className="row">
            <div className="col-12 col-md-4 mb-3">
                <TextField onChange={(e) => setproductDetails({ ...productDetails, title: e.target.value })} label="Title" fullWidth />
            </div>
            <div className="col-12 col-md-4 mb-3">
                <TextField onChange={(e) => setproductDetails({ ...productDetails, name: e.target.value })} label="Name" fullWidth />
            </div>
            <div className="col-12 col-md-4 mb-3">
                <Select className='mb-2' value={productDetails.category} fullWidth 
                    onChange={(e) => setproductDetails({ ...productDetails, category: e.target.value })}
                >
                    <MenuItem value="0" disabled>Select category</MenuItem>
                    {
                        category && category?.map((x) => (
                            <MenuItem key={x.name} value={x._id}>{x.name}</MenuItem>
                        ))
                    }
                </Select>
            </div>
            <div className="col-12 col-md-8">
                <p className="mb-2 fw-bold text-muted">Content</p>
                <Editor
                    onKeyUp={(evt, editor) => {
                        contentRef.current = editor
                    }}
                    apiKey={Constents.tinymcKey}
                    onPaste={(e, editor) => {
                        contentRef.current = editor
                    }}
                    initialValue={contentRef.current}
                    init={{
                        height: 445,
                        selector: 'textarea',
                        menubar: false,
                        plugins: ['print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',],
                        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl',
                        body_class: "single-post-area",
                        content_style: ``,
                        images_upload_handler: async (blobInfo, success, failure, _) => {
                            try {
                                const file = blobInfo.blob()
                                let formdata = new FormData()
                                formdata.append("file", file)
                                const result = await apiHelper.fileUpload(formdata)
                                success(result?.data?.data?.source)
                            } catch (error) {
                                console.log(error)
                                failure("Failed to upload")
                            }
                        }
                    }}
                />
            </div>
            <div className="col-12 col-md-4 mb-3">
                <p className="mb-2 fw-bold text-muted">Feture Image</p>
                <div style={{ height: "250px", border: "3px dashed #1976d2" }} className="w-100 mb-3">
                    {
                        FetureImage && <img alt="Not Load" src={FetureImage.url} width="100%" height="100%" />
                    }
                </div>
                <Button fullWidth variant="contained" onClick={() => setOpen(true)}>Add Feture Image</Button>
                <div className="w-100 mt-3">
                    <TextField fullWidth label="Quantity" value={productDetails.qty} onChange={(e) => setproductDetails({ ...productDetails, qty: Number(e.target.value) || "" })} />
                </div>
                <div className="w-100 mt-3">
                    <TextField fullWidth label="Price" value={productDetails.price} onChange={(e) => setproductDetails({ ...productDetails, price: Number(e.target.value) || "" })} />
                </div>
            </div>
            <div className="col-12 mb-3">
                <p className="mb-2 fw-bold text-muted">Discription</p>
                <Editor
                    onKeyUp={(evt, editor) => {
                        discriptionRef.current = editor
                    }}
                    apiKey={Constents.tinymcKey}
                    onPaste={(e, editor) => {
                        discriptionRef.current = editor
                    }}
                    initialValue={discriptionRef.current}
                    init={{
                        height: 300,
                        selector: 'textarea',
                        menubar: false,
                        plugins: ['print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',],
                        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl',
                        body_class: "single-post-area",
                        content_style: ``,
                        images_upload_handler: async (blobInfo, success, failure, _) => {
                            try {
                                const file = blobInfo.blob()
                                let formdata = new FormData()
                                formdata.append("file", file)
                                const result = await apiHelper.fileUpload(formdata)
                                success(result?.data?.data?.source)
                            } catch (error) {
                                console.log(error)
                                failure("Failed to upload")
                            }
                        }
                    }}
                />
            </div>
            <div className="col-12 mb-3">
                <p className="mb-2 fw-bold text-muted">Benefits</p>
                <Editor
                    onKeyUp={(evt, editor) => {
                        benefitsRef.current = editor
                    }}
                    apiKey={Constents.tinymcKey}
                    onPaste={(e, editor) => {
                        benefitsRef.current = editor
                    }}
                    initialValue={benefitsRef.current}
                    init={{
                        height: 300,
                        selector: 'textarea',
                        menubar: false,
                        plugins: ['print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',],
                        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl',
                        body_class: "single-post-area",
                        content_style: ``,
                        images_upload_handler: async (blobInfo, success, failure, _) => {
                            try {
                                const file = blobInfo.blob()
                                let formdata = new FormData()
                                formdata.append("file", file)
                                const result = await apiHelper.fileUpload(formdata)
                                success(result?.data?.data?.source)
                            } catch (error) {
                                console.log(error)
                                failure("Failed to upload")
                            }
                        }
                    }}
                />
            </div>
        </div>
    </>
}