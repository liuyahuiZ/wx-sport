import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import Demo from './demo';
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
        const tabOptions = [{ tabName: 'home', iconName: 'ios-home-outline ', keyword: '1', content:(<Demo />)},
        { tabName: 'second', iconName: 'ios-filing ', keyword: '2', content:(<Pay />)},
        { tabName: 'my', iconName: 'outlet ', keyword: '3', content:(<My />)}];
        const typeOption = {
          showIcon: true,
          activeColor: '',
          defaultColor: ''
        };
        return(
          <section className="bg-f5f5f5">
            <MenuTab options={tabOptions} typeOption={typeOption} active={this.state.resourceKey} onChange={(v)=>{
                  this.tabChange(v);
                }} />
          </section>
        );
    }
}
export default TabDoc;
