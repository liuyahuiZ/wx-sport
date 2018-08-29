import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import { signedList } from '../api/index';
import { userSign } from '../api/subject';
import wx from 'weixin-js-sdk';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Carousel,
    Loade
} = Components;  
const { sessions, storage } = utils;

class UserSign extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          detailData: {
            course:{},
            peoples: []
          }
      };
    }

    _viewAppear(){
      this.checkRedct();
      this.getSignedList();
    }

    getSignedList(){
        const self = this;
        let obg = UrlSearch();
        if(!obg.courseId) return;
        Loade.show();
        signedList({courseId: obg.courseId}).then((res)=>{
          Loade.hide();
          if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
          let data = res.result;
          self.setState({
            detailData: data
          })
        }).catch((e)=>{
          Loade.hide();
          console.log(e)
        })
      }

    checkRedct(){
      let obg = UrlSearch();
      const reditUrl = "https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%2F%23%2FClassAppointment%3FcourseId%3D" + obg.courseId;
      const appId = 'wx9a7768b6cd7f33d0';
      
      let userInfo = storage.getStorage('userInfo')
      let userId = storage.getStorage('userId');
      if(obg.code&&obg.code!==''){
        storage.setStorage('authCode', obg.code);
        if(!(userInfo&&userInfo.nickName&&userInfo.nickName!=='')){
          this.getUserinfo(obg.code);
        }
      }else{
        if(!(userInfo&&userInfo.nickName&&userInfo.nickName!=='')){
          window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${reditUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
        }
      }
    }

    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }

    doSign(){
        let obg = UrlSearch();
        let userId = storage.getStorage('userId');
        if(!obg.courseId) return;
        Loade.show();
        userSign({courseId: obg.courseId, userId: userId}).then(()=>{
            Loade.hide();
            if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
            Toaster.toaster({ type: 'error', content: '签到成功', time: 3000 });
        }).catch((e)=>{
            Loade.hide();
            Toaster.toaster({ type: 'error', content: e, time: 3000 });
            console.log(e)
        })
    }
    openMap(latitude, longitude){
      console.log(latitude, longitude);
      wx.openLocation({
        latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
        name: 'test', // 位置名
        address: 'test', // 地址详情说明
        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: 'test' // 在查看位置界面底部显示的超链接,可点击跳转
      });
    }

    render() {
        const {detailData} = this.state;
        let obg = UrlSearch();
        let startDate = detailData.course.startDate ? detailData.course.startDate.split(' ')[0] : ''
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" align="center" content="flex-start">
              <Col className="margin-top-2 border-radius-5f overflow-hide relative minheight-30 border-all border-color-000">
                <Row className="padding-all" justify="center" >
                  <Col className="zindex-10 text-align-center font-size-12 textclolor-white">{detailData.course.title}</Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-black-low">{startDate} {detailData.course.startTime}-{detailData.course.endTime}</Col>
                </Row>
                <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                <img className="width-100 absolute-left zindex-6" alt="text" src={`${config.IMG_URL}getphotoPal/2018-7-29/15328581446009.png`} />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col className="bg-1B1B1B padding-all">
                    <Row className="width-100">
                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">课程</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">{detailData.course.title}</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">课程详情再“我的”页面中查看</Col>
                        </Row>
                      </Col>

                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">地址</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">{detailData.course.address}</Col>
                          <Col span={24} className="font-size-10 textclolor-white margin-top-2" onClick={()=>{
                            this.openMap(detailData.course.latitude, detailData.course.longitude)
                          }}>点击查看地图</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="点击签到"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    this.doSign()
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default UserSign;