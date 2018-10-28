import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import moment from 'moment';
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
    Panel
} = Components;
const { sessions, storage } = utils;

class MyClassDetail extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          status: false,
          itmStatus: true,
          detailData: {
            coursePlanDetails: {}
          }
      };
    }
    _viewAppear(){
      this.getCoursePlan();
    }
    getCoursePlan(){
      let obg = UrlSearch();
      const self = this;
      coursePlan({
        courseId: obg.courseId,
        nowSection: obg.nowSection,
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        self.setState({
          detailData: data || {}
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
      Loade.show();
      const self = this;
      const { detailData } = this.state;
      const keepTime = self.$$TimeRunner.getData();
      console.log(keepTime);
      let allKeepTime = Number(keepTime.hour)*60*60 + Number(keepTime.minute)*60 + Number(keepTime.second)
      let obg = UrlSearch();
      let userId = storage.getStorage('userId');
      coursePlanOver({
        userId: userId,
        courseId: obg.courseId,
      }).then((res)=>{
        console.log(res);
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        self.goLink('/TrainResult', {keepTime: allKeepTime, courseId: detailData.courseId, coursePlanId: detailData.id})
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

    render() {
        const {detailData, status, itmStatus} = this.state;
        const self = this;
        const carouselMap = detailData&&detailData.imgUrlList ?  
        detailData.imgUrlList.map((itm, idx)=>{
          return { tabName: idx, content: (<img alt="text" src={itm} />), isActive: false } 
        }): [
          {
            tabName: 1,
            content: (<img alt="text" src='https://static1.keepcdn.com/2018/03/05/17/1520240773072_315x315.jpg' />),
          },{
            tabName: 2,
            content: (<img alt="text" src='https://static1.keepcdn.com/2018/03/01/15/1519888737768_315x315.png'/>)
          }
        ];
        const coursePlanActionsDom = detailData&&detailData.coursePlanActions ? detailData.coursePlanActions.map((itm, idx)=>{
          const itmDom = itm.detailList&&itm.detailList.length > 0 ? itm.detailList.map((itme, idxs)=>{
            return (<Row key={`${idxs}-st`} gutter={16} className="padding-top-1r padding-bottom-1r border-bottom border-color-333 text-align-center">
              <Col className="textclolor-white" span={8}>
                <Row><Col>{itme.name}</Col><Col className={"font-size-8 textclolor-black-low"}>{itme.intension}分强度</Col></Row>
              </Col>
              <Col className="textclolor-white" span={4}>
                <Row>
                  <Col className={"font-size-8 textclolor-black-low"}>重量kg</Col>
                  <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.weight}</Col>
                </Row>
              </Col>
              <Col className="textclolor-white" span={3}>
                <Row><Col className={"font-size-8 textclolor-black-low"}>组数</Col>
                <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.groupNum}</Col></Row>
              </Col>
              <Col className="textclolor-white" span={3}>
                <Row><Col className={"font-size-8 textclolor-black-low"}>次数</Col>
                <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.cycleNum}</Col></Row>
              </Col>
              <Col className="textclolor-white" span={6}>
                <Row>
                  <Col className={"font-size-8 textclolor-black-low"}>持续时间</Col>
                  <Col className={"padding-all-2 bg-8EBF66 border-radius-5f textclolor-black"}>{itme.time}</Col></Row>
              </Col>
            </Row>)
          }) : <div />;
          return (<Row key={`${idx}-stps`} className="padding-all bg-1B1B1B margin-top-2 border-radius-5f">
          <Col span={24} className="margin-top-2 border-bottom border-color-333 padding-top-3 padding-bottom-3" >
            <Row >
              <Col className="text-align-center heighr-5 line-height-5r overflow-hide relative">
               <span className="zindex-10 textclolor-white relative margin-top-2">{itm.name} ({itm.cycleNum})</span>
               <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
               <img src={itm.bg} className={'width-100 absolute-left zindex-6'} />
              </Col>
            </Row>
          </Col>
          <Col>{itmDom}</Col>
      </Row>)
        }) : <div />
        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col>
                <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-1B1B1B ">
                <Row className="" content="flex-start">
                  <Col>
                  <Row className="padding-all bg-000">
                      <Col span={12} className="font-size-10 textclolor-white ">{detailData.courseName}</Col>
                      <Col span={10} className="textclolor-white text-align-right"><Icon iconName={'android-time '} size={'120%'} iconColor={'#fff'} /> {detailData.name} </Col>
                  </Row>
                  </Col>
                  <Col className="bg-1B1B1B">
                    <Row justify="center" className="padding-all">
                      <Col className="text-align-center textclolor-black-low">训练强度</Col>
                      <Col className="text-align-center"><i className="icon small icon-working" /></Col>
                      <Col span="6">
                        <Buttons
                          text="强度表"
                          type={'primary'}
                          size={'small'}
                          style={{backgroundColor: '#80EA46', color:'#333'}}
                          onClick={()=>{
                            console.log('123');
                          }}/>
                      </Col>
                    </Row>
                    <Row justify="center">
                      <Col>
                        <Collapse >
                          <Panel title={'计划要点'}>
                            <div>{detailData.kernel}</div>
                          </Panel>
                        </Collapse>
                      </Col>
                      <Col>
                        <Collapse >
                          <Panel title={'当天训练提示'}>
                            <div>{detailData.tips}</div>
                          </Panel>
                        </Collapse>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className="padding-all margin-top-2 border-radius-5f overflow-hide bg-1B1B1B ">
                <Row>
                  <Col span={4} className={"textclolor-black-low text-align-center font-size-8"}>动作总数</Col>
                  <Col span={10} className={"textclolor-black-low text-align-center font-size-8"}>训练时间</Col>
                  <Col span={10} className={"textclolor-black-low text-align-center font-size-8"}>有氧运动</Col>
                  <Col span={4} className={"textcolor-79EF44 text-align-center font-size-12"}>{detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.exerciseMoveNum||0}</Col>
                  <Col span={10} className={"textcolor-79EF44 text-align-center font-size-12"}>{ formate.minutes(detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.exerciseTime||0)}</Col>
                  <Col span={10} className={"textcolor-79EF44 text-align-center font-size-12"}>{ formate.minutes(detailData&&detailData.coursePlanSummaryDto&&detailData.coursePlanSummaryDto.aerobicsExerciseTime||0)}</Col>
                </Row>
              </Col>
              <Col>{coursePlanActionsDom}</Col>
              { detailData&&detailData.mvUrl ? <Col className="margin-top-3 heighr-10 border-radius-5f overflow-hide">
                <video controls="controls" className="width-100" poster="http://static1.keepcdn.com/2017/11/10/15/1510299685255_315x315.jpg" 
                src={detailData.mvUrl} id="audioPlay" ref={(r) => { this.$$videos = r; }}  x5-playsinline="" playsinline="" webkit-playsinline=""  />
              </Col>: <div />}
              { detailData&&detailData.mvUrl ? <Col className="textclolor-white text-align-center margin-top-3">
                <TimeRunner ref={(r) => { this.$$TimeRunner = r; }} />
              </Col> : <div />}
              {
                status ? (<Row className="width-100">
                  <Col span={11} className="margin-top-3">
                { itmStatus ? <Buttons
                  text="暂停"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#80EA46', color:'#333'}}
                  onClick={()=>{
                    this.$$TimeRunner.stop();
                    this.$$videos.pause();
                    self.setValue('itmStatus', false)
                  }}
                /> : <Buttons
                text="开始"
                type={'primary'}
                size={'large'}
                style={{backgroundColor: '#80EA46', color:'#333'}}
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
                  style={{backgroundColor: '#80EA46', color:'#333'}}
                  onClick={()=>{
                    this.$$TimeRunner.stop()
                    this.submitClick()
                  }}
                />
              </Col>
                </Row>) :  detailData&&detailData.mvUrl ? (<Col className="margin-top-3">
                <Buttons
                  text="开始训练"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#80EA46', color:'#333'}}
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
                  style={{backgroundColor: '#80EA46', color:'#333'}}
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
