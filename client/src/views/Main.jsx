import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from '@reach/router';

const Main = props => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/products")
            .then(res => setProduct(res.data.results))
            .catch(err => console.log(err))
    }, [])


    const handleDestroyProduct = id => {
        Axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(res => setProduct(res.data.results))
            .catch(err => console.log(err))
    }

    return (
        product ?
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Products</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map((p, i) => {
                            return <tr key={i}>
                                <td>{p.title}</td>
                                <td>
                                    <Link className="btn btn-warning btn-outline-info" to={`/edit/${p._id}`}>Edit</Link>
                                    <button className="btn btn-danger btn-outline-dark" onClick={() => handleDestroyProduct(p._id)}>Delete</button>
                                    <Link className="btn btn-info btn-outline-dark" to={`/show/${p._id}`}>Display</Link>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table> :
            <h2>Loading...</h2>
    )
}

export default Main;