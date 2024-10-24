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
import Button from '@mui/material/Button';
import { axiosInstance } from '../../utils/Constant';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';

// Define the columns
const columns = [
  { id: 'Company', label: 'Company Name', minWidth: 170 },
  { id: 'PartHash', label: 'Part No', minWidth: 170 },
  { id: 'LeadType', label: 'Lead Type', minWidth: 170 },
  { id: 'status', label: 'Lead Status', minWidth: 170 },
  { id: 'PartStatus', label: 'Part Status', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170, align: 'center' }
];


const ViewAllLeads = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
      limit: rowsPerPage,
      email: localStorage.getItem("email")
    };
    axiosInstance.get('/leads/get-all-leads', { params: param })
      .then((res) => {
        setTotalCount(res.data.totalLeads);
        setClientRows(res.data.leadDetails);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [page, rowsPerPage]);


  const viewLeadDetails = (id) => {
    navigate(`/view-lead-details/${id}`);
  };

  const addLeadDetails = (id) =>{
    navigate(`/fill-Quote/${id}`);
  }

  const editLeadDetails = (id) => {
    navigate(`/edit-quote/${id}`);
  }

  if(isLoading)
  return <Typography varinat="body1">Loading...</Typography>

  return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography variant="h6" component="div" sx={{ padding: 2 }}>
          Leads Table
        </Typography>
        <TableContainer sx={{ maxHeight: 550 }}>
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
                        {
                            column.id === 'action' ? (
                            <>
                              {row?.count > 0 && 
                              <Tooltip title="Edit Quote Details" placement='top'>
                                <IconButton onClick={() => editLeadDetails(row.id) }>
                                  <EditIcon />
                                </IconButton>
                                </Tooltip>
                              }
                              {row?.count === 0 &&
                                <Tooltip title="Add Quote Details" placement='top'>
                                <IconButton onClick={() => addLeadDetails(row.id)}>
                                    <AddIcon  />
                                </IconButton>
                                </Tooltip>
                              }
                                <IconButton onClick={() => viewLeadDetails(row.id)}>
                                    <VisibilityIcon />
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

      
  );
};

export default ViewAllLeads;
