import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import { UrlSearch } from '../utils';
import Home from './home';
import MyRoute from './my';
import Ranking from './ranking';
import Appointment from './appointment';
import { userMsgCount } from '../api/classes';

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
const { sessions, storage } = utils;
  
class TabDoc extends Component {
    constructor(props) {
      super(props);
      let obg = UrlSearch();
      this.state = {
        liveInfo: null,
        count: 0,
        resourceKey: obg.tab ? obg.tab : sessions.getStorage('resourceKey') || '1'
      };
    }

    componentDidMount(){
      let userId = storage.getStorage('userId');
      if(!userId) { return; }
      const self = this;
      userMsgCount({userId: userId}).then((res)=>{
        console.log(res);
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        self.setState({
          count: res.result
        })
      }).catch((err)=>{
        console.log(err);
      })
    }
    tabChange(v){
        const self = this;
        self.setState({
          'resourceKey': v
        });
        sessions.setStorage('resourceKey', v)
    }

    render() {
        const { resourceKey, count } = this.state;

        const tabOptions = [
        {tabName: (<Row><Col style={{'height': '0.8rem'}} className="relative">
            <div className={`icon ${resourceKey ==='1' ? 'icon-home-a': 'icon-home'}`} />
          </Col>
          <Col className="font-size-small">首页</Col></Row>), iconName: 'ios-home-outline ', keyword: '1', content:(<Home status={resourceKey== '1'} />)},
        
        { tabName: (<Row><Col style={{'height': '0.8rem'}} className="relative">
          <div className={`icon ${resourceKey ==='2' ? 'icon-rating-a': 'icon-rating'}`} />
        </Col>
        <Col className="font-size-small">排名</Col></Row>), iconName: 'ios-filing ', keyword: '2', content:(<Ranking status={resourceKey== '2'}/>)},

        { tabName: (<Row><Col style={{'height': '0.8rem'}} className="relative">
        { count>0 ? <span className="small-round border-radius-3r absolute right-1fr zindex-100 bg-ea3a3a textclolor-white top-p4r">{count}</span> : ''}
        <Icon iconName={'android-time'} size={'180%'} style={{"bottom":"8px","position": 'relative'}} iconColor={`${resourceKey=='3'? '#8EBF66': '#333'}`} />
        </Col>
        <Col className="font-size-small">预约</Col></Row>), iconName: 'ios-filing ', keyword: '3', content:(<Appointment status={resourceKey== '3'}/>)},
        
        { tabName: (<Row><Col style={{'height': '0.8rem'}} className="relative">
        <div className={`icon ${resourceKey ==='4' ? 'icon-my-a': 'icon-my'}`} />
      </Col>
      <Col className="font-size-small">我的</Col></Row>), iconName: 'android-person  ', keyword: '4', content:(<MyRoute status={resourceKey== '4'} />)}];
        const typeOption = {
          showIcon: false,
          activeColor: '#9eea6a',
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
