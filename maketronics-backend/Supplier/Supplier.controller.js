import { createNewSupplier, getSupplierById, updateSupplierById, deleteSupplierById, getAllSupplierPaginated, getSupplierCount } from "./Supplier.model.js";

export const createSupplier = async(req, res)=>{
    try{
        const supplier = await createNewSupplier(req.body);
        res.status(201).json({
            success: true,
            supplier
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

export const getSupplier = async(req, res)=>{
    try{
        const { id } = req.params;
        const supplierId = parseInt(id);
        const supplier = await getSupplierById(supplierId);
        res.status(201).json({
            success: true,
            supplier
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

export const updateSupplier = async(req, res)=>{
    try{
        const result = await updateSupplierById(req.body);
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

export const deleteSupplier = async(req, res)=>{
    try{
        const { id } = req.params;
        const supplierId = parseInt(id);
        const result = await deleteSupplierById(supplierId);
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

export const getAllSupplier = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        const [suppliers, totalSupplier] = await Promise.all([
            getAllSupplierPaginated(page, limit),
            getSupplierCount()
        ]);

        const totalPages = Math.ceil(totalSupplier / limit);  // Calculate total pages

        res.status(200).json({
            success: true,
            suppliers, // Note: Renamed from supplier to suppliers for clarity
            totalPages,
            currentPage: page,
            totalSupplier
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
};
