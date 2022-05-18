import { BACKEND_ENV } from '../../constants/Environment'
import { GeneralInformation } from '../../enums/GeneralInformation'

class CloudFrontService {
  private CDN_URL = `https://cdn.${GeneralInformation.DOMAIN}/`

  public async getCDNUrl (key: string) {
    const fetchUrl = await fetch(`${this.CDN_URL}?env=${BACKEND_ENV}&key=${key}`, {
      method: 'POST'
    })

    return fetchUrl.json() as unknown as {url: string}
  }
}

export default new CloudFrontService()
