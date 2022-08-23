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
      level: 'WCAG2AAA',
    });
    const result = data?.split('Object]\n')[1];
    res.status(200).json({ result: JSON.parse(result) });
  } catch (error) {
    res.status(500).json({ result: typeof error === 'string' ? error : JSON.stringify(error) });
  }
}
