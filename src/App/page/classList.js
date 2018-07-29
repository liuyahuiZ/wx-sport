import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import moment from 'moment';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Carousel
  } = Components;
  
class ClassList extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          classList: [{start: false},{start: true},{start: true}],
          dateArr: []
      };
    }
    componentDidMount(){
      this.initClander();
    }
    initClander(){
      moment.locale('en', {
        weekdays : [
            "周日", "周一", "周二", "周三", "周四", "周五", "周六"
          ]
      });
      let weekOfday = moment().format('dddd');
      var today = moment().format('YYYY-MM-DD');
      let dataArr=[];
      let length = 7;
      for(let i=0;i<length;i++){
        let Name = moment().add('days', i).format('dddd')
        if(i===0){ Name = '今天'} else if(i===1) {Name = '明天'}
        dataArr.push({
          dateName: Name,
          date: moment().add('days', i).format('DD'),
          dateTime: moment().add('days', i).format('YYYY-MM-DD')
        })
      }
      this.setState({
        dateArr: dataArr
      })

    }
    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }

    render() {
        
        const {article, classList, dateArr} = this.state;
        const self = this;
        const carouselMap = [{ tabName: 'first', content: (<img alt="text" src="https://static1.keepcdn.com/2018/03/27/14/1522133980415_375x375.jpg" />), isActive: true },
        { tabName: 'second', content: (<img alt="text" src="https://static1.keepcdn.com/2018/03/27/15/1522134154187_750x700.jpg" />), isActive: false },
        { tabName: 'thired', content: (<img alt="text" src="https://static1.keepcdn.com/2018/02/24/14/1519455021015_750x700.jpg" />), isActive: false }];
        
        const classListDom = classList.map((itm, idx)=>{
          let statusDom = itm.start  ?  <Col span={3.5} className="margin-top-2r zindex-10 border-all bg-D1D5D1 font-size-9  text-align-center border-radius-3 heighr-2 line-height-2r">结束</Col>
          : <Col span={3.5} className="margin-top-2r zindex-10 bg-8EBF66 font-size-9  text-align-center border-radius-3 heighr-2 line-height-2r">预约</Col>;
          return (<Row className="padding-top-3 padding-left-3 padding-right-3 bg-1B1B1B" key={`${idx}-lit`} onClick={()=>{self.goLink('/ClassAppointment')}}>
          <Col className={`relative heighr-6 overflow-hide ${ idx==(classList.length-1 )? 'margin-bottom-3': ''}`} >
            <Row className="zindex-10 bg-D1D5D1">
              <Col span={7}><img className="width-100 heighr-6" alt="text" src={`${config.IMG_URL}getphotoPal/2018-7-21/15321406954276.png`} /></Col>
              <Col className="margin-top-1r" span={13}>
                <Row >
                  <Col className="zindex-10 font-size-8 textcolor-2d2d2d">BODY塑形杠铃操(3/3)</Col>
                  <Col className="zindex-10 font-size-7 textcolor-2d2d2d">Camail 牛油果资深的瑜伽老师</Col>
                  <Col className="zindex-10 font-size-7 textcolor-2d2d2d">曾获得各种设计瑜伽奖项...</Col>
                  <Col className="zindex-10 font-size-7 textcolor-2d2d2d">07:30-08:30 ¥68(会员 ¥63.55)</Col>
                </Row>
              </Col>
              {statusDom}
            </Row>
            {/* <img className="width-100 absolute-left" alt="text" src={`${config.IMG_URL}getphotoPal/2018-7-21/15321406954276.png`} /> */}
          </Col>
          </Row>)
        });
        const clenderDom = dateArr.length > 0 ? dateArr.map((itm, idx)=>{
          return (<Col key={`${idx}-date`} span={24/7}><Row><Col className="font-size-8 textclolor-black-low text-align-center">{itm.dateName}</Col>
          <Col className="font-size-8 textclolor-black-low text-align-center">{itm.date}</Col></Row></Col>)
        }) : <Col/>;
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col>
                <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              </Col>
              <Col className="margin-top-2 border-radius-5f overflow-hide bg-1B1B1B">
                <Row className="padding-all">{clenderDom}</Row>
                <Row className="margin-top-2 bg-0D0D0D">
                <Col span={12} className="padding-all font-size-9 textclolor-black-low text-align-center">地区 <Icon iconName={'chevron-down '} size={'90%'} iconColor={'#999'} /></Col>
                <Col span={12} className="padding-all font-size-9 textclolor-black-low text-align-center">课程类型 <Icon iconName={'chevron-up '} size={'90%'} iconColor={'#999'} /></Col>
                </Row>
              </Col>
              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col span={1}></Col>
                  <Col span={11} className="font-size-10 textclolor-white line-height-2r ">广州店</Col>
                  <Col span={10} className="font-size-8 textclolor-white text-align-right line-height-2r ">查看地图</Col>
                  <Col span={2} className="line-height-2r"><Icon iconName={'chevron-right '} size={'90%'} iconColor={'#333'} /></Col>
                </Row>
                {classListDom}
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col span={1}></Col>
                  <Col span={11} className="font-size-10 textclolor-white line-height-2r ">深圳店</Col>
                  <Col span={10} className="font-size-8 textclolor-white text-align-right line-height-2r ">查看地图</Col>
                  <Col span={2} className="line-height-2r"><Icon iconName={'chevron-right '} size={'90%'} iconColor={'#333'} /></Col>
                </Row>
                {classListDom}
              </Col>

            </Row>
          </section>
        );
    }
}
export default ClassList;
