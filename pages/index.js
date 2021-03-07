import Head from 'next/head';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import { useQuery } from 'react-query';

import { Thing } from '../components/Thing';
import { CreateThingModal } from '../components/CreateThingModal';
import { useModal } from '../components/Modal';

import { ThingsService } from '../services/thingsService';
import { TagsService } from '../services/tagsService';
import { useEffect } from 'react';

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

const AddTagButton = styled.button`
position: sticky;
width: 72px;
height: 72px;
transition:
  background var(--hover-dim-duration),
  box-shadow var(--hover-dim-duration),
  transform  var(--hover-dim-duration);

&:hover {
  background: var(--color-primary-dark);
  box-shadow: 0px 5px 16px 0px rgba(0, 0, 0, 0.4);
  transform: scale(1.05);
}
`;

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

class ThingsHook
{
  constructor()
  {
    const { data: [things, tags] } = useQuery('things', async () =>
    {
      return Promise.all(
        [
          ThingsService.getAll(),
          TagsService.getAll(),
        ]
      );
    });


    this.things = things;
    this.tags = [...tags.values()];

    this.createThingModal = useModal();

    this.listenHotkeys();
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  onAddThing = thing =>
  {
    console.log(thing);
    // TODO: Save thing
    this.createThingModal.close();
  };

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  listenHotkeys = () =>
  {
    useEffect(() =>
    {
      document.addEventListener('keydown', event =>
      {
        if(event.altKey && event.key === 'n')
          this.createThingModal.show();

        if(this.createThingModal.shown)
        {
          if(event.key === 'Escape')
            this.createThingModal.close();
        }
      });
    }, [this.createThingModal]);
  };
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

export default function Things()
{
  const {
    things,
    tags,
    createThingModal: modal,
    onAddThing,
  } = new ThingsHook();

  return (
    <>
      <Head>
        <title>Recall | Stuff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid pancake-layout overflow-hidden">
        <div className="flex justify-between items-center pv3 ph4">
          <select placeholder="Filter by tags...">
            <option>Tag 1</option>
            <option>Tag 2</option>
            <option>Tag 3</option>
          </select>
          <input type="search" placeholder="Search..." />
          <button>
            <i className="far fa-calendar-alt mr2"></i>
            Filter by date
          </button>
        </div>
        <div className="overflow-y-auto">
          <Masonry
            breakpointCols={
              {
                default: 3,
                1400: 2,
                900: 1,
              }
            }
            className="flex pr4"
            columnClassName="pl4"
          >
            {
              !things
                ? <h1>Loading...</h1>
                : things.map((thing, i) =>
                  <Thing key={i} data={thing} />
                )
            }
          </Masonry>
          <AddTagButton
            className="bottom-2 fr bg-colored fg-light bn br-pill shadow-5 outline-0 z-max ma4"
            onClick={modal.show}
          >
            <i className="fa fa-plus fa-2x"></i>
          </AddTagButton>
        </div>
      </div>
      <CreateThingModal
        shown={modal.shown}
        tags={tags}
        onCreateThing={onAddThing}
        onClose={modal.close}
      />
    </>
  );
}
