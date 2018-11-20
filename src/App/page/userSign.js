import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import { signedList, getToken } from '../api/index';
import { courseDetail } from '../api/classes';
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

class UserSignd extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: storage.getStorage('userInfo') ||{},
          detailData: {
            course:{},
            peoples: [],
          },
          courseDetial: {
            coach: ''
          }
      };
    }

    _viewAppear(){
      this.getCourseDetail();
    }

    getCourseDetail(){
      let obg = UrlSearch();
      const self = this;
      Loade.show();
      courseDetail({id: obg.courseId}).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        if(res.code>0&&res.result){
          let data = res.result;
          self.setValue('courseDetial', data)
        }
      }).catch((err)=>{
        Loade.hide();
        console.log(err)
      })
    }

    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link, itm){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: itm || ''
        });
      }
    }

    doSign(){
        let obg = UrlSearch();
        let userId = storage.getStorage('userId');
        const self = this;
        if(!obg.courseId) return;
        Loade.show();
        userSign({courseId: obg.courseId, userId: userId}).then((res)=>{
            Loade.hide();
            if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
            Toaster.toaster({ type: 'error', content: '签到成功!', time: 3000 });
            self.goLink('/TeacherRate', { teacherId: obg.teacherId, courseId: obg.courseId}); 
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
        const {detailData, userInfo, courseDetial} = this.state;
        let obg = UrlSearch();
        const self = this;
        let startDate = detailData.course.startDate ? detailData.course.startDate.split(' ')[0] : ''
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" align="center" content="flex-start">
              <Col className="border-radius-5f overflow-hide relative minheight-20 border-all border-color-000">
                <Row className="padding-all margin-top-5r" justify="center" >
                  <Col className="zindex-10 text-align-left font-size-normal textclolor-white font-weight-700">{courseDetial.title || '塑形训练课'}</Col>
                </Row>
                <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                <div className="width-100 absolute-left zindex-6 heightp-100 bg post-bg2"></div>
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col className="bg-1B1B1B padding-all">
                    <Row className="width-100">
                      <Col className="border-bottom border-color-333">
                        <Row>
                          <Col span={6}>
                          <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r overflow-hide relative" >
                              <img src={courseDetial.coach.imgUrl} className="width-100" />
                              <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                          </div>
                          </Col>
                          <Col span={12} className="textclolor-white line-height-3r">{courseDetial.coach.nickName}</Col>
                        </Row>
                      </Col>
                      <Col span={24} className="margin-top-2 border-bottom border-color-333" >
                        <Row className="line-height-2r">
                          <Col span={3} className="font-size-default textclolor-white"><Icon iconName={'android-time '} size={'140%'} iconColor={'#fff'} /></Col>
                          <Col span={20} className="font-size-small textclolor-white ">时间：{courseDetial.startDate}</Col>
                        </Row>
                      </Col>
                      <Col span={24} className="margin-top-2" >
                        <Row className="line-height-2r">
                          <Col span={3} className="font-size-default textclolor-white"><Icon iconName={'ios-location '} size={'140%'} iconColor={'#fff'} /></Col>
                          <Col span={20} className="font-size-small textclolor-white ">门店地址：{courseDetial.address}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="margin-top-2 bg-000" >
                    <Row className="line-height-3r">
                      <Col span={3} className="font-size-default textclolor-white"><Icon iconName={'briefcase '} size={'140%'} iconColor={'#fff'} /></Col>
                      <Col span={20} className="font-size-small textclolor-white font-size-normal font-weight-700">课程准备</Col>
                    </Row>
                  </Col>
                  <Col className="bg-0D0D0D padding-all">
                      <div className="font-size-small textclolor-black-low">
                      {/* {courseDetial.careful} */}
                      {/* {courseDetial&&courseDetial.prepare&&courseDetial.prepare.indexOf('</') > 0 ? <div dangerouslySetInnerHTML={{__html: courseDetial.prepare}} /> : courseDetial.prepare} */}
                      {courseDetial&&courseDetial.careful&&courseDetial.careful.indexOf('</') > 0 ? <div dangerouslySetInnerHTML={{__html: courseDetial.careful}} /> : courseDetial.careful}
                      </div>
                  </Col>
                </Row>
              </Col>
              

              <Col className="margin-top-3">
                <Buttons
                  text="取消课程"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    
                  }}
                />
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="课程改期"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    
                  }}
                />
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="返回"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    // hashHistory.goBack();
                    self.goLink('/Tab',{tab: 3})
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default UserSignd;
