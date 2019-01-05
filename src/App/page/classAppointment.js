import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import { getToken } from '../api/index';
import { teacherSignInPage } from '../api/subject';
import { courseDetail } from '../api/classes';
import wx from 'weixin-js-sdk';
import QRCode from 'qrcode';

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
            peoples: [],
            qrCode: ''
          }
      };
    }

    _viewAppear(){
      this.checkRedct();
      this.getSignedList();
      this.getClassDetail();
      this.rendImg();
    }

    checkRedct(){
      let obg = UrlSearch();
      const reditUrl = "https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%23%2FClassAppointment%3FcourseId%3D" + obg.courseId + "%26coachId%3D" + obg.coachId;
      const appId = 'wx9a7768b6cd7f33d0';
      
      let userInfo = storage.getStorage('userInfo')
      let userId = storage.getStorage('userId');
      if(obg.code&&obg.code!==''){
        if(userInfo&&userInfo!==''&&obg.clean){
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

    getClassDetail(){
      let obg = UrlSearch();
      const self = this;
      Loade.show();
      courseDetail({id: obg.courseId}).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        self.setState({
          classData: res.result
        })
      }).catch((err)=>{
        Loade.hide();
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
        if(res.code>0&&res.result){
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

    rendImg(){
      let obg = UrlSearch();
      let userId = obg.coachId ? obg.coachId: storage.getStorage('userId');
      const self = this;
      let opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        margin: 1,
        rendererOpts: {
          quality: 1
        }
      }
      // let str = `https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%23%2FSuccess%3FcourseId%3D${obg.courseId}%26type%3Dregistor%26teacherId%3D${userId}`
      let str = `https://avocadomethod.cn/dist/index.html#/Success?courseId=${obg.courseId}&type=registor&teacherId=${userId}`
      console.log('str', str);
      QRCode.toDataURL(str, opts, function (err, url) {
        // console.log(url);
        self.setState({
          qrCode: url
        })
      })
    }

    render() {
        const {detailData, qrCode} = this.state;
        // console.log('detailData',detailData)
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
        }) : <Row><Col className="text-align-center font-size-small textclolor-white line-height-4r">暂无数据</Col></Row>
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col className="margin-top-2 border-radius-5f overflow-hide relative minheight-30 border-all border-color-000">
                <Row className="padding-all" justify="center" >
                  <Col className="zindex-10 text-align-center font-size-normal textclolor-white">{detailData&&detailData.course&&detailData.course.title||''}</Col>
                  <Col className="zindex-10 text-align-center font-size-small textclolor-black-low">{startDate} {detailData&&detailData.course&&detailData.course.startTime||''}-{detailData&&detailData.course&&detailData.course.endTime||''}</Col>
                  <Col span={8} className="zindex-10 margin-top-2">
                  {/* <img className="width-100" src={`http://avocadomethod.cn:2019/files?text=https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%23%2FSuccess%3FcourseId%3D${obg.courseId}%26type%3Dregistor%26teacherId%3D${userId}`} /> */}
                  <img className="width-100" src={qrCode} />
                  </Col>
                  <Col className="zindex-10 text-align-center font-size-small textclolor-black-low margin-top-2">扫码签到</Col>
                  <Col className="zindex-10 text-align-center font-size-small textclolor-black-low">请让学员拿出微信“扫一扫”</Col>
                </Row>
                <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                <div className="width-100 absolute-left heightp-100 zindex-6 bg bgy" />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col>
                    <Row content="flex-start padding-left-3">
                      <Col span={11} className="font-size-default textclolor-white line-height-2r font-weight-700">预约人数 ({detailData&&detailData.course? `${detailData.peoples.length||0}/${detailData.course.maxPeople||0}` : ''})</Col>
                    </Row>
                  </Col>
                  <Col className="bg-1B1B1B padding-all">
                    {personDom}
                  </Col>
                  <Col className="bg-1B1B1B">
                  <Row className="width-100">
                      <Col span={24} className="margin-top-2" >
                        <Row className="padding-left-3 bg-0D0D0D">
                          <Col span={24} className="font-size-default textclolor-white font-weight-700 bg-0D0D0D line-height-2r">门店地址</Col>
                        
                        </Row>
                        <Row>
                          <Col span={24} className="font-size-small textclolor-black-low padding-all">{detailData&&detailData.course&&detailData.course.address||''}</Col>
                          <Col span={24} className="font-size-small textclolor-white margin-top-2 padding-all" onClick={()=>{
                            this.openMap(detailData.course.latitude, detailData.course.longitude)
                          }}>点击查看地图</Col>
                        </Row>
                      </Col>
                      <Col span={24} className="margin-top-2" >
                        <Row className="padding-left-3 bg-0D0D0D">
                          <Col span={23} className="font-size-default textclolor-white font-weight-700 bg-0D0D0D line-height-2r">课程教案</Col>
                        </Row>
                        <Row>
                         <Col span={24} className="font-size-small textclolor-black-low padding-all">
                          <div>{detailData&&detailData.course&&detailData.course.teachingPlan&&detailData.course.teachingPlan.indexOf('</') > 0 ? <div dangerouslySetInnerHTML={{__html: `<p>${detailData.course.teachingPlan}</p>`}} /> : detailData.course.teachingPlan}</div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="返回"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
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
