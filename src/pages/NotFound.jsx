import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => (
  <section className="py-32 text-center bg-surface">
    <Helmet>
      <title>Page Not Found | VigiThink Life Sciences</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <p className="text-6xl font-bold font-heading text-primary mb-4">404</p>
    <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
    <p className="text-slate-600 mb-8">The page you are looking for does not exist or has moved.</p>
    <Link to="/" className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-800 transition-colors">Back to Home</Link>
  </section>
);

export default NotFound;
