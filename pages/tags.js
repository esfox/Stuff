import Head from 'next/head';
import { useQuery } from 'react-query';
import { Tag } from '../components/Tag';

import { TagsService } from '../services/tagsService';

export default function Tags()
{
  const { data: tags } = useQuery('tags', TagsService.getAll);

  return (
    <>
      <Head>
        <title>Recall | Tags</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-100">
        <div className="pt4 pb3 ph4">
          <input type="search" placeholder="Search tags..." />
        </div>
        <div className="flex flex-wrap ph4">
          {
            !tags
              ? <h1>Loading...</h1>
              : [...tags.values()].map(tag =>
                <Tag key={tag.name} tag={tag} />
              )
          }
        </div>
      </div>
    </>
  );
}
