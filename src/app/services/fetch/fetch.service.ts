import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor() { }

  fetchData = async <T = unknown>(url: string, options: any = null) => {
    if (options === null) {
      options = {
        method: 'GET'
      }
    }
    const response = await fetch(url, options)
    const data:T = await response.json()

    return data;
  }
}
