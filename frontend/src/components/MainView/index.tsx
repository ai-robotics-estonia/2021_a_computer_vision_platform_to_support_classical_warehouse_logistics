import React, { ReactNode } from 'react';
import Container from 'react-bootstrap/Container';
import './style.scss';

interface PropTypes {
  children: ReactNode;
  className?: string;
}

const MainView = ({ children, className = '' }: PropTypes) => (
  <div className={`main-view ${className}`}>{children}</div>
);

interface ContentPropsType {
  children?: ReactNode;
  className?: string;
}

MainView.Content = ({ children, className = '' }: ContentPropsType) => (
  <Container className={`main-view-content ${className}`}>{children}</Container>
);

interface HeaderPropsType {
  title: string | ReactNode;
}

MainView.Header = ({ title }: HeaderPropsType) => (
  <div className="main-view-header">
    <Container>
      <h2>{title}</h2>
    </Container>
  </div>
);

export default MainView;
