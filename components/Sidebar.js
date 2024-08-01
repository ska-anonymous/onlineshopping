import Link from 'next/link';
import '../app/sidebar.css';
const sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" href="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/dashboard/orders">Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/logout">Logout</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default sidebar;