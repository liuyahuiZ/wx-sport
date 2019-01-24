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

class AllImgPoster extends BaseView {
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
      // }, 2000)
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
        let time = new Date();
        let nowTime = moment(time).format('dddd') + ' ' + moment(time).format('MM.DD hh:mm:ss'); // 八月 19日 2018, 5:15:55 下午
         
        return(
          <section className="bg-000 relative" >
            <div className={`bg-000 heighth-100 relative`} ref={(r) => { self.$$screen = r; }}>
              <Row className="padding-all-1r bg-1B1B1B border-radius-5f relative heighr-12">
                <Col className="margin-top-3r text-align-center zindex-10 font-size-normal textcolor-8EBF66">您共完成 {formate.minutes(query.practiceTime)} 训练</Col>
                <Col className="text-align-center zindex-10 textclolor-white">训练天数{query.practiceDays}天</Col>
                <Col className="margin-top-3r text-align-center zindex-10" >
                  <div className="middle-round-5 border-radius-round bg-gray display-inline-block line-height-4r overflow-hide" >
                      { userInfo&&userInfo.imgUrl ? <img src={userInfo.imgUrl} className="width-100" />  : <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />}
                  </div>
                </Col>
                <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                <div className="width-100 absolute-left zindex-6 heightp-100 bg bg4" />
              </Row>
              <Row className="bg-000 margin-top-3r">
                <Col span={9} className="padding-all">
                  <Row>
                    <Col className="margin-top-1r">
                      <Row>
                        <Col className="heighr-5 overflow-hide border-radius-5f bg post-bg1">
                          {/* <img className="width-100" src="https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg" /> */}
                        </Col>
                        <Col className="text-align-right textclolor-white font-weight-700">{query.startDate}</Col>
                        <Col className="text-align-right textclolor-white font-size-small">开启了你的养身之旅</Col>
                      </Row>
                    </Col>
                    <Col className="margin-top-5r">
                      <Row>
                        <Col className="heighr-5 overflow-hide border-radius-5f bg post-bg2">
                          {/* <img className="width-100" src="https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg" /> */}
                        </Col>
                        <Col className="text-align-right textclolor-white font-weight-700">{query.practiceDays||0}天总共消耗</Col>
                        <Col className="text-align-right textclolor-white font-size-small"><span className="textcolor-9eea6a">{query.calorieCount||0}</span>大卡热量</Col>
                      </Row>
                    </Col>
                    <Col className="margin-top-5r">
                      <Row>
                        <Col className="heighr-5 overflow-hide border-radius-5f bg post-bg3">
                          {/* <img className="width-100" src="https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg" /> */}
                        </Col>
                        <Col className="text-align-right textclolor-white font-weight-700">{query.practiceDays||0}天共完成了</Col>
                        <Col className="text-align-right textclolor-white font-size-small"><span className="textcolor-9eea6a">{query.practiceTime||0}</span>分钟的训练</Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col span={5.5}>
                 <img  className="width-100" src="/dist/css/images/allbg.png"  />
                </Col>
                <Col span={9} className="padding-all">
                  <Row>
                    <Col className="margin-top-7r">
                      <Row>
                        <Col className="heighr-5 overflow-hide border-radius-5f bg post-bg4">
                          {/* <img className="width-100" src="https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg" /> */}
                        </Col>
                        <Col className="text-align-right textclolor-white font-weight-700">完成了</Col>
                        <Col className="text-align-right textclolor-white font-size-small"><span className="textcolor-9eea6a">{query.actionCount||0}</span>个训练动作</Col>
                      </Row>
                    </Col>
                    <Col className="margin-top-5r">
                      <Row>
                        <Col className="heighr-5 overflow-hide border-radius-5f bg post-bg5">
                          {/* <img className="width-100" src="https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg" /> */}
                        </Col>
                        <Col className="text-align-right textclolor-white font-weight-700">一共举起</Col>
                        <Col className="text-align-right textclolor-white font-size-small"><span className="textcolor-9eea6a">{query.weightCount||0}</span>公斤(磅)的重量</Col>
                      </Row>
                    </Col>
                    <Col className="margin-top-5r">
                      <Row>
                        <Col className="heighr-5 overflow-hide border-radius-5f bg post-bg6">
                          {/* <img className="width-100" src="https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg" /> */}
                        </Col>
                        <Col className="text-align-right textclolor-white font-weight-700">{query.endDate}</Col>
                        <Col className="text-align-right textclolor-white font-size-small">完成训练计划</Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="zindex-6 width-100 padding-all heighr-13 bg bg5"></div>
            </div>
            <div className={`absolute-left ${showCanvas ? '': 'display-none'}`} ref={(r) => { self.$$outBox = r; }}>
            </div>
          </section>
        );
    }
}
export default AllImgPoster;
