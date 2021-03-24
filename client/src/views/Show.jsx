import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, navigate } from '@reach/router';

const Show = props => {

    const [product, setProduct] = useState(false);

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/products/${props.id}`)
            .then(res => setProduct(res.data.results[0]))
            .catch(err => console.log(err))
    }, [props])

    const handleDestroyProduct = id => {
        Axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(res => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        product ?
            
        <div className="card col-4 mx-auto">
            <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Description: {product.description}</p>
                
                <Link className="btn btn-warning btn-outline-info" to={`/edit/${props.id}`}>Edit</Link>
                
                <button className="btn btn-danger btn-outline-dark" onClick={() => handleDestroyProduct(props.id)}>Delete</button>
            </div>

        </div> : <h2>Loading...</h2>
    )
}

export default Show;