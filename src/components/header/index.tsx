import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { Container, H1, Img, Adjust } from './styled';
import Logo from '../../images/enContact.png';

interface Props {
  toggleTheme(): void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);
  
  return (
    <Container>
      <Img src={Logo} alt="Logo enContact" />
      <H1>ToDo List</H1>
      <Adjust>
        <Switch
          onChange={() => { toggleTheme() }}
          checked={title === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={18}
          width={50}
          handleDiameter={25}
          onHandleColor={colors.background}
          onColor={colors.secondary}
        />
      </Adjust>
    </Container>
  );
}

export default Header;
