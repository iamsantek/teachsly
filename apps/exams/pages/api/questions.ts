// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ExamForm } from '../../types/types'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ExamForm>
) {
  const response = await fetch(`https://1u7oml16me.execute-api.us-east-1.amazonaws.com/default/TheOfficeQuestionFetcher?attempId=${req.query.attemptId}&env=${req.query.env}`, {
    method: 'GET'
  })

  const exam: ExamForm = await response.json()

  res.status(200).json(exam)
}
