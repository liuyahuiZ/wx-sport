import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import moment from 'moment';
import wx from 'weixin-js-sdk';
import { subjectCourses } from '../api/subject';
import { userOrdeRing } from '../api/classes'

const {
    Buttons,
    Toaster,
    Modal,
    PopSelect,
    Row,
    Col,
    Icon,
    Carousel,
    Loade
  } = Components;
const { sessions, storage } = utils;
  
class ClassList extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          classList: [],
          dateArr: [],
          loadText: '加载中',
          selectDay: ''
      };
    }
    _viewAppear(){
      this.initClander();
    }
  
    initClander(){
      const self = this;
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
        dateArr: dataArr,
        selectDay: dataArr[0]
      },()=>{
        self.getList()
      });

    }
    getList(){
      let obg = UrlSearch();
      const self = this;
      const { selectDay } = this.state;
      Loade.show();
      subjectCourses({
        subjectId:obg.subjectId,
        datetime: selectDay.dateTime 
      }).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        Loade.hide();
        if(JSON.stringify(data)!=='{}'){
          self.setState({
            classList: [data]
          })
        } else {
          self.setState({
            loadText: '暂无数据',
            classList: []
          })
        }
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link, id){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: {
            subjectId : id,
          }
        });
      }
    }

    doSheet(){
      const {meatType } = this.state;
      PopSelect.formConfirm({
        title: '',
        content: 'this is a warning',
        options: [
        {
            "text": "深圳",
            "value": "1"
        },
        {
            "text": "广州",
            "value": "2"
        },
        ],
        btnSure: {
          text: '完成',
          type: 'link'
        },
        btnCancle: {
          text: '取消',
          type: 'link'
        } },
        (val) => {
          console.log(val)
         },
        (val) => { console.log(val) });
    }

    openMap(){
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          console.log(res);
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          Modal.alert({ title: '当前地理位置',
            content: (<div>{`纬度 - ${latitude}, 经度 - ${longitude}, 速度 - ${speed}, 位置精度 - ${accuracy}`}</div>),
            btn: {
              text: '确定',
              type: 'link',
              style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
            }, 
            type: 'large'
          },
          () => { console.log('nult callback'); });

          wx.openLocation({
            latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
            name: 'test', // 位置名
            address: 'test', // 地址详情说明
            scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: 'test' // 在查看位置界面底部显示的超链接,可点击跳转
          });
      
        }
      });
    }

    setData(itm){
      this.setState({'selectDay': itm},()=>{
        this.getList();
      });
    }
    ordeRing(it){
      console.log(it);
      let obg = UrlSearch();
      Loade.show();
      let userId = storage.getStorage('userId');
      if(!obg.orderId) {Toaster.toaster({ type: 'error', content: '无效的订单', time: 3000 }); return; }
      userOrdeRing({
        userId: userId,
        orderId: obg.orderId,
        orderCourseId: it.id
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        Toaster.toaster({ type: 'error', content: '您已预约成功，请返回我的页面查看', time: 3000 })
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: '系统错误', time: 3000 });
        Loade.hide();
      })
    }


    render() {
        const {loadText, classList, dateArr, selectDay} = this.state;
        const self = this;
        const carouselMap = [{ tabName: 'first', content: (<img alt="text" src="https://static1.keepcdn.com/2018/03/27/14/1522133980415_375x375.jpg" />), isActive: true },
        { tabName: 'second', content: (<img alt="text" src="https://static1.keepcdn.com/2018/03/27/15/1522134154187_750x700.jpg" />), isActive: false },
        { tabName: 'thired', content: (<img alt="text" src="https://static1.keepcdn.com/2018/02/24/14/1519455021015_750x700.jpg" />), isActive: false }];
        
        const classListDom = classList.length > 0 ? classList.map((itm, idx) => {
          let itmDom = itm.children.length > 0 ? itm.children.map((it, id)=>{
            let statusDom = it.isOver ? <Col span={3.5} className="margin-top-2r zindex-10 bg-8EBF66 font-size-9  text-align-center border-radius-3 heighr-2 line-height-2r" onClick={()=>{ console.log('123'); this.ordeRing(it)}}>预约</Col>
          : <Col span={3.5} className="margin-top-2r zindex-10 border-all bg-D1D5D1 font-size-9  text-align-center border-radius-3 heighr-2 line-height-2r">结束</Col>;
          return (<Row className="padding-top-3 padding-left-3 padding-right-3 bg-1B1B1B" key={`${id}-lit`} >
            <Col className={`relative heighr-6 overflow-hide ${ id==(itm.children.length-1 )? 'margin-bottom-3': ''}`} >
              <Row className="zindex-10 bg-D1D5D1">
                <Col span={7}><img className="width-100 heighr-6" alt="text" src={`${config.IMG_URL}getphotoPal/2018-7-21/15321406954276.png`} /></Col>
                <Col className="margin-top-1r" span={13}>
                  <Row >
                    <Col className="zindex-10 font-size-8 textcolor-2d2d2d">{it.title}</Col>
                    <Col className="zindex-10 font-size-7 textcolor-2d2d2d">{it.description}</Col>
                    <Col className="zindex-10 font-size-7 textcolor-2d2d2d">{it.startTime}-{it.endTime} ¥{it.price}(会员 ¥63.55)</Col>
                  </Row>
                </Col>
                {statusDom}
              </Row>
            </Col>
            </Row>)
          }) : <div />;
          let doms = (<Row content="flex-start" className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D" key={`${idx}-s`}>
            <Col span={1}></Col>
            <Col span={11} className="font-size-10 textclolor-white line-height-2r ">{itm.cityName}</Col>
            <Col span={10} className="font-size-8 textclolor-white text-align-right line-height-2r " onClick={()=>{this.openMap()}}>查看地图</Col>
            <Col span={2} className="line-height-2r"><Icon iconName={'chevron-right '} size={'90%'} iconColor={'#333'} /></Col>
            <Col>{itmDom}</Col>
        </Row>)
          return  doms;
        }) : <Row className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D">
        <Col className="text-align-center font-size-8 textclolor-white line-height-2r">{loadText}</Col>
        </Row>;

        const clenderDom = dateArr.length > 0 ? dateArr.map((itm, idx)=>{
          return (<Col key={`${idx}-date`} span={24/7} onClick={()=>{ self.setData(itm); console.log(itm);}}>
          <Row><Col className="font-size-8 textclolor-black-low text-align-center">{itm.dateName}</Col>
          <Col className="font-size-8 textclolor-black-low text-align-center">
          <div className={`${selectDay.dateName==itm.dateName ? 'bg-8EBF66 ' :'' } display-inline-block font-size-8 textclolor-white small-round text-align-center border-radius-100`}>{itm.date}</div>
          </Col></Row>
          </Col>)
        }) : <Col className="text-align-center font-size-8 textclolor-white line-height-2r">{loadText}</Col>;
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col>
                <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              </Col>
              <Col className="margin-top-2 border-radius-5f overflow-hide bg-1B1B1B">
                <Row className="padding-all">{clenderDom}</Row>
                <Row className="margin-top-2 bg-0D0D0D">
                <Col span={12} className="padding-all font-size-9 textclolor-black-low text-align-center" onClick={()=>{this.doSheet()}}>地区 <Icon iconName={'chevron-down '} size={'90%'} iconColor={'#999'} /></Col>
                <Col span={12} className="padding-all font-size-9 textclolor-black-low text-align-center" onClick={()=>{this.doSheet()}}>课程类型 <Icon iconName={'chevron-up '} size={'90%'} iconColor={'#999'} /></Col>
                </Row>
              </Col>
              <Col>
              {classListDom}
              </Col>
            </Row>
          </section>
        );
    }
}
export default ClassList;
