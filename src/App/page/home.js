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
    Panel,
    TransAnimal
  } = Components;
  
class HomeDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          confirmDirty: false,
          refreshed: false,
          status: this.props.status,
          productList: [{name: 'query'},{name: 'gets'},{name: 'gets1'}]
      };
    }

    _viewAppear(){
      console.log('indemo');
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        status: nextProps.status
      })
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
        const {status, productList} = this.state;
        const carouselMap = [{ tabName: 'first', content: (<img alt="text" src="https://static1.keepcdn.com/2018/03/27/14/1522133980415_375x375.jpg" />), isActive: true },
        { tabName: 'second', content: (<img alt="text" src="https://static1.keepcdn.com/2018/03/27/15/1522134154187_750x700.jpg" />), isActive: false },
        { tabName: 'thired', content: (<img alt="text" src="https://static1.keepcdn.com/2018/02/24/14/1519455021015_750x700.jpg" />), isActive: false }];
        
        let imgArr = ['http://47.88.2.72:2016/getphotoPal/2018-7-23/15323156729698.png',
      'https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg',
    'https://static1.keepcdn.com/2018/03/01/15/1519888737768_315x315.png']
        const productListDom = productList.map((itm, idx)=>{
          return (
          <Row className="margin-top-3 border-radius-5f heighr-13 overflow-hide relative"  key={`${idx}-itm`} onClick={()=>{this.goCreateArticle('/ClassList')}}>
            <Col><img alt="text" src={imgArr[idx]} /></Col>
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