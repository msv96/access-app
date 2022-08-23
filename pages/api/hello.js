// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { evaluate } from 'aatt';

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    const html = await fetch(url);
    const doc = await html.text();
    const data = await evaluate({
      source: doc,
      output: 'json',
      engine: 'htmlcs',
      level: 'WCAG2A',
    });
    const result = data.includes('Object]\n') ? data?.split('Object]\n')[1] : data;
    res
      .status(200)
      .json({ status: true, data: JSON.parse(result), message: '' });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        data: [],
        message: typeof error === 'string' ? error : JSON.stringify(error),
      });
  }
}
