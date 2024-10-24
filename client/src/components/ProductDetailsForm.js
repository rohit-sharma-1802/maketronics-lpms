import React,{useState} from 'react'
import { Grid, Paper, Box, Typography, Button } from '@mui/material'
import UserTextField from './UserTextField';
import AutoFillTextField from "./AutoFillTextField";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ProductDetailsForm({currProduct, handleSubmit, setCurrProduct, label}) {

 const handleChange=(label, value, heading)=>{
    console.log("called"+label+" "+heading);
    const temp = {...currProduct};
    if(Array.isArray(value))
    temp[heading] = value[0];
    else
    temp[heading] = value;
    console.log(temp);
    setCurrProduct(temp);
 }

 const handleEditorChange=(event, editor, heading)=>{
    const data = editor.getData();
    handleChange("", data, heading);
 }

  return (
    <Box>
        <Paper sx={{px: 3, py: 2}}>
            <Box sx={{ display: "flex", justifyContent:"center", mt: 2, mb: 4 }}>
                <Typography variant='h5'>{label}</Typography>
            </Box>
    <Box type="submit" component={"form"} onSubmit={handleSubmit}>
    <Grid container spacing={2}>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="PartNo*"
                heading="partNo"
                handleChange={handleChange}
                value={currProduct.partNo}
                type="text"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Photo Url*"
                heading="photoUrl"
                handleChange={handleChange}
                value={currProduct.photoUrl}
                type="text" 
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Price*"
                heading="price"
                handleChange={handleChange}
                value={currProduct.price}
                type="Number"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Manufacturer*"
                heading="manufacturer"
                handleChange={handleChange}
                value={currProduct.manufacturer}
                type="text"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Description*"
                heading="description"
                handleChange={handleChange}
                value={currProduct.description}
                type="text"
            />
        </Grid>
        
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Category*"
                heading="category"
                handleChange={handleChange}
                value={currProduct.category}
                type="text"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <UserTextField 
                label="Datasheet URL*"
                heading="datasheetURL"
                handleChange={handleChange}
                value={currProduct.datasheetURL}
                type="text"
            />
        </Grid>
        <Grid item sm={12} xs={12} md={6}>
            <AutoFillTextField 
                label="Status*"
                heading="status"
                options={["Published", "Completed"]}
                handleChange={handleChange}
                values={currProduct.status ? [currProduct.status] : []}
            />
        </Grid>
        <Grid item sm={12} xs={12} md={12}>
            <UserTextField 
                label="Detailed Description*"
                heading="detailDescription"
                handleChange={handleChange}
                value={currProduct.detailDescription}
                type="text"
                isTextArea={true}
            />
        </Grid>
        <Grid item md={12} lg={12}>
            <label>Product Attributes</label>
            <CKEditor
                editor={ClassicEditor}
                data={currProduct.productAttributes}
                onReady={editor => {
                    console.log('Editor is ready!', editor);
                }}
                onChange={(event, editor)=>handleEditorChange(event, editor, "productAttributes")}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </Grid>
        <Grid item md={12} lg={12}>
            <label>Additional Info</label>
            <CKEditor
                editor={ClassicEditor}
                data={currProduct.additionalInfo}
                onReady={editor => {
                    console.log('Editor is ready!', editor);
                }}
                onChange={(event, editor)=>handleEditorChange(event, editor, "additionalInfo")}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </Grid>
        <Grid item md={12} lg={12}>
            <label>Product Info</label>
            <CKEditor
                editor={ClassicEditor}
                data={currProduct.productInfo}
                onReady={editor => {
                    console.log('Editor is ready!', editor);
                }}
                onChange={(event, editor)=>handleEditorChange(event, editor, "productInfo")}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </Grid>
    </Grid>
    <Box sx={{ display: "flex", justifyContent:"center", mt: 3}}>
        <Button variant="contained" size="medium" type="submit">
            Submit
        </Button>
    </Box>
    </Box>
    </Paper>
    </Box>
  )
}

export default ProductDetailsForm