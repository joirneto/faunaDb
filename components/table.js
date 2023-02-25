import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import useSWR from 'swr'
import DeleteIcon from '@mui/icons-material/Delete';

const deleteRequest = async (url) => {
    const res = await fetch(url, {
        method: 'delete',
    });
    const data = await res.json();
    return data;
}

const deleteContact = async (ref, mutate) => {
    await deleteRequest('/api/contacts/' + ref);
    mutate()
}

const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'NAME', width: 300 },
    { field: 'email', headerName: 'EMAIL', width: 300 },
    { field: 'title', headerName: 'TITLE', width: 300 },
    {
        field: 'Excluir', width: 300, disableColumnMenu: true,
        renderCell: (cellValues) => {
            const { data, mutate } = useSWR('/api/contacts');
            return (
                <Button
                    variant='contained'
                    color="primary"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                        deleteContact(cellValues.id, mutate);
                    }}>
                    Excluir
                </Button>
            );
        }
    }
];

export default function DataTable(data) {
    const rows = data.data.data.map(row => {
        return {
            ...row.data,
            id: row.ref['@ref'].id
        };
    })
    return (
        <div style={{ height: 400, width: '90%', alignItems: 'center' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}