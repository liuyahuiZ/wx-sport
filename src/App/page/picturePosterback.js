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
import { ENGINE_METHOD_ALL } from 'constants';

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
      };
      moment.locale('en', {
        weekdays : [
            "周日", "周一", "周二", "周三", "周四", "周五", "周六"
          ]
      });
    }
    _viewAppear(){
      setTimeout(()=>{
        this.doCanvas()
      }, 200)
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
        outBox.innerHTML = '';
        let dataUrl = canvas.toDataURL('image/jpeg');
        let newImg = document.createElement('img');
        newImg.src = dataUrl;
        outBox.appendChild(newImg);
        outBox.children[0].style.width = '100%';
        if (window.screen.height == 812) {
          outBox.style.marginTop = '1rem';
        }
      });


      // html2canvas(this.$$screen, {
      //   allowTaint: true,
      //   taintTest: true,
      //   useCORS: true,
      //   width: self.$$screen.clientWidth + 'px',
      //   height: self.$$screen.clientHeight + 'px'
      // }).then(function(canvas) {
      //   console.log(canvas);
      //   // var dataUrl = canvas.toDataURL();
      //   self.$$showScreen.appendChild(canvas);
      // });
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
        const {article, feelCore, query, userInfo, imgBox} = this.state;
        const self = this;
        let keepTimeM = parseInt(query.keepTime/60);
        let keepTimeS = parseInt(query.keepTime%60);
        let time = new Date();
        let nowTime = moment(time).format('dddd') + ' ' + moment(time).format('MM.DD hh:mm:ss'); // 八月 19日 2018, 5:15:55 下午
         
        return(
          <section className="bg-000 relative" >
            <div className="bg-000 heighth-100 relative" ref={(r) => { self.$$screen = r; }}>
            <div className="zindex-10">
              <img src={'http://pdc6cusp9.bkt.clouddn.com/1534058028'} className="absolute width-100" />
            </div>
            <img src={'../css/images/logo.png'} className="absolute top-0 margin-left-5 margin-top-5 icon icon-logo" />

            <div className="absolute zindex-6 bottom-0 float-left padding-all ">
              <div className="float-left middle-round width-40 border-radius-round bg-gray display-inline-block line-height-4r overflow-hide" >
                <img src={userInfo.imgUrl} className="width-100" />
                <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
              </div>
              <div className="float-left textclolor-white">{nowTime}</div>
              <div className="float-left width-100 padding-all">
                  <div className="float-left width-30">
                    <div className="float-left width-100 text-align-left textclolor-black-low">时长</div>
                    <div className="float-left width-100 text-align-left textclolor-white font-size-small">{keepTimeM}分{keepTimeS}</div>
                  </div>
                  <div className="float-left width-30">
                    <div className="float-left width-100 text-align-center textclolor-black-low">动作</div>
                    <div className="float-left width-100 text-align-center textclolor-white font-size-small">{'1组'}</div>
                  </div>
                  <div className="float-left width-30">
                    <div className="float-left width-100 text-align-right textclolor-black-low">消耗</div>
                    <div className="float-left width-100 text-align-right textclolor-white font-size-small">{query.keepTime*10}卡</div>
                  </div>
              </div>
              
            </div>
            </div>
            <div className="absolute-left" ref={(r) => { self.$$outBox = r; }}>
            </div>
          </section>
        );
    }
}
export default ImgPoster;
