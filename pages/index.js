import Head from 'next/head';
import MainForm from '../components/MainForm';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Accessibility Checker</title>
        <meta name='description' content='checks for a website whether it is accessible for all users or not' />
      </Head>
      <MainForm />
    </div>
  );
}
