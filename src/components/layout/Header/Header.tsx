import { Bar, Nav, A } from './styles.ts';

const Header = () => (
  <Bar>
    <Nav>
      <A to="/">Fondos</A>
      <A to="/portfolio">Cartera</A>
    </Nav>
  </Bar>
);

export default Header;

 