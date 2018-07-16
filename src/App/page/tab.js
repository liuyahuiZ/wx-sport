import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import Home from './home';
import My from './my';
import Pay from './pay';

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
  
class TabDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        liveInfo: null,
        resourceKey: '1'
      };
    }

    tabChange(v){
        const self = this;
        self.setState({
          'resourceKey': v
        });
    }

    render() {
        const tabOptions = [{ tabName: '首页', iconName: 'ios-home-outline ', keyword: '1', content:(<Home />)},
        { tabName: '排名', iconName: 'ios-filing ', keyword: '2', content:(<Pay />)},
        { tabName: '我的', iconName: 'android-person  ', keyword: '3', content:(<My />)}];
        const typeOption = {
          showIcon: true,
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
