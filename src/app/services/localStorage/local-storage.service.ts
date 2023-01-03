import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  removeLocalStorage(key: string) {
    localStorage.removeItem(key)
  }

  getLocalStorage<T>(key: string) {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return <T>JSON.parse(jsonValue)
  
    return jsonValue
  }
}
