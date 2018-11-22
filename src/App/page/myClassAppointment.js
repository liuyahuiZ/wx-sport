import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import { getToken } from '../api/index';
import { courseDetail, courseMoves, courseMovesUpdate } from '../api/classes';
import wx from 'weixin-js-sdk';
import selectStyle from '../../neo/Components/Select/selectStyle';

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
    Panel,
    Input
} = Components;  
const { sessions, storage } = utils;

class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          detailData: {},
          courseMovesArr: {},
          upMoves:[]

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
        if(userInfo&&userInfo!==''&&obg.clean){
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
    submitMove(){
      const { courseMovesArr } = this.state;
      let obg = UrlSearch();
      let userId = storage.getStorage('userId')
      console.log(courseMovesArr);
      if(courseMovesArr.length>0){
        let newArr = []
        for(let i=0;i<courseMovesArr.length;i++){
          newArr[i] = {
            "courseId": obg.id,
            "name": courseMovesArr[i].text,
            "userId": userId,
            "weight": courseMovesArr[i].value
          }
        }
        courseMovesUpdate(newArr).then((res)=>{
          Loade.hide();
          if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
          if(res.code>0){
            Modal.alert({ title: '',
            content: "提交成功!",
            btn: {
              text: '确定',
              type: 'link',
              style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
            }, 
            type: 'large'
            },
            () => {});
          }
        }).catch((err)=>{
          Loade.hide();
        })
      }
    }
    render() {
        const {detailData, courseMovesArr, upMoves} = this.state;
        const self = this;
        let obg = UrlSearch();
        let userId = obg.coachId ? obg.coachId: storage.getStorage('userId');
        let startDate = detailData.startDate ? detailData.startDate.split(' ')[0] : ''
        const movesDom = courseMovesArr && courseMovesArr.length > 0 ? courseMovesArr.map((itm,idx)=>{
          return (<div className="images-33 float-left bg-1B1B1B " key={`${idx}-ke`}>
            <Row className="text-align-center">
            <Col className="textclolor-white">{itm.text}</Col>
            <Col className="border-radius-5f padding-all overflow-hide bg-262626 textcolor-9eea6a">
              <Input
                placeholder="请输入"
                value={itm.value}
                innerStyle={{"backgroundColor":"#262626","border":"none","color":"#9eea6a","textAlign":"center"}}
                maxLength={100}
                onChange={(e,t,v)=>{
                    // self.setValue('weight',v)
                    let allMove = courseMovesArr;
                    allMove[idx].value= v;
                    // let newMove = upMoves 
                    // newMove[idx] = {
                    //   "courseId": obg.id,
                    //   "name": itm.text,
                    //   "userId": userId,
                    //   "weight": v
                    // }
                    self.setState({
                      courseMovesArr: allMove,
                      // upMoves: newMove
                    })
                }}
                />
            </Col></Row>
          </div>)
        }) : <div className="text-align-center textclolor-white line-height-2r">暂无数据</div>
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col className="margin-top-2 border-radius-5f overflow-hide relative minheight-30 border-all border-color-000">
                <Row className="padding-all" justify="center" >
                  <Col className="zindex-10 text-align-center font-size-normal textclolor-white">{detailData.title}</Col>
                  <Col className="zindex-10 text-align-center font-size-small textclolor-black-low">{startDate} {detailData.startTime}-{detailData.endTime}</Col>
                  {/* <Col span={8} className="zindex-10 margin-top-2"><img className="width-100" src={`http://47.88.2.72:2019/files?text=https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%23%2FSuccess%3FcourseId%3D${obg.courseId}%26type%3Dregistor%26teacherId%3D${userId}`} /></Col> */}
                  {/* <Col className="zindex-10 text-align-center font-size-small textclolor-black-low margin-top-2">该二维码用于开门</Col> */}
                  <Col className="zindex-10 text-align-center font-size-small textclolor-black-low"></Col>
                </Row>
                <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                <div className="width-100 absolute-left heightp-100 zindex-6 bg bg3" />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row content="flex-start">
                  <Col>
                    <Collapse >
                      <Panel title={<span className="font-weight-700">计划要点</span>}>
                        <div>{detailData.kernel}</div>
                      </Panel>
                    </Collapse>
                  </Col>
                  <Col>
                    <Collapse >
                      <Panel title={<span className="font-weight-700">训练计划入门课注意事项</span>}>
                        <div>{detailData.careful}</div>
                      </Panel>
                    </Collapse>
                  </Col>
                  <Col>
                    <Collapse >
                      <Panel title={<span className="font-weight-700">训练动作</span>}>
                        <Row className="bg-1B1B1B padding-top-2">
                          <Col>{movesDom}</Col>
                          {/* <Col className={"text-align-center line-height-2r bg-262626"} span={8} onClick={()=>{
                            let newArr= courseMovesArr;
                            newArr.push({
                              text: '', value: ''
                            })
                            self.setState({
                              courseMovesArr: newArr
                            })
                          }}><Icon iconName={'ios-plus '} size={'120%'} iconColor={'#fff'} /> </Col> */}
                        </Row>
                      </Panel>
                    </Collapse>
                    <Row justify="center" className={"margin-top-1r margin-bottom-1r"}>
                      <Col span={14}>
                        <Buttons 
                          text="提交/更新"
                          type={'primary'}
                          size={'small'}
                          style={{backgroundColor: '#9eea6a', color:'#333'}}
                          onClick={()=>{
                            self.submitMove()
                          }}/>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="bg-1B1B1B padding-all">
                    <Row className="width-100">
                      <Col span={24} className="margin-top-2" >
                        <Row>
                          <Col span={24} className="font-size-default textclolor-white font-weight-700">门店地址</Col>
                          <Col span={24} className="font-size-small textclolor-black-low ">{detailData.address}</Col>
                          <Col span={24} className="font-size-small textclolor-white margin-top-2" onClick={()=>{
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
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    // hashHistory.goBack();
                    self.goLink('/Tab')
                  }}
                />
              </Col>
            
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
