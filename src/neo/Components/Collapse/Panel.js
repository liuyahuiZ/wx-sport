import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as arrayUtils from '../../utils/array';
import Icon from '../Icon';
import styles from './style';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import '../Style/comstyle.scss';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabContentStyle: '',
      contentStyle: 'show',
      height: 0,
      offsetHeight: 0,
      isFirst: true
    };
    this.changeActive = this.changeActive.bind(this);
    this.setHeight = this.setHeight.bind(this);
  }
  componentDidMount() {
    // console.log(this.$$panelContent.offsetHeight);
    // this.setHeight(this.$$panelContent.offsetHeight, 'height');
    // this.setHeight(this.$$panelContent.offsetHeight, 'offsetHeight');
  }
  componentWillReceiveProps() {
    // console.log(this.$$panelContent.offsetHeight);
  }
  componentDidUpdate() {
  }
  setHeight(theHeight, key) {
    this.setState({ [key]: theHeight });
  }
  changeActive() {
    const { contentStyle, height, isFirst } = this.state;
    if (isFirst === false) {
      this.setState({ isFirst: true });
    }
    setTimeout(() => {
      this.setHeight(this.$$panelContent.offsetHeight, 'height');
      if (contentStyle === 'hide') {
        this.setState({ contentStyle: 'show' });
        this.setState({ offsetHeight: 0 });
      } else {
        this.setState({ contentStyle: 'hide' });
        this.setState({ offsetHeight: this.$$panelContent.offsetHeight });
      }
    }, 100);
  }
  render() {
    const { children, title } = this.props;
    const { contentStyle, offsetHeight, isFirst } = this.state;
    const self = this;
    const iconName = contentStyle === 'show' ? 'chevron-down' : 'chevron-right';
    const contentHeight = { marginTop: -offsetHeight };
    const content = isFirst === true ? (<div
      ref={(r) => { self.$$panelContent = r; }}
      style={arrayUtils.merge([styles.panelContent, contentHeight])}
    >
      {children}</div>) : '';
    return (
      <div style={arrayUtils.merge([styles.panel])} className="transi">
        <div
          style={styles.panelHeader} onClick={() => { this.changeActive(); }}
          ref={(r) => { self.$$panelHeader = r; }}
        >
        <Row >
          <Col span={20}>{title}</Col>
          <Col span={4} className="text-align-right"><Icon iconName={iconName} size={'100%'} style={styles.icon} /></Col>
        </Row>
        </div>
        {content}
      </div>
    );
  }
}

Panel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.arrayOf(), PropTypes.func]),
  title: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])
};

Panel.defaultProps = {
  children: [],
  title: ''
};


export default Panel;
