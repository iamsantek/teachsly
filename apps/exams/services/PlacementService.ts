import { Answers, ContactFormInputs, ExamConfiguration, ExamForm, Results } from '../types/types'

class PlacementService {
  public sendContactForm = async (user: ContactFormInputs, results: Results) => {
    const contact = await fetch('api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user,
        results
      })
    })

    return contact.json()
  }

  public fetchConfiguration = async (attemptId: string, env = 'prod') => {
    const questions = await fetch(`api/questions?env=${env}&attemptId=${attemptId}`)
    console.log({ questions })

    return questions.json() as Promise<ExamForm>
  }

  public fetchExamDetails = async (attemptId: string, env = 'prod') => {
    const questions = await fetch(`api/configuration?env=${env}&attemptId=${attemptId}`)

    return questions.json() as Promise<ExamForm>
  }

  public sendResults = async (answers: Answers, externalId: string) => {
    const response = await fetch(`api/results?externalId=${externalId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers })
    })

    return response.json() as Promise<Results>
  }

  public async getCDNUrl (key: string) {
    const fetchUrl = await fetch(`https://cdn.theofficeenglishlearning.com?env=prod&key=${key}`, {
      method: 'POST'
    })

    return fetchUrl.json() as unknown as {url: string}
  }
}

export default new PlacementService()
