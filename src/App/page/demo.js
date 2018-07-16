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
  
class SwitchDoc extends BaseView {
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
          <Row className="padding-all padding-bottom-3 bg-show border-bottom border-color-f5f5f5"  key={`${idx}-itm`}>
            <Col span={14}>
              <Row>
                  <Col span={5}>
                    <Icon iconName={'social-codepen '} size={'180%'} iconColor={'#4698F9'} />
                  </Col>
                  <Col span={19}>
                    <Row>
                      <Col>定期理财</Col>
                      <Col className="font-size-8 textclolor-gray">年华利率6.00%</Col>
                    </Row>
                  </Col>
              </Row>
            </Col>
            <Col span={10} className="font-size-8 textclolor-gray-red text-align-right">银行信用 当日起息</Col>
          </Row>)
        });

      return(
          <section >
            <Header
              leftContent={{
                text: (<Icon iconName={'ios-arrow-back'} size={'180%'} iconColor={'#000'} />), style:{flex: '1.3',width: '23%', paddingLeft: '0.2rem'},
                onClick: ()=>{hashHistory.goBack();}
              }}
              centerContent={{text: 'Demo', style:{flex: '3.5'} }}
              rightContent={{text:'', style:{flex: '1.5'}}}
            />
            <PullRefresh className="has-header" onLoading={()=>{
              this.loadFunc()
            }} refreshed={refreshed}>
              <Carousel options={carouselMap} showDotsText={false} dragAble />
              <Row justify='center'>
              <Col className="bg-show margin-top-2 margin-bottom-3">
                <Row className="padding-all">
                  <Col>
                    <Item leftContent={{text:'红圈面板', style: {flex: '7', fontSize: '1rem'}}} 
                      rightContent={{text: (<Icon iconName={'ios-paper'} size={'160%'} iconColor={'#4698F9'} />), style: {flex: '1'}}} />
                  </Col>
                  <Col span={8} onClick={()=>{this.goCreateArticle('/CreateArticle')}}>
                    <Row className="padding-top-1r" justify="center">
                      <Col className="text-align-center">
                        <span className="middle-round border-radius-round bg-button-red display-inline-block line-height-4r">
                          <Icon iconName={'pie-graph '} size={'180%'} iconColor={'#fff'} />
                        </span>
                      </Col>
                      <Col className="text-align-center textcolor-2d2d2d">趋势</Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row className="padding-top-1r" justify="center">
                      <Col className="text-align-center">
                        <span className="middle-round border-radius-round bg-ffe082 display-inline-block line-height-4r">
                        <Icon iconName={'ios-stopwatch'} size={'180%'} iconColor={'#fff'} />
                        </span>
                      </Col>
                      <Col className="text-align-center textcolor-2d2d2d">时态</Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Row className="padding-top-1r" justify="center">
                      <Col className="text-align-center">
                        <span className="middle-round border-radius-round bg-7ecef4 display-inline-block line-height-4r">
                        <Icon iconName={'paper-airplane'} size={'180%'} iconColor={'#fff'} />
                        </span>
                      </Col>
                      <Col className="text-align-center textcolor-2d2d2d">飞机</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col>{productListDom}</Col>
              <Col className="bg-show margin-top-2 padding-all">
                <Row>
                  <Col className="line-height-2r textcolor-2d2d2d">其他服务</Col>
                </Row>
                <Row>
                  <Col className="padding-all" span={12}>
                    <div className="heighr-4 bg-home"></div>
                  </Col>
                  <Col className="padding-all" span={12}>
                    <div className="heighr-4 bg-home"></div>
                  </Col>
                </Row>
              </Col>
              <Col className="bg-show margin-top-2 overflow-hide heighr-4">
                <Carousel options={listMap} showHeight={false} showDotsText={false} showDots={false} dragAble />  
              </Col>
            </Row>
            </PullRefresh>
        </section>
        );
    }
}
export default SwitchDoc;