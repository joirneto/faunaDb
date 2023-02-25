import { useFormik } from "formik";
import { useRouter } from "next/router";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';

const post = async (url, data) => {
    const res = await fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    })

    const response = await res.json();
    return response;
};

const Create = () => {
    const router = useRouter();
    const form = useFormik({
        initialValues: {
            name: '',
            email: '',
            title: ''
        },
        onSubmit: async values => {
            const res = await post('/api/contacts', values);
            console.log(res)
            router.push('/');
        }
    })
    return (
        <div>
            <h1>Create Contact</h1>
            <form onSubmit={form.handleSubmit}>

                <div style={{ margin: 8 }}>
                    <TextField
                        required
                        id="name"
                        label="NAME"
                        defaultValue={form.values.name}
                        onChange={form.handleChange}
                    />
                </div>
                <div style={{ margin: 8 }}>
                    <TextField
                        required
                        id="email"
                        label="EMAIL"
                        type='email'
                        defaultValue={form.values.email}
                        onChange={form.handleChange}
                    />
                </div>
                <div style={{ margin: 8 }}>
                    <TextField
                        required
                        id="title"
                        label="TITLE"
                        defaultValue={form.values.title}
                        onChange={form.handleChange}
                    />
                </div>
                <div style={{ margin: 8 }}>
                    <Button
                        variant='contained'
                        color="primary"
                        // startIcon={<DeleteIcon />}
                        type='submit'>
                        SALVAR
                    </Button>
                </div>
            </form>
            <div> <Link style={{ margin: 8}} href={'/'}>Home</Link></div>
        </div>
    )
}

export default Create;