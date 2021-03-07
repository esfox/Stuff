/* Reference type declaration file. */
/// <reference path="../typings/index.d.ts" />

import axios from 'axios';

const tags = axios.create(
  {
    baseURL: '/api/tags',
  });

export class TagsService
{
  /**
   * @returns {Promise<Map<string, Tag>>}
   */
  static async getAll()
  {
    try
    {
      const { data } = await tags.get('/');
      const tagsData = new Map(Object.entries(data));
      return tagsData;
    }
    catch(error)
    {
      console.log(error);
    }
  }
}
