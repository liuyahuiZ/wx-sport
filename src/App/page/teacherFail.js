import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import config from '../config/config';
import { UrlSearch } from '../utils';
import wx from 'weixin-js-sdk';

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
class TeacherFail extends BaseView {
    constructor(props) {
      super(props);
      let obg = UrlSearch();
      
      this.state = {
          userInfo: storage.getStorage('userInfo') ||{},
          loadText: '加载中',
      };
    }

    _viewAppear(){

    }
           
    goLink(link, obg){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: obg
        });
      }
    }

    checkTeacher(){
        let userInfo =  storage.getStorage('userInfo')
        if (userInfo) {
          if(userInfo.userType==0){
            window.location.href='https://jinshuju.net/f/r15c2C'
          }
        }
    }

    render() {
        const { userInfo, loadText } = this.state;
        let obg = UrlSearch();
        const self = this;
        return(
          <section className="padding-all bg-000 minheight-100">
              <Row className="padding-all-1r bg-1B1B1B border-radius-5f overflow-hide relative">
              <Col span={24} className="margin-top-1r">
                <Row justify="center" align="center">
                  <Col className=" text-align-center zindex-10 " >
                      <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r overflow-hide relative" >
                        { userInfo&&userInfo.imgUrl ? <img src={userInfo.imgUrl} className="width-100" />  : <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />}
                      </div>
                  </Col>
                  <Col className="text-align-center textcolor-8EBF66">
                      <Icon iconName='checkmark-circled' className="nopadding" size={'150%'} iconColor={'#9eea6a'} style={{'top':'0.2rem', 'position':'relative','marginRight': '0.2rem'}} /> 登录失败
                  </Col>
                </Row>
              </Col>
              <Col className="textclolor-black-low margin-top-2r line-height-3r text-align-center font-size-small">
                想成为牛油果教练一员，请咨询我们的牛油果君
              </Col>
            </Row>
            <Row>
            <Col className="margin-top-5r">
                <Buttons
                  text={'教练申请表'}
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    self.checkTeacher()
                  }}
                />
              </Col>
              <Col className="margin-top-2">
                <Buttons
                  text={'关闭'}
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    wx.closeWindow()
                  }}
                />
              </Col>
            </Row>
          </section>
        );
    }
}
export default TeacherFail;
 