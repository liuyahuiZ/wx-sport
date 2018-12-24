import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import moment from 'moment';
import wx from 'weixin-js-sdk';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import formate from '../utils/formate';
import { transOver, classDetail, coursePlan, coursePlanOver } from '../api/classes';

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Carousel,
    TimeRunner,
    Loade,
    Collapse,
    Panel,
    Modal
} = Components;
const { sessions, storage } = utils;
const reditUrl = "https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%2F%23%2FMyPlan";
const appId = 'wx9a7768b6cd7f33d0';

class MyClassDetail extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          status: false,
          itmStatus: true,
          mvVideo: '',
          detailData: {
            coursePlanDetails: {}
          },
          keepTime: storage.getStorage('keepTime'),
      };
    }
    _viewAppear(){
      let obg = UrlSearch();
      let userInfo = storage.getStorage('userInfo')
      let userId = storage.getStorage('userId');
      if(obg.code&&obg.code!==''){
        if(userInfo&&userInfo!==''&&obg.clean){
          storage.removeStorage('userInfo');
          storage.removeStorage('userId');
        }
        if(!(userInfo&&userInfo.nickName&&userInfo.nickName!=='')){
          this.getCoursePlan();
        }
      }else{
        if(!(userInfo&&userInfo.nickName&&userInfo.nickName!=='')){
          window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${reditUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
        }
      }
      if((userId&&userId!=='')){
        this.getCoursePlan();
      }

      
      const self = this;
      const { keepTime } = this.state
      console.log(keepTime);
      if(keepTime&&keepTime!==''){
        setTimeout(()=>{
          self.$$TimeRunner.setData(keepTime);
        }, 2000)
      }
      this.hideShare();
    }
    hideShare(){
      wx.hideAllNonBaseMenuItem();
    }
    getCoursePlan(){
      let obg = UrlSearch();
      let userId = storage.getStorage('userId');
      const self = this;
      Loade.show();
      coursePlan({
        userId: userId,
        courseId: obg.courseId,
        nowSection: obg.nowSection,
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        self.setState({
          detailData: data || {},
          mvVideo: data.mvUrl
        })
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
    setValue(key,val){
        this.setState({[key]: val});
    }
    submitClick(){
      const self = this;
      const { detailData } = this.state;
      const keepTime = self.$$TimeRunner.getData();
      console.log(keepTime);
      if(keepTime<30) { Toaster.toaster({ type: 'error', content: '训练时间要大于30秒哦', time: 3000 });return;}
      this.$$TimeRunner.stop()
      let allKeepTime = Number(keepTime.hour)*60*60 + Number(keepTime.minute)*60 + Number(keepTime.second)
      let obg = UrlSearch();
      let userId = storage.getStorage('userId');
      Loade.show();
      coursePlanOver({
        userId: userId,
        courseId: obg.courseId,
      }).then((res)=>{
        console.log(res);
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        self.goLink('/TrainResult', {keepTime: allKeepTime, courseId: detailData.courseId, coursePlanId: detailData.id, teacherId: obg.teacherId||0 })
        Loade.hide();
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
      console.log('endding')
    }

    startClass(){
      this.setState({
        status: true
      })
    }
    stopClass(){
      this.setState({
        status: false
      })
    }

    goLink(link, itm){
      if(link) {
        hashHistory.push({
          pathname: link,
          query: itm || ''
        });
      }
    }

    intensionPop(){
      Modal.alert({ title: '',
          content: (<Row className="bg-1b1b1b font-size-small padding-all" gutter={20} justify="center">
            <Col span={13} className="bg-6bab3d border-radius-5f line-height-2r text-align-center">RPE 1-3 基本算不训练</Col>
            <Col span={11} className="bg-262626 textclolor-white border-radius-5f line-height-2r text-align-center">RPE 4 训练非常轻松</Col>
            <Col span={20} className="margin-top-2 bg-6bab3d border-radius-5f line-height-2r text-align-center">RPE 5 没有任何难度 热身完强度</Col>
            <Col span={20} className="margin-top-2 bg-262626 textclolor-white border-radius-5f line-height-2r text-align-center">RPE 6 能够控制动作速度与节奏</Col>
            <Col span={20} className="margin-top-2 bg-6bab3d border-radius-5f line-height-2r text-align-center">RPE 7 能够完成动作要求额外多3次</Col>
            <Col span={13} className="margin-top-2 bg-262626 textclolor-white border-radius-5f line-height-2r text-align-center">RPE 8 保证动作不变形</Col>
            <Col span={10} className="margin-top-2 bg-6bab3d border-radius-5f line-height-2r text-align-center">RPE 9 动作极限</Col>
            <Col span={16} className="margin-top-2 bg-262626 textclolor-white border-radius-5f line-height-2r text-align-center">RPE 10 勉强1次动作</Col>
          </Row>),
          containerStyle: {"backgroundColor":'#1b1b1b',"width":"90%"},
          contentStyle: {"borderBottom":'none'},
          btn: {
            text: '确定',
            type: 'link',
            style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0', 'color': '#9eea6a'}
          }, 
          type: 'large'
        },
        () => { 
          // hashHistory.goBack(); 
          // self.goLink('/PicturePoster', {keepTime: obg.keepTime}); 
        });
    }
    setVideo(itm){
      console.log(itm);
      const self = this;
      const {keepTime} = this.state;
      this.setState({
        mvVideo: itm.description
      },()=>{
        if(keepTime&&keepTime!==''&&self.$$TimeRunner){
          setTimeout(()=>{
            self.$$TimeRunner.setData(keepTime);
          }, 1000)
        }
      })
    }

    render() {
        const {detailData, status, itmStatus, mvVideo} = this.state;
        const self = this;
        console.log('detailData', detailData);
        const carouselMap = detailData&&detailData.imgUrlList ?  
        detailData.imgUrlList.map((itm, idx)=>{
          return { tabName: idx, content: (<img alt="text" src={itm} />), isActive: false } 
        }): [
          {
            tabName: 1,
            content: (<img alt="text" src='https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg' />),
          }
        ];
        const coursePlanActionsDom = detailData&&detailData.coursePlanActions ? detailData.coursePlanActions.map((itm, idx)=>{
          const itmDom = itm.detailList&&itm.detailList.length > 0 ? itm.detailList.map((itme, idxs)=>{
            return (<Row key={`${idxs}-st`} gutter={4} className="padding-top-1r padding-bottom-1r border-bottom border-color-333 text-align-center" onClick={()=>{self.setVideo(itme)}}>
              <Col className="textclolor-white" span={8}>
                <Row><Col>{itme.name}</Col><Col className={"font-size-small textclolor-black-low"}>{itme.intension}分强度</Col></Row>
              </Col>
              <Col className="textclolor-white" span={4}>
                <Row>
                  <Col className={"font-size-small textclolor-black-low"}>重量kg</Col>
                  <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.weight}</Col>
                </Row>
              </Col>
              <Col className="textclolor-white" span={3}>
                <Row><Col className={"font-size-small textclolor-black-low"}>组数</Col>
                <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.groupNum}</Col></Row>
              </Col>
              <Col className="textclolor-white" span={3}>
                <Row><Col className={"font-size-small textclolor-black-low"}>次数</Col>
                <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.cycleNum}</Col></Row>
              </Col>
              <Col className="textclolor-white" span={6}>
                <Row>
                  <Col className={"font-size-small textclolor-black-low"}>持续时间</Col>
                  <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{formate.minutes(itme.time)}</Col></Row>
              </Col>
            </Row>)
          }) : <div />;
          return (<Row key={`${idx}-stps`} className="padding-all bg-1B1B1B margin-top-2 border-radius-5f">
            <Col><Collapse >
            <Panel hideRight={true} title={<Row className="border-bottom border-color-333">
                  <Col className="text-align-center heighr-5 line-height-5r overflow-hide relative">
                  <span className="zindex-10 textclolor-white relative margin-top-2">{itm.name} {itm.cycleNum}轮</span>
                  <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9"></div>
                  <img src={itm.bg} className={'width-100 absolute-left zindex-6'} />
                  </Col>
                  {itm.restTime !==0 ? <Col className="bg-000 line-height-3r"> 
                  <Icon iconName={'android-time '} size={'130%'} iconColor={'#fff'} /> 
                  <span className="textclolor-333 font-size-normal margin-right-1 bg-8EBF66 border-radius-5f">{parseInt((itm&&itm.restTime)/60)||0}:{parseInt((itm&&itm.restTime)%60)||0}</span>
                  <span className="textclolor-black-low">每个动作之间休息时间</span>
                  </Col> : <div />}
                </Row>}>
              <Row>
              <Col>{itmDom}</Col>
              </Row>
            </Panel>
          </Collapse>
          </Col>
      </Row>)
        }) : <div />
        return(
          <section className="padding-all bg-000">
            <Row className={`${mvVideo&&mvVideo!==''? 'margin-bottom-21r' : 'margin-bottom-4r'} heighth-100 overflow-y-scroll`} justify="center" content="flex-start">
              <Col>
                <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-1B1B1B ">
                <Row className="" content="flex-start">
                  <Col>
                  <Row className="padding-all bg-000">
                      <Col span={12} className="font-size-default textclolor-white ">{detailData.courseName}</Col>
                      <Col span={10} className="textclolor-white text-align-right"><Icon iconName={'android-time '} size={'120%'} iconColor={'#fff'} /> {detailData.name} </Col>
                  </Row>
                  </Col>
                  <Col className="bg-1B1B1B">
                    <Row justify="center" className="padding-all">
                      <Col className="text-align-center textclolor-black-low">训练强度</Col>
                      <Col className="text-align-center"><i className="icon small icon-working" /></Col>
                      <Col span={6}>
                        <Buttons
                          text="强度表"
                          type={'primary'}
                          size={'small'}
                          style={{backgroundColor: '#9eea6a', color:'#333'}}
                          onClick={()=>{
                            self.intensionPop()
                          }}/>
                      </Col>
                    </Row>
                    <Row justify="center">
                      <Col>
                        <Collapse >
                          <Panel title={<span className="font-weight-700">计划要点</span>}>
                            <div>{detailData&&detailData.kernel&&detailData.kernel.indexOf('</') > 0 ? <div dangerouslySetInnerHTML={{__html: `<p>${detailData.kernel}</p>`}} /> : detailData.kernel}</div>
                          </Panel>
                        </Collapse>
                      </Col>
                      <Col>
                        <Collapse >
                          <Panel title={<span className="font-weight-700">当天训练提示</span>}>
                            <div>{detailData&&detailData.tips&&detailData.tips.indexOf('</') > 0 ? <div dangerouslySetInnerHTML={{__html: `<p>${detailData.tips}</p>`}} /> : detailData.tips}</div>
                          </Panel>
                        </Collapse>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="padding-all margin-top-2 border-radius-5f overflow-hide bg-1B1B1B ">
                <Row>
                  <Col span={4} className={"textclolor-black-low text-align-center font-size-small"}>动作总数</Col>
                  <Col span={10} className={"textclolor-black-low text-align-center font-size-small"}>训练时间</Col>
                  <Col span={10} className={"textclolor-black-low text-align-center font-size-small"}>有氧运动</Col>
                  <Col span={4} className={"textcolor-9eea6a text-align-center font-size-normal"}>{detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.exerciseMoveNum||0}</Col>
                  <Col span={10} className={"textcolor-9eea6a text-align-center font-size-normal"}>{ formate.minute(detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.exerciseTime||0)}</Col>
                  <Col span={10} className={"textcolor-9eea6a text-align-center font-size-normal"}>{ formate.minute(detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.aerobicsExerciseTime||0)}</Col>
                </Row>
              </Col>
              <Col>{coursePlanActionsDom}</Col>
            </Row>
            <Row className="fixed bottom-0 bg-000 zindex-10 width-100 padding-all left-0">
            { mvVideo&&mvVideo!='' ? <Col className="margin-top-3 heighr-10 border-radius-5f overflow-hide">
                <video controls="controls" className="width-100" poster="http://static1.keepcdn.com/2017/11/10/15/1510299685255_315x315.jpg" 
                src={mvVideo} id="audioPlay" ref={(r) => { this.$$videos = r; }}  x5-playsinline="" playsinline="" webkit-playsinline=""  />
              </Col>: <div />}
              { mvVideo&&mvVideo!='' ? <Col className="textclolor-white text-align-center margin-top-3">
                <TimeRunner ref={(r) => { this.$$TimeRunner = r; }}   runner={(date)=>{
                  storage.setStorage('keepTime', date);
                }}/>
              </Col> : <div />}
              {
                status ? (<Row className="width-100">
                  <Col span={11} className="margin-top-3">
                { itmStatus ? <Buttons
                  text="暂停"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    this.$$TimeRunner.stop();
                    this.$$videos.pause();
                    let keepTime = this.$$TimeRunner.getData();
                    storage.setStorage('keepTime', keepTime);
                    self.setValue('itmStatus', false)
                  }}
                /> : <Buttons
                text="开始"
                type={'primary'}
                size={'large'}
                style={{backgroundColor: '#9eea6a', color:'#333'}}
                onClick={()=>{
                  this.$$TimeRunner.start();
                  this.$$videos.play();
                  self.setValue('itmStatus', true)
                }}
              />}
              </Col>
              <Col span={2}></Col>
              <Col span={11} className="margin-top-3">
                <Buttons
                  text="结束"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    storage.setStorage('keepTime', {});
                    this.submitClick()
                  }}
                />
              </Col>
                </Row>) :  mvVideo&&mvVideo!='' ? (<Col className="margin-top-3">
                <Buttons
                  text="开始训练"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    console.log(this.$$TimeRunner);
                    this.$$TimeRunner.start();
                    this.$$videos.play();
                    this.startClass()
                  }}
                />
              </Col>) : <div />
              }
              
              <Col className="margin-top-1r"><Buttons
                  text="返回"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    console.log(this.$$TimeRunner);
                    hashHistory.goBack();
                  }}
                /></Col>
            </Row>
          </section>
        );
    }
}
export default MyClassDetail;
