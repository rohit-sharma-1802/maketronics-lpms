import { createNewProduct, getProductById, updateProductByPartNo, deleteProductByPartNo, getAllProductPaginated, getProductCount } from "./product.model.js";

export const createProduct = async(req, res)=>{
    try{
        const product = await createNewProduct(req.body);
        res.status(201).json({
            success: true,
            product
        });
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            error
        });
    }
}

export const getProduct = async(req, res)=>{
    try{
        const { partNo } = req.params;
        const product = await getProductById(partNo);
        res.status(201).json({
            success: true,
            product
        }); 
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            error
        });
    }
}

export const updateProduct = async(req, res)=>{
    try{
        const result = await updateProductByPartNo(req.body);
        res.status(200).json({
            success: true,
            ...result
        }); 
    } 
    catch(error)
    {
        res.status(500).json({
            success: false,
            error
        }); 
    }
}

export const deleteProduct = async(req, res)=>{
    try{
        const { partNo } = req.params;
        const result = await deleteProductByPartNo(partNo);
        res.status(200).json({
            success: true,
            ...result
        }); 
    }
    catch(error)
    {
        res.status(500).json({
            success: false,
            error
        }); 
    }
}

export const getAllProduct = async (req, res) => {
    try {
        console.log("token received");
        const page = parseInt(req.query.page, 10) || 1; 
        const limit = parseInt(req.query.limit, 10) || 10;

        const [product, totalProduct] = await Promise.all([
            getAllProductPaginated(page, limit),
            getProductCount()
        ]);

          // Calculate total pages
  
        res.status(200).json({
            success: true,
            product,
            totalProduct,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        }); 
    }
};
