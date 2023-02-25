import useSWR from 'swr'
import DataTable from '../components/table';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Index = () => {
    const { data, mutate } = useSWR('/api/contacts');

    if (!data) {
        return <p>Loading...</p>
    }
    return (
        <>
            <div>
                <h1>POC - FAUNADB - CONTACTS</h1>
            </div>
            <div>
                <div >
                    <Stack
                        direction="row-reverse"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        margin={4}>
                        <Button
                            href='/create'
                            variant='contained'
                            color="primary">
                            NOVO CONTATO
                        </Button>
                    </Stack>
                </div>

                <div style={{margin:20}}>
                    <DataTable data={data} />
                </div>
            </div>
        </>
    )
}

export default Index;