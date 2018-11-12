import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import moment from 'moment';
import BaseView from '../core/app';
import wx from 'weixin-js-sdk';
import html2canvas from "html2canvas";
import formate from '../utils/formate';


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

class ImgPoster extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          feelCore: 50,
          picture: 'http://pdc6cusp9.bkt.clouddn.com/1534342816',
          theVieo: 'http://pdc6cusp9.bkt.clouddn.com/1534342866',
          query: UrlSearch(),
          userInfo: storage.getStorage('userInfo') ||{},
          canvasDem: {},
          showCanvas: false,
      };
      moment.locale('en', {
        weekdays : [
            "周日", "周一", "周二", "周三", "周四", "周五", "周六"
          ]
      });
    }
    _viewAppear(){
      // Loade.show();
      // setTimeout(()=>{
      //   this.doCanvas()
      // }, 4000)
    }
    convertCanvasToImage(canvas) {
      console.log(canvas);
      let imgBox = canvas.toDataURL("image/png");
      this.setState({
        imgBox: imgBox
      })
    }
    parseValue(value) {
      return parseInt(value, 10);
    }
    doCanvas(){
      Loade.show();
      const self = this;

      let scaleBy = 1;   // 此处原为DPR()计算出的像素比，为了清晰改了3倍；
      // 创建自定义 canvas 元素
      let canvas = document.createElement('canvas');

      let box = this.$$screen;
      let outBox = this.$$outBox;
      let width = this.parseValue(box.width);
      let height = this.parseValue(box.height);
      // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
      canvas.width = width * scaleBy;
      canvas.height = height * scaleBy;

      // 获取画笔
      let context = canvas.getContext('2d');

      // 将所有绘制内容放大像素比倍
      context.scale(scaleBy, scaleBy);
      // 将自定义 canvas 作为配置项传入，开始绘制
      html2canvas(box, {
        useCORS: true
      }).then(canvas => {
        Loade.hide();
        outBox.innerHTML = '';
        let dataUrl = canvas.toDataURL('image/jpeg');
        let newImg = document.createElement('img');
        newImg.src = dataUrl;
        outBox.appendChild(newImg);
        outBox.children[0].style.width = '100%';
        if (window.screen.height == 812) {
          outBox.style.marginTop = '1rem';
        }
        self.setState({
          showCanvas: true
        })
      });
    }
    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }


    render() {
        const {article, feelCore, query, userInfo, imgBox, showCanvas} = this.state;
        const self = this;
        let picUrl = sessions.getStorage('picUrl') || 'http://pdc6cusp9.bkt.clouddn.com/1535618433';
        console.log(picUrl, query)
        let keepTimeM = parseInt(query.keepTime/60);
        let keepTimeS = parseInt(query.keepTime%60);
        let time = new Date();
        let nowTime = moment(time).format('dddd') + ' ' + moment(time).format('MM.DD hh:mm:ss'); // 八月 19日 2018, 5:15:55 下午
         
        return(
          <section className="bg-000 relative" >
            <div className={`bg-000 heighth-100 relative ${showCanvas ? 'display-none': ''}`} ref={(r) => { self.$$screen = r; }}>
              <div >
                <div className="zindex-10">
                  <img src={ picUrl } className="absolute top-0 width-100" />
                </div>
                <div className="zindex-10">
                  <img src="/dist/css/images/logo.png" className="absolute top-0 margin-left-5 margin-top-5 icon icon-logo" />
                </div>
              </div>
              <div className="zindex-6 width-100 absolute bottom-0 padding-all heighr-13">
                <Row className="relative text-align-center heighr-8">
                  <Col span={10} className="relative">
                    <img src="/dist/css/images/personRond.png" className="absolute-left icon icon-personRond zindex-6" />
                    <img src={userInfo.imgUrl} className="icon absolute-left icon-personRond-inner border-radius-round overflow-hide zindex-10" />
                  </Col>
                  <Col span={14} className="margin-top-2 textclolor-white text-align-left width-60 line-height-25">
                    <div className="width-100">{userInfo.nickName}</div>
                    <Row className="width-100">
                      <Col span={12}>{decodeURIComponent(query.courseName)}</Col>
                      <Col span={12}>{query.date}</Col>
                    </Row>
                  </Col>
                </Row>
                
                <Row className="width-100 padding-all ">
                    <Col span={12} className="line-height-25">
                      <Row>
                        <Col span={8} className="textcolor-8EBF66 text-align-right">天数</Col>
                        <Col span={16} className="textclolor-white font-size-normal padding-left-3">{query.days||0}</Col>
                      </Row>
                    </Col>
                    <Col span={12} className="line-height-25">
                      <Row>
                        <Col span={8} className="textcolor-8EBF66 text-align-right">时间</Col>
                        <Col span={16} className="textclolor-white font-size-normal padding-left-3">{query.date||''}</Col>
                      </Row>
                    </Col>
                </Row>
              </div>
            </div>
            <div className={`absolute-left ${showCanvas ? '': 'display-none'}`} ref={(r) => { self.$$outBox = r; }}>
            </div>
          </section>
        );
    }
}
export default ImgPoster;
