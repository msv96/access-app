import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    router.push({ pathname: '/report', query: { url } });
  }

  function onReset(event) {
    event.preventDefault();
    setUrl('');
    setReport({});
  }

  return (
    <div>
      <Head>
        <title>Accessibility Checker</title>
        <meta
          name='description'
          content='checks for a website whether it is accessible for all users or not'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-5/6 my-20 mx-auto text-center'>
        <h1 className='text-3xl font-medium'>Accessibility Checker</h1>
        <form onSubmit={onSubmit} onReset={onReset}>
          <div className='mt-8'>
            <label htmlFor='url'>Enter the URL</label>
          </div>
          <div className='mt-2'>
            <input
              type='url'
              name='url'
              id='url'
              className='outline-none border-2 rounded-sm px-2 py-1 ml-2'
              required
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <div className='mt-8'>
            <button
              type='submit'
              className='bg-green-600 text-white rounded-sm px-4 py-1 mx-3'
            >
              Submit
            </button>
            <button
              type='reset'
              className='bg-red-600 text-white rounded-sm px-4 py-1 mx-3'
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
