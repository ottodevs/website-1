import React from 'react'
import styled from 'styled-components'
import { Text, breakpoint, BreakPoint, SafeLink } from '@aragon/ui'
import MenuItem from './MenuItem'
import MenuPanel from './MenuPanel'
import Logo from './assets/lorikeet-logo.svg'

const LorikeetNav = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  z-index: 5;
  background: rgb(248, 251, 253, 0.9);
  backdrop-filter: blur(3px);
  .brand {
    display: flex;
  }
  .brand img {
    height: 25px;
  }
`;

const End = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ul {
    display: flex;
  }
  button {
    margin: 0 0 0 10px;
  }
`;

const renderMenuItemLink = ({ url, children }) =>
  url.startsWith('/') ? (
    <SafeLink href={url}><Text size="xlarge">{children}</Text></SafeLink>
  ) : (
    <SafeLink href={url} target="_blank">
      <Text size="xlarge">{children}</Text>
    </SafeLink>
  );

class Navbar extends React.Component {

  scrollingAnimation = () => {
    let navbarElement = document.getElementById('navbar');

    if(document.documentElement.scrollTop > 150 || document.body.scrollTop > 150) {
      navbarElement.classList.add('navbar-animation');
      navbarElement.classList.remove('navbar-inverse-animation');
    } else {
      navbarElement.classList.remove('navbar-animation');
      navbarElement.classList.add('navbar-inverse-animation');
    }
  }

  componentDidMount() {
    this.scrollingAnimation();
    let self = this;
    window.addEventListener('scroll', function() {
      self.scrollingAnimation();
    });
  }

  render() {
    const menuItems = [
      ['/', 'Overview'],
      ['/docs', 'Docs', true],
      ['/downloads', 'Downloads'],
    ];
    return (
      <LorikeetNav id="navbar">
        <SafeLink href="">
          <img src={Logo} />
        </SafeLink>
        <End>
          <BreakPoint from="large">
            <ul>
              {menuItems.map((item, i) => (
                <MenuItem
                  key={i}
                  url={item[0]}
                  label={item[1]}
                  active={item[2]}
                  renderLink={renderMenuItemLink}
                />
              ))}
            </ul>
          </BreakPoint>
          <BreakPoint to="large">
            <MenuPanel items={menuItems} renderLink={renderMenuItemLink} />
          </BreakPoint>
        </End>
      </LorikeetNav>
    )
  }
}

export default Navbar