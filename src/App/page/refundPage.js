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
class RefundPage extends BaseView {
    constructor(props) {
      super(props);
      let obg = UrlSearch();
      
      this.state = {
          userInfo: storage.getStorage('userInfo') ||{},
          loadText: '加载中',
          info: sessions.getStorage('refundInfo') || {}
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

    render() {
        const { userInfo, loadText, info } = this.state;
        let obg = UrlSearch();
        const self = this;
        return(
          <section className="padding-all bg-000 minheight-100">
              <Row className="padding-all-1r bg-1B1B1B border-radius-5f overflow-hide relative">
              <Col span={24} className="margin-top-1r">
                <Row justify="center" align="center">
                  <Col className=" text-align-center zindex-10 " >
                      <div className="middle-round-5 border-radius-round bg-gray display-inline-block line-height-4r overflow-hide relative" >
                      { userInfo&&userInfo.imgUrl ? <img src={userInfo.imgUrl} className="width-100" />  : <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />}
                      </div>
                  </Col>
                  <Col className='text-align-center textclolor-white font-size-big'>{info.courseTitle||'xxx'}</Col>
                  <Col className='text-align-center textclolor-white font-size-small'>{info.timeStr || 'xxx'}</Col>
                  <Col className="text-align-center textcolor-8EBF66 margin-top-2r">
                      <Icon iconName='checkmark-circled' className="nopadding" size={'150%'} iconColor={'#9eea6a'} style={{'top':'0.2rem', 'position':'relative','marginRight': '0.2rem'}} /> 取消成功
                  </Col>
                </Row>
              </Col>
              <Col className="textclolor-black-low line-height-2r text-align-center font-size-small">
                款项已退回至账户中
              </Col>
              <Col className="textclolor-black-low margin-top-2r margin-bottom-2r line-height-3r">
                <Row className="border-bottom border-color-333">
                  <Col span={4}>人数：</Col>
                  <Col span={20} className="text-align-right">{info.prepos|| 0}人</Col>
                </Row>
                <Row className="">
                  <Col span={4}>实付：</Col>
                  <Col span={20} className="text-align-right">{info.payAmt||0}元</Col>
                </Row>
              </Col>
            </Row>
            <Row>
            <Col className="margin-top-5r">
                <Buttons
                  text={'返回主页'}
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    self.goLink('/Tab')
                  }}
                />
              </Col>
            </Row>
          </section>
        );
    }
}
export default RefundPage;
 