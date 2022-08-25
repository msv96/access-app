import pa11y from '../../src/helpers/pa11y';

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    const data = await pa11y(url, {
      includeWarnings: true,
      includeNotices: true,
    });
    res.status(200).json({ status: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error });
  }
}
