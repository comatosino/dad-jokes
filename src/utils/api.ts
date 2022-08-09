import axios, { AxiosRequestConfig } from 'axios';
import { JokeResponse } from '../models/JokeResponse';

export default class API {
  static async getJoke(): Promise<string | undefined> {
    const url = 'https://icanhazdadjoke.com';
    const reqConfig: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };
    try {
      const response = await axios.get<JokeResponse>(url, reqConfig);
      if (response.data.status !== 200) {
        throw new Error('Uh-oh. Something went wrong while fetching...');
      }
      if (!response.data.joke) return 'Could not find a joke :(';
      return response.data.joke;
    } catch (err) {
      console.error(err);
    }
  }
}
