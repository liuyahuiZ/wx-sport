import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/comstyle.scss';
import * as arrayUtils from '../../utils/array';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
  }
  handleClick(event) {
    this.props.onClick(event);
  }
  render() {
    const { justify, align, style, gutter, className } = this.props;
    const styleJustyfy = justify ? `flex-justify-${justify}` : '';
    const styleAlign = align ? `flex-items-${align}` : '';
    const ClassName = `row flex-wrap ${styleJustyfy} ${styleAlign} ${className}`;
    const gutterStyle = gutter ? { margin: `0 ${0 - (gutter / 2)}px` } : '';
    const Children = this.props.children;
    let child = '';
    if (Children.length > 1) {
      child = Children.map((val, idx) => {
        const key = `${idx}-row`;
        const dom = React.cloneElement(val, { colgutter: gutter, key });
        return dom;
      });
    } else {
      child = React.cloneElement(Children, { colgutter: gutter });
    }
    return (
      <div className={ClassName} style={arrayUtils.merge([style, gutterStyle])} onClick={this.handleClick}>
        {child}
      </div>
    );
  }
}

Row.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})), PropTypes.func]),
  justify: PropTypes.string,
  align: PropTypes.string,
  style: PropTypes.shape({}),
  gutter: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Row.defaultProps = {
  children: [],
  justify: '',
  align: '',
  style: {},
  gutter: 0,
  className: '',
  onClick: () => {},
};


export default Row;
