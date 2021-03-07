import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import styled from 'styled-components';
import { useAppContext } from '../contexts/AppContext';

const AppBarContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  background: var(--color-background-light);

  & > h1,
  & > div{

    &:first-child {
      padding: 1.5rem;
    }

    &:last-child {
      text-align: right;
    }
  }

  .tabs .active {
    box-shadow: inset 0 -5px var(--color-primary);
  }
`;

export function AppBar()
{
  const { pathname } = useRouter();
  const appContext = useAppContext();

  const onToggleTheme = () => appContext.toggleTheme();

  return (
    <AppBarContainer className="fg-colored">
      <h1 className="ma0 lh-solid pointer">
        Stuff
      </h1>
      <div className="tabs h-5 self-stretch flex items-stretch">
        {
          [
            {
              link: '/',
              label: 'Things',
              icon: 'fas fa-thumbtack',
            },
            {
              link: '/tags',
              label: 'Tags',
              icon: 'fas fa-tags',
            },
          ].map(({ link, label, icon }, i) =>
            <Link key={i} href={link}>
              <div className={'flex items-center pointer hover-dim-bg ph3'
                + `${link === pathname ? ' active' : ''}`}>
                <i className={`${icon} fa-lg mr3`}></i>
                <h2 className="di">{label}</h2>
              </div>
            </Link>
          )
        }
      </div>
      <div className="flex items-center justify-end">
        <button
          className="clear w2 h2 flex justify-center items-center br-pill fg-colored mr2"
          onClick={onToggleTheme}
        >
          <i className="fas fa-adjust fa-lg"></i>
        </button>
        <div className="self-stretch flex items-center pointer hover-dim-bg ph3">
          <span className="fw6 f4 lh-solid mr2" onClick={signOut}>Username</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </AppBarContainer>
  );
}
