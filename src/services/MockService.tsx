import { faker } from '@faker-js/faker'

class MockService {
  private generateRandomMock = (mock: Object) => {
    const randomNumber = Math.floor(Math.random() * 15) + 5
    return Array.from({ length: randomNumber }).map((_, index) => mock)
  }

  public generateMediaMock = () => {
    return this.generateRandomMock({
      __typename: 'Media',
      id: faker.random.uuid(),
      title: faker.lorem.lines(1),
      type: 'LINK',
      description: faker.lorem.lines(2),
      link: faker.internet.url(),
      content: '',
      groups: [
        'Teachers'
      ],
      uploadedBy: faker.name.findName(),
      mimeType: 'video/quicktime',
      folderId: null,
      createdAt: '2022-05-19T16:25:19.765Z',
      updatedAt: '2022-05-19T16:25:19.765Z',
      owner: null
    })
  }
}

export default new MockService()
