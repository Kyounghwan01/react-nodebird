import React from 'react';
import Link from 'next/link';
import Layout from 'components/Layout';

function AboutPage() {
  return (
    <Layout title="About | Next.js + TypeScript Example">
      <h1>About</h1>
      <p>This is the about page</p>
      <p>
        <Link href="/">Go home</Link>
      </p>
    </Layout>
  );
}

export default AboutPage;
