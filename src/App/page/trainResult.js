import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
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
    Loade
} = Components;
const { sessions, storage } = utils;

class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {}
      };
    }
    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link){
      if(link) {
        hashHistory.push(link);
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

    submitTrain(){
      let obg = storage.getStorage('userInfo');
      Loade.show();
      transOverUp({
        userId: obg.openid,
        markName: '',
        mark: '',
      }).then((data)=>{
        console.log(data);
        Loade.hide();
        this.goLink('/TeacherRate')
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
    render() {
        const {article} = this.state;

        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col className="margin-top-2 border-radius-5f overflow-hide relative minheight-30">
                <Row className="padding-all" justify="center" >
                  <Col span={8} className="zindex-10 text-align-center margin-top-2r">
                  <div className="icon middle icon-result" />
                  </Col>
                  <Col className="zindex-10 text-align-center textclolor-white margin-top-1r">恭喜你完成训练</Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-white">星期五 07月19日 19:40</Col>
                  <Col span={8} className="margin-top-3r">
                    <Row><Col className="zindex-10 text-align-left textclolor-black-low">时长</Col>
                    <Col className="zindex-10 text-align-left textclolor-white font-size-8">20分</Col></Row>
                  </Col>
                  <Col span={8} className="margin-top-3r">
                    <Row><Col className="zindex-10 text-align-center textclolor-black-low">动作</Col>
                    <Col className="zindex-10 text-align-center textclolor-white font-size-8">1组</Col></Row>
                  </Col>
                  <Col span={8} className="margin-top-3r">
                    <Row><Col className="zindex-10 text-align-right textclolor-black-low">消耗</Col>
                    <Col className="zindex-10 text-align-right textclolor-white font-size-8">3千卡</Col></Row>
                  </Col>
                </Row>
                <div className="width-100 bg-000 opacity-1 heightp-100 absolute-left zindex-9"></div>
                <img className="width-100 absolute-left zindex-6 heightp-100" alt="text" src={`${config.IMG_URL}getphotoPal/2018-7-29/15328581691046.png`} />
              </Col>
              <Col span={24} className="padding-all margin-top-2 border-radius-5f overflow-hide bg-1B1B1B ">
                <Row>
                  <Col className="text-align-center textclolor-white">今天训练强度</Col>
                  <Col>
                  <ProgressDrag percent={50} barColor={'linear-gradient(90deg, #93C770 40%, #3FEFEC 60%)'}
                 bgColor={'#333'} style={{height: '7px'}} barRoundStyle={{ 'width': '1.3rem','height': '1.3rem','background': '#333','border': '3px solid #4CF6C7'}} radius={20} onChange={(v)=>{ console.log(v)}} barWidthDisable />
                  </Col>
                  <Col span={12} className="textclolor-white font-size-8">吃力</Col>
                  <Col span={12} className="text-align-right font-size-8 textclolor-white">轻松</Col>
                </Row>
              </Col>

              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-0D0D0D" onClick={()=>{this.choseImage()}}>
                <Row className="flex-start zindex-10 heighr-12" align="center" justify="center">
                  <Col className="border-radius-6r font-size-8 overflow-hide bg-8EBF66 zindex-10 heighr-2 text-align-center line-height-2r" span={6}>
                   <Row>
                     <Col span={12} className="margin-top-3"><i className="icon icon-camera margin-top-3" /></Col>
                     <Col span={12} className="text-align-left">添加</Col></Row>
                  </Col>
                </Row>
                <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9"></div>
                <img className="width-100 absolute-left zindex-6 " alt="text" src={'https://static1.keepcdn.com/2017/03/09/11/1489030213487_375x375.jpg'} />
              </Col>

              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-0D0D0D">
                <Row className="flex-start zindex-10 heighr-12" align="center" justify="center">
                  <Col className="border-radius-6r font-size-8 overflow-hide bg-8EBF66 zindex-10 heighr-2 text-align-center line-height-2r" span={6}>
                   <Row>
                     <Col span={12} className="margin-top-3"><i className="icon icon-video margin-top-3" /></Col>
                     <Col span={12} className="text-align-left">添加</Col></Row>
                  </Col>
                </Row>
                <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9"></div>
                <img className="width-100 absolute-left zindex-6 " alt="text" src={'https://static1.keepcdn.com/2018/01/24/14/1516774341982_315x315.jpg'} />
              </Col>

              <Col className="margin-top-3">
                <Buttons
                  text="确认提交"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    this.submitTrain()
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
