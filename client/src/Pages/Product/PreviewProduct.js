import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { axiosInstance } from '../../utils/Constant';
import { useParams } from 'react-router-dom';

const ProductImage = styled('img')({
  width: '60%',
  height: 'auto',
  borderRadius: '8px',
});

const HtmlRenderer = ({ htmlString }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};

const PreviewProduct = () => {

  const Params = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(()=>{
    axiosInstance.get(`/product/get-Product/${Params.id}`)
    .then((res)=>{
      setProductDetails(res.data.product);
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  if(!productDetails)
    return <CircularProgress />

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {productDetails.partNo}
        </Typography>
        <Typography variant="h5" color="secondary" gutterBottom>
          {productDetails.price}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProductImage src={productDetails.photoUrl} alt={productDetails.partNo} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2">
              Category: {productDetails.category}
            </Typography>
            <Typography variant="h6" component="h2">
              Manufacturer: {productDetails.manufacturer}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {productDetails.description}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              {productDetails.detailDescription}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PictureAsPdfIcon />}
              href={productDetails.datasheet}
              target="_blank"
              sx={{ marginTop: 2 }}
            >
              View Datasheet
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Product Attributes
        </Typography>
        <div>
          <HtmlRenderer htmlString={productDetails.productAttributes} />
        </div>
      </Paper>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Additional Information
        </Typography>
        <div>
          <HtmlRenderer htmlString={productDetails.additionalInfo} />
        </div>
      </Paper>
    </Box>
  );
};

export default PreviewProduct;
