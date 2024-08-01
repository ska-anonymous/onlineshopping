'use client';
import React, { useContext } from 'react';
import { SITE_NAME } from '../config';
import Link from 'next/link';
import { AppContext } from '@/app/appcontextprovider';

const Navbar = () => {

  const { isLogin, cart } = useContext(AppContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" href="/">{SITE_NAME}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item"><Link className="nav-link active" aria-current="page" href="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/about">About</Link></li>
            <li className="nav-item">
              {isLogin ? <Link className="nav-link" href="/dashboard">dashboard</Link> : <Link className="nav-link" href="/login">Login</Link>}
            </li>
            <li className="nav-item"><Link className="nav-link" href="/register">Sign Up</Link></li>
          </ul>
          <Link href='/checkout' className="btn btn-outline-dark">
            <i className="bi-cart-fill me-1"></i>
            Cart
            <span className="badge bg-dark text-white ms-1 rounded-pill">{cart.length}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;