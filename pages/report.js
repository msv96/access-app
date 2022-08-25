import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FcHighPriority, FcInfo, FcMediumPriority } from 'react-icons/fc';
import Spinner from '../src/components/Spinner';

export default function Report() {
  const router = useRouter();
  const { url } = router.query;
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        if (url) {
          const { origin } = window.location;
          const link = origin.includes('localhost')
            ? origin.replace('3000', '3004')
            : origin.replace('vercel.app', 'herokuapp.com');
          const html = await fetch(`${link}/api/v1/report?url=${url}`);
          const { status, data, date } = await html.json();
          if (status) {
            const count = {
              error: 0,
              notice: 0,
              warning: 0,
            };
            const finalData = data
              .map((item) => {
                const type = item.type;
                if (type) {
                  count[type] += 1;
                }
                return item;
              })
              .filter((item) => item.type);
            setReport({
              data: finalData,
              count,
              date,
            });
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    fetchData();
  }, [url]);

  if (loading) {
    return <Spinner />;
  }

  if (!loading && Object.keys(report).length > 0) {
    return (
      <div className='w-11/12 md:w-5/6 my-20 mx-auto'>
        <div>
          <h1 className='text-3xl font-normal'>Accessibility Checker Report</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 xl:grid-cols-4 my-10'>
            <div className='flex flex-col justify-between p-1'>
              <div>
                <div>
                  <strong>Date: </strong>
                  {report?.date}
                </div>
                <div>
                  <strong>Scanned Page: </strong>
                  {url}
                </div>
              </div>
              <div className='mt-8'>
                <button
                  type='button'
                  className='bg-indigo-600 text-white rounded-sm px-4 py-1'
                  onClick={() => router.push('/')}
                >
                  Back
                </button>
              </div>
            </div>
            <div className='bg-white p-4'>
              <div className='flex justify-between items-center'>
                <div>Errors</div>
                <FcHighPriority />
              </div>
              <h3 className='text-4xl my-6'>{report?.count?.error}</h3>
              <div>Accessibility failures that need to be corrected</div>
            </div>
            <div className='bg-white p-4'>
              <div className='flex justify-between items-center'>
                <div>Warning</div>
                <FcMediumPriority />
              </div>
              <h3 className='text-4xl my-6'>{report?.count?.warning}</h3>
              <div>
                Issues that may not be a violation; manual review is needed
              </div>
            </div>
            <div className='bg-white p-4'>
              <div className='flex justify-between items-center'>
                <div>Notice</div>
                <FcInfo />
              </div>
              <h3 className='text-4xl my-6'>{report?.count?.notice}</h3>
              <div>
                Opportunities to apply best practices to further improve
                accessibility
              </div>
            </div>
          </div>
          <div className='bg-white'>
            <div className='flex bg-gray-200'>
              <div className='w-1/5 px-3 py-1'>Issues</div>
              <div className='w-4/5 px-3 py-1'>Requirements</div>
            </div>
            {report?.data?.map((item, index) => {
              return (
                <div key={index + item.code} className='flex border-b-2'>
                  <div className='w-1/5 px-3 py-1 capitalize'>{item.type}</div>
                  <div className='w-4/5 px-3 py-1'>{item.msg}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <div className='text-red-500'>Something really bad happened.</div>;
}
