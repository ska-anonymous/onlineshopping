'use client';
import { useContext, useState } from "react";
import { AppContext } from "../appcontextprovider";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config";

const checkout = () => {
    const router = useRouter()

    const { isLogin, cart, setCart } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = (index) => {
        setCart((prevItems) => prevItems.filter((item, i) => i != index));
    }

    const confirmOrder = async () => {
        if (!isLogin) {
            alert('please login first');
            router.push('/login');
            return;
        }
        // when cart is empty and use somehow click on button
        if (cart.length == 0) {
            alert('Cannot place order! please select some items first');
            return;
        }

        const token = sessionStorage.getItem('shoppingToken');

        if (!token) {
            alert('Token is not available. please login again');
            router.push('/login');
        }

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer ${token}`);

        setIsLoading(true);
        const response = await fetch(API_URL + '/order', {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(cart),
        })

        const data = await response.json();

        setIsLoading(false);

        if (data.error) {
            alert(data.errorMessage);
            return;
        }

        alert('Order placed');
        setCart([]);
        router.push('/dashboard/orders');

    }

    return (
        <>
            <Navbar />
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((product, index) => {
                                        return (
                                            <tr key={'row-' + index}>
                                                <td>{(index + 1) + ' )'}</td>
                                                <td>{product.name}</td>
                                                <td>{product.quantity}</td>
                                                <td>${product.price}</td>
                                                <td onClick={() => { handleDelete(index) }}>
                                                    <i role="button" className="bi bi-x-circle text-danger"></i>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-4">
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <td>Total Items</td>
                                        <td>{cart.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Price</td>
                                        <td>
                                            ${(cart.reduce((sum, item) => sum + (item.price - 0), 0)).toFixed(2)}
                                        </td>
                                    </tr>
                                    {
                                        cart.length > 0 &&
                                        <tr>
                                            <td colSpan='2'>
                                                <button type="button" onClick={confirmOrder} className="my-3 btn btn-sm btn-primary w-100" disabled={isLoading ? true : false}>{isLoading ? 'Placing Order.....' : 'Place Order'}</button>
                                            </td>
                                        </tr>
                                    }

                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default checkout;