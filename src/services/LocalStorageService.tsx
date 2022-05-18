export enum LocalStorageKeys {
    USER = 'USER'
}

class LocalStorageService {
  public saveItem<T> (key: LocalStorageKeys, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public getItem<T> (key: string): T {
    return JSON.parse(localStorage.getItem(key) as string)
  }

  public cleanItem (key: LocalStorageKeys): void {
    localStorage.removeItem(key)
  }
}

export default new LocalStorageService()
