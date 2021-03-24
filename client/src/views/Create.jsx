import { useState } from 'react';
import Axios from 'axios';
import ProductForm from '../components/ProductForm';
import { navigate } from '@reach/router';

const Create = props => {
    const [product, setProduct] = useState({
        title: "",
        price: 0,
        description: ""
    })

    const [errors, setErrors] = useState({
        title: "",
        price: 0,
        description: ""
    })

    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        Axios.post("http://localhost:8000/api/products", product)
            .then(res => navigate('/'))
            .catch(err => {
                console.log(err.response.data.errors)
                setErrors(err.response.data.errors);
            })
    }

    return (
        <>
            <ProductForm
                inputs={product}
                title="Create Product"
                submitValue="Create"
                handleInputChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
            />
        </>
    )
}

export default Create;