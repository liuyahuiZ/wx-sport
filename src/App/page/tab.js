import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import Home from './home';
import My from './my';
import Ranking from './ranking';

const {
    Buttons,
    Toaster,
    Item,
    Header,
    Row,
    Col,
    Icon,
    MenuTab
  } = Components;
const { sessions } = utils;
  
class TabDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        liveInfo: null,
        resourceKey: sessions.getStorage('resourceKey') || '1'
      };
    }

    tabChange(v){
        const self = this;
        self.setState({
          'resourceKey': v
        });
        sessions.setStorage('resourceKey', v)
    }

    render() {
        const { resourceKey } = this.state;

        const tabOptions = [
        {tabName: (<Row><Col style={{'height': '0.8rem'}} className="relative">
            <div className={`icon ${resourceKey ==='1' ? 'icon-home-a': 'icon-home'}`} />
          </Col>
          <Col className="font-size-8">首页</Col></Row>), iconName: 'ios-home-outline ', keyword: '1', content:(<Home status={resourceKey== '1'} />)},
        
        { tabName: (<Row><Col style={{'height': '0.8rem'}} className="relative">
          <div className={`icon ${resourceKey ==='2' ? 'icon-rating-a': 'icon-rating'}`} />
        </Col>
        <Col className="font-size-8">排名</Col></Row>), iconName: 'ios-filing ', keyword: '2', content:(<Ranking status={resourceKey== '2'}/>)},
        
        { tabName: (<Row><Col style={{'height': '0.8rem'}} className="relative">
        <div className={`icon ${resourceKey ==='3' ? 'icon-my-a': 'icon-my'}`} />
      </Col>
      <Col className="font-size-8">我的</Col></Row>), iconName: 'android-person  ', keyword: '3', content:(<My status={resourceKey== '3'} />)}];
        const typeOption = {
          showIcon: false,
          activeColor: '#8FBF66',
          defaultColor: '#444444',
          headStyle: {
            'background': '#151515'
          }
        };
        return(
          <section className="bg-000">
            <MenuTab options={tabOptions} typeOption={typeOption} active={this.state.resourceKey} onChange={(v)=>{
                  this.tabChange(v);
                }} />
          </section>
        );
    }
}
export default TabDoc;
