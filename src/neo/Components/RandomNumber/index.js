import React, { Component } from 'react';

class RandomNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value||0,
      randomValue: 0
    };
    this.timmer = {};
  }
  componentDidMount(){
    this.runderStart()
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      value: nextProps.value||0,
    })
    this.runderStart()
  }
  runderStart() {
    this.timmer = setInterval(() => {
      this.changePercent();
    }, 10);
  }

  changePercent() {
    let per = this.state.randomValue;
    let latestNumber = this.state.value;
    let rate = 2;
    let ro = 1;
    let numLength = latestNumber.toString().length;
    if(numLength < 3) {
      ro = 1
    }else if(numLength < 6) {
      ro = 2
    } else {
      ro = numLength > rate ? numLength - rate : 1;
    }
    let addp = Math.pow(10,ro);

    console.log(per, addp)
    if (per < latestNumber ) {
      per += addp;
      this.setState({
        randomValue: per
      });
    } else if(per >= latestNumber) {
      this.setState({
        randomValue: latestNumber
      });
      clearInterval(this.timmer);
    }
  }

  render() {
    const { value, style} = this.props;
    const { randomValue } = this.state;
    return (
      <div className="nemo-rate" style={ {height: '1rem', overflow:'hidden'} } >
          {randomValue}
      </div>
    );
  }
}

export default RandomNumber;
