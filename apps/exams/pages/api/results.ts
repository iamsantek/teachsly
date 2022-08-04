// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const response = await fetch(`https://erryozxszj.execute-api.us-east-1.amazonaws.com/default/TheOfficeExams-SendResults?externalId=${req.query.externalId}&env=prod`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  })

  const jsonResponse = await response.json()

  res.status(200).json(jsonResponse)
}
