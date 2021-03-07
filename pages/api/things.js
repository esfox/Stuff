const testThings =
  [
    {
      title: 'A thing',
      content: 'This is the content of this thing that I want to save with searchable tags and I want to save this because I might need this content in the future.',
      date: '2020-11-29',
      tags:
        [
          {
            name: 'Tag 1',
            color: '#4caf50',
          },
          {
            name: 'Tag 2',
            color: '#f44336',
          },
          {
            name: 'Lorem ipsum dolor sit amet, consectetuer adipiscin 1',
            color: '#03A9F4',
          },
          {
            name: 'Lorem ipsum dolor sit amet, consectetuer adipiscin 2',
            color: '#81D4FA',
          },
          {
            name: 'Lorem ipsum dolor sit amet, consectetuer adipiscin 3',
            color: '#2196F3',
          },
          {
            name: 'Tag 3',
            color: '#009688',
          },
          {
            name: 'Tag 4',
            color: '#EC407A',
          },
          {
            name: 'Tag 5',
            color: '#673AB7',
          },
          {
            name: 'Tag 6',
            color: '#F57C00',
          },
          {
            name: 'Tag 7',
            color: '#795548',
          },
          {
            name: 'Tag 8',
            color: '#FFEB3B',
          },
          {
            name: 'Tag 9',
            color: '#FF6F00',
          },
          {
            name: 'Tag 10',
            color: '#76FF03',
          },
          {
            name: 'Tag 11',
            color: '#f44336',
          },
          {
            name: 'Tag 12',
            color: '#8BC34A',
          },
        ],
    }
  ];

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default function(req, res)
{
  const things = [];
  for(const i in [...Array(20).keys()])
  {
    const thing = { ...testThings[0] };
    if(i == 0)
    {
      thing.content = `${thing.content} ${thing.content}`;
      thing.tags = thing.tags.slice(0, 4);
    }

    if(i == 1)
      thing.tags = thing.tags.slice(0, 3);

    if(i == 2)
      thing.tags = thing.tags.slice(0, 6);

    things.push(thing);
  }

  res.json(things);
}
