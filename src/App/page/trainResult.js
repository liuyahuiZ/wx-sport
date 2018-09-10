import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import {fileUp} from '../servise/qiniuUp';
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

class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          feelCore: 50,
          picture: 'http://pdc6cusp9.bkt.clouddn.com/1534342816',
          theVieo: 'http://pdc6cusp9.bkt.clouddn.com/1534342866',
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

    fileUps(v, name){
      const self = this;
      console.log(v);
      fileUp(v).then((res)=>{
        console.log(res);
        self.setValue(name, res);
      }).catch((e)=>{
        console.log(e);
      })
    }

    submitTrain(){
      let userId = storage.getStorage('userId');
      const { picture, theVieo, question, feelCore } = this.state;
      const self = this;
      Loade.show();
      let obg = UrlSearch();
      sessions.setStorage('picUrl', picture);
      transOverUp({
        userId: userId,
        keepTime: obg.keepTime,
        sectionNames: '3',
        feel: feelCore,
        imgUrl: picture,
        mvUrl: theVieo,
        question: question,
      }).then((data)=>{
        console.log(data);
        Loade.hide();
        Modal.alert({ title: '上传成功',
          content: '训练成功上传成功',
          btn: {
            text: '确定',
            type: 'link',
            style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
          }, 
          type: 'large'
        },
        () => { 
          // hashHistory.goBack(); 
          self.goLink('/PicturePoster', {keepTime: obg.keepTime}); 
        });
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
    render() {
        const {article, feelCore, query} = this.state;
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
                  <Col span={8} className="margin-top-3r">
                    <Row><Col className="zindex-10 text-align-left textclolor-black-low">时长</Col>
                    <Col className="zindex-10 text-align-left textclolor-white font-size-8">{keepTimeM}分{keepTimeS}</Col></Row>
                  </Col>
                  <Col span={8} className="margin-top-3r">
                    <Row><Col className="zindex-10 text-align-center textclolor-black-low">动作</Col>
                    <Col className="zindex-10 text-align-center textclolor-white font-size-8">1组</Col></Row>
                  </Col>
                  <Col span={8} className="margin-top-3r">
                    <Row><Col className="zindex-10 text-align-right textclolor-black-low">消耗</Col>
                    <Col className="zindex-10 text-align-right textclolor-white font-size-8">{query.keepTime*10}卡</Col></Row>
                  </Col>
                </Row>
                <div className="width-100 bg-000 opacity-1 heightp-100 absolute-left zindex-9"></div>
                <div className="width-100 absolute-left zindex-6 heightp-100 bg bg2"  />
              </Col>
              <Col span={24} className="padding-all margin-top-2 border-radius-5f overflow-hide bg-1B1B1B ">
                <Row>
                  <Col className="text-align-center textclolor-white">今天训练强度</Col>
                  <Col>
                  <ProgressDrag percent={feelCore} barColor={'linear-gradient(90deg, #93C770 40%, #3FEFEC 60%)'}
                 bgColor={'#333'} style={{height: '7px'}} barRoundStyle={{ 'width': '1.3rem','height': '1.3rem','background': '#333','border': '3px solid #4CF6C7'}} radius={20}
                onChange={(v)=>{ console.log(v); self.setValue('feelCore', v)}} barWidthDisable />
                  </Col>
                  <Col span={12} className="textclolor-white font-size-8">吃力</Col>
                  <Col span={12} className="text-align-right font-size-8 textclolor-white">轻松</Col>
                </Row>
              </Col>

              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-0D0D0D" >
                <Row className="flex-start zindex-10 heighr-12" align="center" justify="center">
                  <Col className="border-radius-6r font-size-8 overflow-hide bg-8EBF66 zindex-10 heighr-2 text-align-center line-height-2r" span={6}>
                   <Row onClick={()=>{
                     this.$$img1.EditImg()
                   }}>
                     <Col span={12} className="margin-top-3"><i className="icon icon-camera margin-top-3" /></Col>
                     <Col span={12} className="text-align-left">添加</Col>
                    </Row>
                  </Col>
                  <Col className={'zindex-6 absolute-left zindex-9'}>
                  <FileUp
                  description={''}
                  defaultSrc={'https://static1.keepcdn.com/2017/03/09/11/1489030213487_375x375.jpg'}
                  ref={(r) => {
                    this.$$img1 = r;
                  }}
                  fileReady={(v)=>{
                    this.fileUps(v, 'picture')
                  }}
                  fileType={'blob'}
                  callType={'H5'}
                  maxSize={10}
                  ></FileUp> </Col>
                </Row>
                {/* <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9"></div> */}
              </Col>

              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-0D0D0D">
                <Row className="flex-start zindex-10 heighr-12" align="center" justify="center">
                  <Col className="border-radius-6r font-size-8 overflow-hide bg-8EBF66 zindex-10 heighr-2 text-align-center line-height-2r" span={6}>
                   <Row onClick={()=>{
                     this.$$img2.EditImg()
                   }}>
                     <Col span={12} className="margin-top-3"><i className="icon icon-video margin-top-3" /></Col>
                     <Col span={12} className="text-align-left">添加</Col></Row>
                  </Col>
                  <Col className={'zindex-6 absolute-left zindex-9'}>
                  <FileUp
                  description={''}
                  defaultSrc={'https://static1.keepcdn.com/2018/01/24/14/1516774341982_315x315.jpg'}
                  ref={(r) => {
                    this.$$img2 = r;
                  }}
                  fileReady={(v)=>{
                    this.fileUps(v, 'theVieo')
                  }}
                  fileType={'blob'}
                  callType={'H5'}
                  maxSize={10}
                  accept="video/*"
                  ></FileUp> </Col>
                </Row>
              </Col>
              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white line-height-3r">训练中的疑问:</Col>
                </Row>
                <Row>
                <Col className="padding-all"><Textarea
                placeholder="请输入"
                style={{backgroundColor: '#111', border: '0', color:'#fff'}}
                maxLength={100}
                maxLengthShow={false}
                onChange={(v)=>{
                  self.setValue('question', v);
                }}
                /></Col>
                </Row>
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
