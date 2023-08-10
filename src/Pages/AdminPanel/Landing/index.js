import React, { useState } from 'react'
import styled from 'styled-components'
import {
  HiddenIcon,
  Page,
  Paper,
  Text,
  VisibleIcon,
  // Button,
  // LockIcon,
  // RequestIcon,
  // UnlockIcon,
  // UsersIcon,
  // WordIcon,
} from 'Components'
// import { useHistory } from 'react-router'
import useAPI from 'utils/hooks/useAPI'
const LandingDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: 'header' 'content';
  grid-gap: 40px;
`

// const NavButton = styled(Button)`
//   background-color: #ccc;
//   margin: 5px;
// `
const Content = styled.div`
  grid-area: content;
`
const Header = styled.div`
  grid-area: header;
  display: grid;

  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'icon buttons info';
`
const Info = styled.div`
  grid-area: info;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const InfoChip = styled(Paper)`
  display: grid;
  place-items: center;
  grid-template-columns: auto auto;
  grid-auto-flow: column;
  grid-gap: 10px;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #111;
  padding: 10px 25px;
  margin: 5px;
`
// const AdminButton = styled(Button)`
//   grid-area: icon;
//   background-color: transparent;
//   box-shadow: none;
//   &:hover {
//     box-shadow: 1px 1px 1px #ccc;
//   }
// `
// const Buttons = styled.div`
//   grid-area: buttons;
//   display: flex;
//   justify-content: flex-start;
// `
// const Link = ({ children, to }) => {
//   const history = useHistory()
//   return (
//     <NavButton
//       color='#bbb'
//       round={true}
//       size={5}
//       onClick={() => history.push(to)}
//     >
//       {children}
//     </NavButton>
//   )
// }
const Landing = ({ children }) => {
  const { roles, words } = useAPI()
  const [showPublicTooltip, setShowPublicTooltip] = useState(false)
  const [showPrivateTooltip, setShowPrivateTooltip] = useState(false)
  const togglePrivateTooltip = () => setShowPrivateTooltip((bool) => !bool)
  return (
    <Page>
      <LandingDiv>
        <Header>
          {/* <AdminButton round={true}>
            {roles.includes('editor') ? (
              <UnlockIcon size={3} />
            ) : (
              <LockIcon size={3} />
            )}
          </AdminButton> */}
          {/* <Buttons>
            {roles.includes('editor') ? (
              <Link to='/admin/requests'>
                <RequestIcon />
              </Link>
            ) : null}
            {roles.includes('admin') ? (
              <>
                <Link to='/admin'>
                  <WordIcon />
                </Link>

                <Link to='/admin/users'>
                  <UsersIcon />
                </Link>
              </>
            ) : null}
          </Buttons> */}

          <Info>
            <InfoChip
              color='transparent'
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowPublicTooltip(true)}
              onMouseLeave={() => setShowPublicTooltip(false)}
            >
              <VisibleIcon />
              <Text size={1.3}>
                {` ${words.filter((e) => e.public).length}`}
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  top: showPublicTooltip ? -25 : -10,
                  backgroundColor: '#ddd',
                  fontSize: 12,
                  padding: 3,
                  borderRadius: 1,
                  opacity: showPublicTooltip ? 1 : 0,
                  transition: 'all 0.2s ease',
                }}
              >{`${words.filter((e) => e.public).length} public words`}</Text>
            </InfoChip>
            {roles.includes('editor') ? (
              <InfoChip
                color='transparent'
                style={{ position: 'relative' }}
                onMouseEnter={togglePrivateTooltip}
                onMouseLeave={togglePrivateTooltip}
              >
                <HiddenIcon />
                <Text size={1.3}>
                  {` ${words.filter((e) => !e.public).length}`}
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    top: showPrivateTooltip ? -25 : -10,
                    backgroundColor: '#ddd',
                    fontSize: 12,
                    padding: 3,
                    borderRadius: 1,
                    opacity: showPrivateTooltip ? 1 : 0,
                    transition: 'all 0.2s ease',
                  }}
                >{`${
                  words.filter((e) => !e.public).length
                } hidden words`}</Text>
              </InfoChip>
            ) : null}
            {/* <Text size={1.3}>{`[ ${words.filter((e) => e.public).length} / ${
              words.length
            } ]`}</Text> */}
          </Info>
        </Header>
        <Content>{children}</Content>
      </LandingDiv>
    </Page>
  )
}

export default Landing
