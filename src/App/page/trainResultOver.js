import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import moment from 'moment';
import BaseView from '../core/app';
import wx from 'weixin-js-sdk';
import { transOverUp } from '../api/classes';

const {
    Buttons,
    Toaster,
    Item,
    Row,
    Col,
    Icon,
    ProgressDrag,
    Loade,
    FileUp,
    Textarea,
    Modal
} = Components;
const { sessions, storage } = utils;

class TrainResultOver extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          feelCore: 50,
          query: UrlSearch()
      };
      moment.locale('en', {
        weekdays : [
            "周日", "周一", "周二", "周三", "周四", "周五", "周六"
          ]
      });
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
    choseImage(){
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        console.log(res);
        }
      });
    }


    render() {
        const { query } = this.state;
        const self = this;
        let keepTimeM = parseInt(query.keepTime/60);
        let keepTimeS = parseInt(query.keepTime%60);
        let time = new Date();
        let nowTime = moment(time).format('dddd') + ' ' + moment(time).format('MM.DD hh:mm:ss'); // 八月 19日 2018, 5:15:55 下午
         
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col className="margin-top-2 border-radius-5f overflow-hide relative minheight-30">
                <Row className="padding-all" justify="center" >
                  <Col span={8} className="zindex-10 text-align-center margin-top-2r">
                  <div className="icon middle icon-result" />
                  </Col>
                  <Col className="zindex-10 text-align-center textclolor-white margin-top-1r">恭喜你完成训练</Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-white">{nowTime}</Col>
                </Row>
                <div className="width-100 bg-000 opacity-1 heightp-100 absolute-left zindex-9"></div>
                <div className="width-100 absolute-left zindex-6 heightp-100 bg bg2"  />
              </Col>

              <Col className="margin-top-2 border-radius-5f overflow-hide bg-1B1B1B  padding-all-2r">
                <Row>
                  <Col span={8}>
                  <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r overflow-hide relative" >
                      <img src={''} className="width-100" />
                      <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                  </div>
                  </Col>
                  <Col span={12} className="textclolor-white ">
                    <Row>
                      <Col className="textclolor-white font-size-16 line-height-3r">你很棒哦！</Col>
                      <Col  className="textclolor-white font-size-8 textclolor-black-low">不断坚持，才能靠近梦想</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col className="margin-top-1r">
                <Buttons
                  text="返回"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#80EA46', color:'#333'}}
                  onClick={()=>{
                    self.goLink('/Tab', {tab: 3}); 
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default TrainResultOver;
