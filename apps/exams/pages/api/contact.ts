// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ContactFormInputs } from '../../types/types'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // TODO
  const formData = req.body as ContactFormInputs

  const contactFormResponse = await fetch('https://kraz6ruibe.execute-api.us-east-1.amazonaws.com/default/Placement-test-results-sender', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const result = await contactFormResponse.json()

  res.status(200).json(result)
}
