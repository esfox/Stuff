/* Reference type declaration file. */
/// <reference path="../typings/index.d.ts" />

import axios from 'axios';

const things = axios.create(
  {
    baseURL: '/api/things',
  });

export class ThingsService
{
  /**
   * @returns {Promise<Thing[]>}
   */
  static async getAll()
  {
    try
    {
      const { data } = await things.get('/');
      return data;
    }
    catch(error)
    {
      console.log(error);
    }
  }
}
