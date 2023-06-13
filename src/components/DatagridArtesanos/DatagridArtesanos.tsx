import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';

const columns: GridColDef[] = [
  { field: 'prCodigo', 
    headerName: 'Codigo', 
    width: 90 },
  {
    field: 'prNombre',
    headerName: 'Nombre',
    width: 400,
    editable: true,
  },
  {
    field: 'cuentabancaria',
    headerName: 'Cuenta Bancaria',
    width: 220,
    editable: true,
  }
];

export default function DataGridArtesanos() {

  const [data, setData] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:8080/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid getRowId={(row) => row.prCodigo}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 11,
            },
          },
        }}
        pageSizeOptions={[11]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}