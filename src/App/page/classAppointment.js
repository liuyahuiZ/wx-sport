import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import { getToken } from '../api/index';
import { teacherSignInPage } from '../api/subject';
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

class OcrDoc extends BaseView {
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

    checkRedct(){
      let obg = UrlSearch();
      const reditUrl = "https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%23%2FClassAppointment%3FcourseId%3D" + obg.courseId + "%26coachId%3D" + obg.coachId;
      const appId = 'wx9a7768b6cd7f33d0';
      
      let userInfo = storage.getStorage('userInfo')
      let userId = storage.getStorage('userId');
      if(obg.code&&obg.code!==''){
        if(userInfo&&userInfo!==''){
          storage.removeStorage('userInfo');
          storage.removeStorage('userId');
        }
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
    getUserinfo(code){
      const self = this;
      getToken({code: code}).then((data)=>{
        console.log(data);
      //   Toaster.toaster({ type: 'success', position: 'top', content: JSON.stringify(data), time: 5000 });
        if(JSON.stringify(data)!=='{}'){
          storage.setStorage('userInfo', data);
          storage.setStorage('userId', data.id);
          self.setState({
            userInfo: data
          })
        }
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: err, time: 3000 });
      })
    }
    
    getSignedList(){
      const self = this;
      let obg = UrlSearch();
      if(!obg.courseId) return;
      Loade.show();
      teacherSignInPage({courseId: obg.courseId}).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        if(res.code>0){
          let data = res.result;
          self.setState({
            detailData: data
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
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
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
        console.log('detailData',detailData)
        let obg = UrlSearch();
        let userId = obg.coachId ? obg.coachId: storage.getStorage('userId');
        let startDate = detailData&&detailData.course&&detailData.course.startDate ? detailData.course.startDate.split(' ')[0] : ''
        let personDom = detailData&&detailData.peoples&&detailData.peoples.length > 0 ?
        detailData.peoples.map((itm, idx)=>{
          return (<Row className="middle-round float-left " key={`${idx}-lab`}>
            <Col className="padding-all-3">
              <img className='width-100 middle-round-3 overflow-hide border-radius-6r' src={itm} />
            </Col>
          </Row>)
        }) : <Row><Col className="text-align-center font-size-8 textclolor-white line-height-4r">暂无数据</Col></Row>
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col className="margin-top-2 border-radius-5f overflow-hide relative minheight-30 border-all border-color-000">
                <Row className="padding-all" justify="center" >
                  <Col className="zindex-10 text-align-center font-size-12 textclolor-white">{detailData.course.title||''}</Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-black-low">{startDate} {detailData.course.startTime||''}-{detailData.course.endTime||''}</Col>
                  <Col span={8} className="zindex-10 margin-top-2"><img className="width-100" src={`http://47.88.2.72:2019/files?text=https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%23%2FSuccess%3FcourseId%3D${obg.courseId}%26type%3Dregistor%26teacherId%3D${userId}`} /></Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-black-low margin-top-2">扫码签到</Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-black-low">请让学员拿出微信“扫一扫”</Col>
                </Row>
                <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                <div className="width-100 absolute-left heightp-100 zindex-6 bg bg3" />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col>
                    <Row content="flex-start">
                      <Col span={1}></Col>
                      <Col span={11} className="font-size-10 textclolor-white line-height-2r ">预约人数</Col>
                      <Col span={10} className="font-size-8 textclolor-white text-align-right line-height-2r ">查看更多</Col>
                      <Col span={2} className="line-height-2r"><Icon iconName={'chevron-right '} size={'90%'} iconColor={'#333'} /></Col>
                    </Row>
                  </Col>
                  <Col className="bg-1B1B1B padding-all">
                    {personDom}
                    <Row className="width-100">
                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">课程</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">{detailData.course.title||''}</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">课程详情再“我的”页面中查看</Col>
                        </Row>
                      </Col>

                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">地址</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">{detailData.course.address||''}</Col>
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
                  text="确认提交"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#80EA46', color:'#333'}}
                  onClick={()=>{
                    
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
