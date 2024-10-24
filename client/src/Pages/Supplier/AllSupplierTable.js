import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { axiosInstance } from '../../utils/Constant';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

// Define the columns
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'companyName', label: 'Company Name', minWidth: 170 },
  { id: 'address', label: 'Address', minWidth: 170 },
  { id: 'email', label: 'Email(s)', minWidth: 170 },
  { id: 'phone', label: 'Phone Number(s)', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170, align: 'center' }
];


const AllSupplierTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState([]);
  const [dialogTitle, setDialogTitle] = useState('');
  const [clientRows, setClientRows] = useState([]);
  const [totalCount, setTotalCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const param = {
      page: page + 1,
      limit: rowsPerPage
    };
    axiosInstance.get('/supplier/get-suppliers-paginated', { params: param })
      .then((res) => {
        setTotalCount(res.data.totalSupplier);
        setClientRows(res.data.suppliers);
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [page, rowsPerPage]);


  const handleEdit = (id) => {
    navigate(`/Supplier/Edit/${id}`);
  };

  const handleAdd = (id) => {
    navigate(`/Supplier/Add/`);
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    axiosInstance.delete(`/supplier/delete-supplier/${id}`)
      .then((res) => {
        const temp = totalCount - 1;
        const tempClientData = [...clientRows];
        const clients = tempClientData.filter((client)=>{
            if(client.id !== id)
            {
                return client;
            }
        });
        console.log(clients);
        setClientRows([...clients]);
        setTotalCount(temp);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleView = (title, content) => {
    setDialogTitle(title);
    setDialogContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if(isLoading)
  return <Typography varinat="body1">Loading...</Typography>

  return (
    <Box width={"100%"}>
        <Box display="flex" justifyContent="right" sx={{my: 1.5}}>
            <Button startIcon={<AddCircleOutlineOutlinedIcon />} variant='contained' onClick={handleAdd}>Add Supplier</Button>
        </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" component="div" sx={{ padding: 2 }}>
          Supplier Table
        </Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clientRows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'email' ? (
                          <>
                            {value[0]}
                            {value.length > 1 && (
                              <IconButton onClick={() => handleView('Emails', value)}>
                                <VisibilityIcon />
                              </IconButton>
                            )}
                          </>
                        ) : column.id === 'phone' ? (
                          <>
                            {value[0]}
                            {value.length > 1 && (
                              <IconButton onClick={() => handleView('Phone Numbers', value)}>
                                <VisibilityIcon />
                              </IconButton>
                            )}
                          </>
                        ) : column.id === 'action' ? (
                          <>
                            <IconButton onClick={() => handleEdit(row.id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogContent.map((item, index) => (
            <Typography key={index}>{item}</Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllSupplierTable;
