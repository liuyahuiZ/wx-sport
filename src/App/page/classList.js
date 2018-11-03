import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import moment from 'moment';
import wx from 'weixin-js-sdk';
import formate from '../utils/formate';
import { subjectCourses, createOrder } from '../api/subject';
import { userOrdeRing, userInfo } from '../api/classes'

const {
    Buttons,
    Toaster,
    Modal,
    PopSelect,
    Row,
    Col,
    Icon,
    Carousel,
    Loade,
    PopContainer
  } = Components;
const { sessions, storage } = utils;
  
class ClassList extends BaseView {
    constructor(props) {
      super(props);
      let obg = UrlSearch();
      this.state = {
          article: {},
          classList: [],
          dateArr: [],
          loadText: '加载中',
          selectDay: '',
          courseTypeId: obg.courseTypeId,
          userInfoMation: {}
      };
    }
    _viewAppear(){
      this.initClander();
      this.getUserInfoMation();
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

    getUserInfoMation(){
      let userId = storage.getStorage('userId');
      const self = this;
      userInfo({
        userId: userId
      }).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        if(res.code>0&&data){
          self.setState({
            userInfoMation: data
          })
        }
        console.log(res);
      }).catch((e)=>{
        console.log(e);
      })
    }

    getList(){
      let obg = UrlSearch();
      const self = this;
      const { selectDay, courseTypeId } = this.state;
      Loade.show();
      subjectCourses({
        subjectId:obg.subjectId,
        datetime: selectDay.dateTime,
        courseTypeId: courseTypeId,
        // difficulty: obg.difficulty
      }).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        Loade.hide();
        if(JSON.stringify(data)!=='{}'){
          let loadText = '加载中';
          if(data.length==0){
            loadText = '暂无数据';
          }
          self.setState({
            classList: data,
            loadText: loadText
          })
        } else {
          self.setState({
            loadText: '暂无数据',
            classList: []
          })
        }
      }).catch((e)=>{
        Loade.hide();
        self.setState({
          loadText: '暂无数据',
          classList: []
        })
        console.log(e)
      })
    }
    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link, obg){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: obg
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

    doSheet1(){
      const {meatType } = this.state;
      let type = sessions.getStorage('nowSubject');
      const self = this;
      let options = [];
      for(let i=0;i< type.courseTypes.length;i++){
        options.push({
          "text": type.courseTypes[i].name,
          "value": type.courseTypes[i].id
        })
      }
      PopSelect.formConfirm({
        title: '',
        content: 'this is a warning',
        options: options,
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
          self.setState({
            courseTypeId: val.value
          },()=>{
            self.getList(val)
          })
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

    undefindOrder(it){
      const { subjectId } = this.state;
      const self = this;
      let userId = storage.getStorage('userId');
      let authCode = storage.getStorage('authCode');
      let obg = UrlSearch();
      console.log(authCode);
      Loade.show();
      createOrder({
        "authCode": authCode,
        "clientIP": '192.168.3.1',
        "subjectId": subjectId,
        "userId": userId,
        "courseId": it.courseId
      }).then((res)=>{
        Loade.hide();
        console.log(res);
        if(!res.prepayId) { Toaster.toaster({ type: 'error', content: '调用支付失败,请稍后重试', time: 3000 }); return; }
        self.bought(res, it);
      }).catch((err)=>{
        Loade.hide();
        console.log(res);
      })
      sessions.setStorage('nowCourse', it);
    }

    bought(res, it){
      const self = this;
      let obg = UrlSearch();
      wx.chooseWXPay({
        timestamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: 'prepay_id='+res.prepayId,
        signType: 'MD5', // 注意：新版支付接口使用 MD5 加密
        paySign: res.paySign,
        success: function (respon) {
          Toaster.toaster({ type: 'error', content: '购买成功', time: 3000 });
          self.goLink('/Success', Object.assign({},{
            "type": 'appoint',
            "courseId": it.courseId
          }) )
        }
      });
    }

    ordeRing(it){
      // console.log(it);
      let obg = UrlSearch();
      const self = this;
      const { userInfoMation } = this.state;
      if(userInfoMation&&userInfoMation.phone=='') {
        self.goLink('/Registor')
        return ;
      }
      Loade.show();
      userOrdeRing({
        courseId: it.courseId
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        if(res.result) {
          self.doBought(it);
        } else{
          Toaster.toaster({ type: 'error', content: '预约已满', time: 3000 }); return;
        }
        // self.undefindOrder()
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: '系统错误', time: 3000 });
        Loade.hide();
      })
    }
    doBought(it){
      console.log(it);
      const self = this;
      PopContainer.confirm({
        content: (<div className="bg-0D0D0D">
          <Row className="border-bottom border-color-e5e5e5 bg-101111 border-radius-5f bg-0D0D0D">
            <Col span={4} className={'text-align-center'} onClick={() => { PopContainer.closeAll() }} >
                <Icon iconName={"android-close"} size={'180%'} iconColor={'#fff'} />
            </Col>
            <Col span={16} className={'text-align-center line-height-3r'}></Col>
            <Col>
              <Row className={"padding-all-1r line-height-3r"}>
                <Col className={"border-bottom border-color-333 textclolor-black-low"}>
                  <Row>
                    <Col span={12}>总价：</Col>
                    <Col span={12} className={"text-align-right"}>{formate.formateMoney(it.price)}元</Col>
                  </Row>
                </Col>
                <Col className={"border-bottom border-color-333 textclolor-black-low"}>
                  <Row>
                    <Col span={12}>会员折扣价：</Col>
                    <Col span={12} className={"text-align-right"}>{formate.formateMoney(it.price)}元</Col>
                  </Row>
                </Col>
                <Col className={"border-bottom border-color-333 textclolor-black-low"}>
                  <Row>
                    <Col span={12}>会员卡折后价</Col>
                    <Col span={12} className={"text-align-right"}>{formate.formateMoney(it.price)}元</Col>
                  </Row>
                </Col>
                <Col className={"text-align-center font-size-small textclolor-black-low"}>还需支付</Col>
                <Col className={"text-align-center font-size-large textcolor-79EF44"}>¥{formate.formateMoney(it.price)}</Col>
              </Row>
              <Row className={"padding-all-1r"}>
                <Col span={24} className="font-size-default textclolor-white">温馨提示</Col>
                <Col span={24} className="font-size-small textclolor-black-low ">1. 入门课开课12小时前免费取消预约，支持全额退款；</Col>
                <Col span={24} className="font-size-small textclolor-black-low ">2. 入门课开课12小时后取消预约，不支持全额退款；</Col>
                <Col span={24} className="font-size-small textclolor-black-low ">3. 入门课需提前15分钟到场，迟到15分钟不能再参加，不支持全额退款</Col>
                <Col className="margin-top-2">
                 <Buttons
                  text={`确认付款`}
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    PopContainer.closeAll();
                    self.undefindOrder(it)
                  }}
                /></Col>
              </Row>
            </Col>
          </Row>
          </div>),
      type: 'bottom',
      containerStyle: { top: '3rem'},
      });
    }


    render() {
        const {loadText, classList, dateArr, selectDay} = this.state;
        const self = this;
        // const carouselMap = [{ tabName: 'first', content: (<img alt="text" src="https://static1.keepcdn.com/2018/03/27/14/1522133980415_375x375.jpg" />), isActive: true },
        // { tabName: 'second', content: (<img alt="text" src="https://static1.keepcdn.com/2018/03/27/15/1522134154187_750x700.jpg" />), isActive: false },
        // { tabName: 'thired', content: (<img alt="text" src="https://static1.keepcdn.com/2018/02/24/14/1519455021015_750x700.jpg" />), isActive: false }];
        
        const classListDom = classList&&classList.length > 0 ? classList.map((itm, idx) => {
          let itmDom = itm.children&&itm.children.length > 0 ? itm.children.map((it, id)=>{
            let statusDom = it.currentPeople < it.maxPeople ? <Col span={3.5} className="margin-top-2r zindex-10 bg-1B1B1B font-size-default border-all border-color-9eea6a textcolor-79EF44 text-align-center border-radius-3 heighr-2 line-height-2r" onClick={()=>{ console.log('123'); this.ordeRing(it)}}>预约</Col>
          : <Col span={3.5} className="margin-top-2r zindex-10 border-all border-color-999  bg-1B1B1B textclolor-black-low font-size-default  text-align-center border-radius-3 heighr-2 line-height-2r" >结束</Col>;
          return (<Row className="padding-top-3 padding-left-3 padding-right-3 bg-1B1B1B border-bottom border-color-333" key={`${id}-lit`} >
            <Col className={`relative heighr-6 overflow-hide ${ id==(itm.children.length-1 )? 'margin-bottom-3': ''}`} >
              <Row className="zindex-10 ">
                <Col span={7} className="margin-top-1r">
                  <div className="middle-round border-radius-round overflow-hide">
                    <img className="width-100 heighr-4" alt="text" src={it.coachImgUrl} />
                  </div>
                </Col>
                <Col className="margin-top-1r" span={13}>
                  <Row >
                    <Col className="zindex-10 font-size-small textclolor-white">{it.title} ({it.currentPeople||0}/{it.maxPeople||0})</Col>
                    <Col className="zindex-10 font-size-7 textclolor-black-low">{it.desc}</Col>
                    <Col className="zindex-10 font-size-7 textcolor-79EF44">{it.startTime}-{it.endTime} ¥{formate.formateMoney(it.price)}</Col>
                  </Row>
                </Col>
                {statusDom}
              </Row>
            </Col>
            </Row>)
          }) : <div className="text-align-center font-size-small textclolor-white line-height-2r">暂无数据</div>;
          let doms = (<Row content="flex-start" className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D" key={`${idx}-s`}>
            <Col span={1}></Col>
            <Col span={11} className="font-size-default textclolor-white line-height-2r ">{itm.cityName}</Col>
            <Col span={10} className="font-size-small textclolor-white text-align-right line-height-2r " onClick={()=>{this.openMap()}}>查看地图</Col>
            <Col span={2} className="line-height-2r"><Icon iconName={'chevron-right '} size={'90%'} iconColor={'#333'} /></Col>
            <Col>{itmDom}</Col>
        </Row>)
          return  doms;
        }) : <Row className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D">
        <Col className="text-align-center font-size-small textclolor-white line-height-2r">{loadText}</Col>
        </Row>;

        const clenderDom = dateArr.length > 0 ? dateArr.map((itm, idx)=>{
          return (<Col key={`${idx}-date`} span={24/7} onClick={()=>{ self.setData(itm); console.log(itm);}}>
          <Row><Col className="font-size-small textclolor-black-low text-align-center">{itm.dateName}</Col>
          <Col className="font-size-small textclolor-black-low text-align-center">
          <div className={`${selectDay.dateName==itm.dateName ? 'bg-8EBF66 ' :'' } display-inline-block font-size-small textclolor-white small-round text-align-center border-radius-100`}>{itm.date}</div>
          </Col></Row>
          </Col>)
        }) : <Col className="text-align-center font-size-small textclolor-white line-height-2r">{loadText}</Col>;
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              {/* <Col>
                <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              </Col> */}
              <Col className="margin-top-2 border-radius-5f overflow-hide bg-101111">
                <Row className="bg-0D0D0D">
                <Col span={12} className="padding-all font-size-default textclolor-black-low text-align-center" onClick={()=>{this.doSheet()}}>地区 <Icon iconName={'chevron-down '} size={'90%'} iconColor={'#999'} /></Col>
                <Col span={12} className="padding-all font-size-default textclolor-black-low text-align-center" onClick={()=>{this.doSheet1()}}>课程类型 <Icon iconName={'chevron-up '} size={'90%'} iconColor={'#999'} /></Col>
                </Row>
                <Row className="margin-top-2 padding-all">{clenderDom}</Row>
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
