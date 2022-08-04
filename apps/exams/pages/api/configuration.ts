// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ExamConfiguration } from '../../types/types'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ExamConfiguration>
) {
  const response = await fetch(`https://2xqyuoye3m.execute-api.us-east-1.amazonaws.com/default/TheOfficeQuestionPreFetcher?attempId=${req.query.attemptId}&env=${req.query.env}`, {
    method: 'GET'
  })

  const exam: ExamConfiguration = await response.json()

  res.status(200).json(exam)
}
