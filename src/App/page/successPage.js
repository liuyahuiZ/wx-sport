import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import { userGatherInfo, courseDetail } from '../api/classes';
import { userSign } from '../api/subject';

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    Loade
  } = Components;
const { sessions, storage } = utils;
class Success extends BaseView {
    constructor(props) {
      super(props);
      let obg = UrlSearch();
      
      this.state = {
          userInfo: storage.getStorage('userInfo') ||{},
          loadText: '加载中',
          type: obg.type || 'appoint',  // appoint '预约成功' ,  registor '签到成功'
          detail: sessions.getStorage('nowCourse') ||{},
      };
    }

    _viewAppear(){
      let userId = storage.getStorage('userId');
      const self = this;
      self.getClassDetail();
    }
           
    goLink(link, obg){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: obg
        });
      }
    }

    getClassDetail(){
      let obg = UrlSearch();
      const self = this;
      Loade.show();
      courseDetail({id: obg.courseId}).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        if(res.code>0&&res.result){
          self.setState({
            detail: res.result
          })
        }
      }).catch((err)=>{
        Loade.hide();
      })
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

    render() {
        const { userInfo, loadText, type, detail } = this.state;
        let obg = UrlSearch();

        return(
          <section className="padding-all bg-000 minheight-100">
            <TransAnimal >
              <Row className="padding-all-1r bg-1B1B1B border-radius-5f overflow-hide relative">
              <Col span={24} className="margin-top-1r">
                <Row justify="center" align="center">
                  <Col className=" text-align-center zindex-10 " >
                      <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r overflow-hide relative" >
                          <img src={userInfo.imgUrl} className="width-100" />
                          <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                          {
                            type == 'registor' ? <Icon iconName='checkmark-circled' className="nopadding" size={'150%'} iconColor={'#9eea6a'} 
                            style={{'top':'0.2rem', 'position':'absolute','right': '1.4rem', 'zIndex': '10'}} /> 
                          : ''}
                          {
                            type == 'registor' ? <div className="middle-round bg-000 opacity-6 absolute-left zindex-9"></div>
                          : ''}
                      </div>
                  </Col>
                  <Col className="text-align-center textcolor-8EBF66">
                      { type == 'registor' ? '' :  <Icon iconName='checkmark-circled' className="nopadding" size={'150%'} iconColor={'#9eea6a'} style={{'top':'0.2rem', 'position':'relative','marginRight': '0.2rem'}} /> } 
                      { type == 'appoint' ? '购买' : '签到' }成功
                  </Col>
                </Row>
              </Col>
              <Col className="textclolor-black-low margin-top-1r line-height-3r">
                <Row className="border-bottom border-color-333">
                  <Col span={4}>课程：</Col>
                  <Col span={20} className="text-align-right">{detail.title}</Col>
                </Row>
                <Row className="border-bottom border-color-333">
                  <Col span={4}>门店：</Col>
                  <Col span={20} className="text-align-right">{detail.store}</Col>
                </Row>
                <Row className="border-bottom border-color-333">
                  <Col span={4}>时间：</Col>
                  <Col span={20} className="text-align-right">{detail.startTime}-{detail.endTime}</Col>
                </Row>
              </Col>
              <Col className="margin-top-5r">
                <Buttons
                  text={type=='registor' ? "返回" :'查看预约'}
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    if(type=='registor') {
                      hashHistory.goBack();
                    }else{
                      this.goLink('UserSign',{
                        courseId: obg.courseId
                      })
                    }
                  }}
                />
              </Col>
            </Row>
            </TransAnimal>
          </section>
        );
    }
}
export default Success;
