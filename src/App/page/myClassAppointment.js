import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import { getToken } from '../api/index';
import { courseDetail, courseMoves } from '../api/classes';
import wx from 'weixin-js-sdk';

const {
    Buttons,
    Toaster,
    Header,
    Item,
    Row,
    Col,
    Icon,
    Carousel,
    Loade,
    Collapse,
    Panel
} = Components;  
const { sessions, storage } = utils;

class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          detailData: {},
          courseMovesArr: {}
      };
    }

    _viewAppear(){
      this.checkRedct();
      this.getClassDetail();
      this.getCourseMoves();
    }

    checkRedct(){
      let obg = UrlSearch();
      const reditUrl = "https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%23%2FClassAppointment%3FcourseId%3D" + obg.courseId + "%26coachId%3D" + obg.coachId;
      const appId = 'wx9a7768b6cd7f33d0';
      
      let userInfo = storage.getStorage('userInfo')
      let userId = storage.getStorage('userId');
      if(obg.code&&obg.code!==''){
        if(userInfo&&userInfo!==''){
          storage.removeStorage('userInfo');
          storage.removeStorage('userId');
        }
        storage.setStorage('authCode', obg.code);
        if(!(userInfo&&userInfo.nickName&&userInfo.nickName!=='')){
          this.getUserinfo(obg.code);
        }
      }else{
        if(!(userInfo&&userInfo.nickName&&userInfo.nickName!=='')){
          window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${reditUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
        }
      }
    }
    getUserinfo(code){
      const self = this;
      getToken({code: code}).then((data)=>{
        console.log(data);
      //   Toaster.toaster({ type: 'success', position: 'top', content: JSON.stringify(data), time: 5000 });
        if(JSON.stringify(data)!=='{}'){
          storage.setStorage('userInfo', data);
          storage.setStorage('userId', data.id);
          self.setState({
            userInfo: data
          })
        }
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: err, time: 3000 });
      })
    }

    getClassDetail(){
      let obg = UrlSearch();
      const self = this;
      Loade.show();
      courseDetail({id: obg.id}).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        self.setState({
          detailData: res.result
        })
      }).catch((err)=>{
        Loade.hide();
      })
    }

    getCourseMoves(){
      let obg = UrlSearch();
      const self = this;
      Loade.show();
      courseMoves({courseId: obg.id}).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let arrs = []
        let keys= Object.keys(res.result);
        let values = Object.values(res.result);
        for(let i=0;i<keys.length;i++){
          arrs.push({
            text: keys[i],
            value: values[i]
          })
        }
        self.setState({
          courseMovesArr: res.result
        })
      }).catch((err)=>{
        Loade.hide();
      })
    }

    setValue(key,val){
        this.setState({[key]: val});
    }
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }

    openMap(latitude, longitude){
      console.log(latitude, longitude);
      wx.openLocation({
        latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
        name: 'test', // 位置名
        address: 'test', // 地址详情说明
        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: 'test' // 在查看位置界面底部显示的超链接,可点击跳转
      });
    }

    render() {
        const {detailData, courseMovesArr} = this.state;
        let obg = UrlSearch();
        let userId = obg.coachId ? obg.coachId: storage.getStorage('userId');
        let startDate = detailData.startDate ? detailData.startDate.split(' ')[0] : ''
        const movesDom = courseMovesArr && courseMovesArr.length > 0 ? courseMovesArr.map((itm,idx)=>{
          return (<div className="images-33 float-left" key={`${idx}-ke`}>
            <Row><Col>{JSON.stringify(itm)}</Col><Col></Col></Row>
          </div>)
        }) : ''
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col className="margin-top-2 border-radius-5f overflow-hide relative minheight-30 border-all border-color-000">
                <Row className="padding-all" justify="center" >
                  <Col className="zindex-10 text-align-center font-size-12 textclolor-white">{detailData.title}</Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-black-low">{startDate} {detailData.startTime}-{detailData.endTime}</Col>
                  <Col span={8} className="zindex-10 margin-top-2"><img className="width-100" src={`http://47.88.2.72:2019/files?text=https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%23%2FSuccess%3FcourseId%3D${obg.courseId}%26type%3Dregistor%26teacherId%3D${userId}`} /></Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-black-low margin-top-2">该二维码用于开门</Col>
                  <Col className="zindex-10 text-align-center font-size-8 textclolor-black-low"></Col>
                </Row>
                <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                <div className="width-100 absolute-left heightp-100 zindex-6 bg bg3" />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col>
                    <Collapse >
                      <Panel title={'计划要点'}>
                        <div>{detailData.kernel}</div>
                      </Panel>
                    </Collapse>
                  </Col>
                  <Col>
                    <Collapse >
                      <Panel title={'训练计划入门课注意事项'}>
                        <div>{detailData.careful}</div>
                      </Panel>
                    </Collapse>
                  </Col>
                  <Col>
                    <Collapse >
                      <Panel title={'训练动作'}>
                        <div>{movesDom}</div>
                      </Panel>
                    </Collapse>
                    <Row justify="center">
                      <Col span={14}>
                        <Buttons 
                          text="提交/更新"
                          type={'primary'}
                          size={'small'}
                          style={{backgroundColor: '#80EA46', color:'#333'}}
                          onClick={()=>{
                            console.log('123');
                          }}/>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="bg-1B1B1B padding-all">
                    <Row className="width-100">
                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-10 textclolor-white">门店地址</Col>
                          <Col span={24} className="font-size-8 textclolor-black-low ">{detailData.address}</Col>
                          <Col span={24} className="font-size-10 textclolor-white margin-top-2" onClick={()=>{
                            this.openMap(detailData.latitude, detailData.longitude)
                          }}>点击查看地图</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-3">
                <Buttons
                  text="返回"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#80EA46', color:'#333'}}
                  onClick={()=>{
                    
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
