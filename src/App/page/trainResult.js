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
import { transOverUp, coursePlanFeedback } from '../api/classes';

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
          picture: '', //'https://static1.keepcdn.com/2017/03/09/11/1489030213487_375x375.jpg',
          theVieo: '',//'http://pdc6cusp9.bkt.clouddn.com/1534342816',
          query: UrlSearch(),
          feel: ''
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
      const { picture, theVieo, question, feelCore, feel } = this.state;
      const self = this;
      Loade.show();
      let obg = UrlSearch();
      console.log(picture);
      sessions.setStorage('picUrl', picture);
      coursePlanFeedback({
        userId: userId,
        courseId: obg.courseId,
        coursePlanId: obg.coursePlanId,
        intension: parseFloat(feelCore.toFixed(2)),
        feel: feel,
        doubtText: question,
        doubtImageUrl: picture,
        doubtMvUrl: theVieo,
        practiceTime: obg.keepTime
      }).then((res)=>{
        console.log(res);
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        self.goLink('/TrainResultOver', {keepTime: obg.keepTime}); 
        // Modal.alert({ title: '上传成功',
        //   content: '训练成功上传成功',
        //   btn: {
        //     text: '确定',
        //     type: 'link',
        //     style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
        //   }, 
        //   type: 'large'
        // },
        // () => { 
        //   // hashHistory.goBack(); 
        //   self.goLink('/PicturePoster', {keepTime: obg.keepTime}); 
        // });
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
    render() {
        const {article, feelCore, query, picture, theVieo} = this.state;
        const self = this;
        let keepTimeM = parseInt(query.keepTime/60);
        let keepTimeS = parseInt(query.keepTime%60);
        let time = new Date();
        let nowTime = moment(time).format('dddd') + ' ' + moment(time).format('MM.DD hh:mm:ss'); // 八月 19日 2018, 5:15:55 下午
         
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col span={24} className="padding-all margin-top-2 border-radius-5f overflow-hide bg-1B1B1B ">
                <Row>
                  <Col className="text-align-left textclolor-white font-weight-700">整体训练强度</Col>
                  <Col className="margin-bottom-1r">
                  <ProgressDrag percent={feelCore} barColor={'linear-gradient(90deg, #93C770 40%, #3FEFEC 60%)'}
                 bgColor={'#333'} style={{height: '7px'}} barRoundStyle={{ 'width': '1.3rem','height': '1.3rem','background': '#333','border': '3px solid #4CF6C7'}} radius={20}
                onChange={(v)=>{ console.log(v); self.setValue('feelCore', v)}} barWidthDisable />
                  </Col>
                  <Col span={4} className="textclolor-white font-size-small">轻松</Col>
                  <Col span={5} className="text-align-center textclolor-white font-size-small">有点吃力</Col>
                  <Col span={5} className="text-align-center textclolor-white font-size-small">吃力</Col>
                  <Col span={5} className="text-align-center textclolor-white font-size-small">非常吃力</Col>
                  <Col span={5} className="text-align-right font-size-small textclolor-white">无法完成</Col>
                </Row>
              </Col>
              <Col className="margin-top-2 padding-all relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white line-height-3r font-weight-700">训练感受:</Col>
                </Row>
                <Row>
                  <Col ><Textarea
                  placeholder="请输入"
                  style={{backgroundColor: '#111', border: '0', color:'#fff'}}
                  maxLength={100}
                  maxLengthShow={false}
                  onChange={(v)=>{
                    self.setValue('feel', v);
                  }}
                  /></Col>
                </Row>
              </Col>

              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-0D0D0D" >
                <Row className="flex-start zindex-10 heighr-12" align="center" justify="center">
                  <Col className="border-radius-6r font-size-small overflow-hide bg-8EBF66 zindex-10 heighr-2 text-align-center line-height-2r" span={7}>
                   <Row onClick={()=>{
                     this.$$img1.EditImg()
                   }}>
                     <Col span={10} className="margin-top-3"><i className="icon icon-video margin-top-3" /></Col>
                     <Col span={14} className="text-align-left">疑惑动作</Col>
                    </Row>
                  </Col>
                  <Col className={'zindex-6 absolute-left zindex-9'}>
                  {/* || 'https://static1.keepcdn.com/2017/03/09/11/1489030213487_375x375.jpg' */}
                  
                  <FileUp
                  description={''}
                  defaultSrc={ theVieo }
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
                {/* <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9"></div> */}
              </Col>
              
              <Col className="margin-top-2 padding-all relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white line-height-3r font-weight-700">疑问动作描述:</Col>
                </Row>
                <Row>
                <Col ><Textarea
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

              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-0D0D0D">
                <Row className="flex-start zindex-10 heighr-12" align="center" justify="center">
                  <Col className="border-radius-6r font-size-small overflow-hide bg-8EBF66 zindex-10 heighr-2 text-align-center line-height-2r" span={7}>
                   <Row onClick={()=>{
                     this.$$img2.EditImg()
                   }}>
                     <Col span={10} className="margin-top-3"><i className="icon  icon-camera margin-top-3" /></Col>
                     <Col span={14} className="text-align-left">照片上传</Col></Row>
                  </Col>
                  <Col className={'zindex-6 absolute-left zindex-9'}>
                  {/* || 'https://static1.keepcdn.com/2018/01/24/14/1516774341982_315x315.jpg' */}
                  <FileUp
                  description={''}
                  defaultSrc={ picture }
                  ref={(r) => {
                    this.$$img1 = r;
                  }}
                  fileReady={(v)=>{
                    this.fileUps(v, 'picture')
                  }}
                  fileType={'blob'}
                  callType={'H5'}
                  maxSize={10}
                  ></FileUp> 
                  </Col>
                </Row>
              </Col>
          
              <Col className="margin-top-3">
                <Buttons
                  text="打卡完成"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
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
