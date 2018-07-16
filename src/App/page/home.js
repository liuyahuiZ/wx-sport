import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';

const {
    Row,
    Col,
    Icon,
    Buttons,
    Switch,
    Item,
    Header,
    PullRefresh,
    Carousel,
    Modal,
    Collapse,
    Panel
  } = Components;
  
class HomeDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          confirmDirty: false,
          refreshed: false,
          productList: [{name: 'query'},{name: 'gets'},{name: 'gets1'},{name: 'gets1'},{name: 'gets1'}]
      };
    }

    _viewAppear(){
      console.log('indemo');
    }
    loadFunc(){
      setTimeout(() => {
        this.setState({
          refreshed: true,
        })
      }, 3000);
    }
    goCreateArticle(link){
      if(link) {
        hashHistory.push(link);
      }
    }

  
    render() {
        const {refreshed, productList} = this.state;
        const carouselMap = [{ tabName: 'first', content: (<img alt="text" src="http://47.88.2.72:2016/getphotoPal/2017-4-13/14920521723196.png" />), isActive: true },
        { tabName: 'second', content: (<img alt="text" src="http://47.88.2.72:2016/getphotoPal/2017-4-13/14920532977814.jpg" />), isActive: false },
        { tabName: 'thired', content: (<img alt="text" src="http://47.88.2.72:2016/getphotoPal/2017-3-28/14906636798813.jpg" />), isActive: false }];
        const listMap = [{ tabName: 'first', content: (<div className="padding-all-15x bg-show"><div className="padding-all-10x bg-FECAAD textclolor-gray-red border-radius-100 ">抢100优惠券</div></div>), isActive: true },
        { tabName: 'second', content: (<div className="padding-all-15x bg-show"><div className="padding-all-10x bg-F1F8FD textclolor-alink border-radius-100 ">1元秒杀24期免息</div></div>), isActive: false },
        { tabName: 'thired', content: (<div className="padding-all-15x bg-show"><div className="padding-all-10x bg-F1F8FD textclolor-alink border-radius-100 ">小白卡满1000减30</div></div>), isActive: false }]

        const productListDom = productList.map((itm, idx)=>{
          return (
          <Row className="margin-top-3 border-radius-5f heighr-13 overflow-hide relative"  key={`${idx}-itm`}>
            <Col><img alt="text" src="http://47.88.2.72:2016/getphotoPal/2017-3-28/14906636798813.jpg" /></Col>
            <Col className="absolute bottom-5 left-5">
              <Row>
                  <Col span={19}>
                    <Row>
                      <Col className="font-size-12 textclolor-white">增强体制特训</Col>
                      <Col className="font-size-8 textclolor-white">训练·活动进行中</Col>
                    </Row>
                  </Col>
              </Row>
            </Col>
          </Row>)
        });

      return(
          <section className="padding-all bg-000">
              <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'5rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              <Row justify='center'>
              <Col>{productListDom}</Col>
            </Row>
        </section>
        );
    }
}
export default HomeDoc;