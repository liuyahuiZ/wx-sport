import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import moment from 'moment';
import { UrlSearch } from '../utils';
import BaseView from '../core/app';
import { transOver, classDetail } from '../api/classes';

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Carousel,
    TimeRunner,
    Loade
} = Components;
const { sessions, storage } = utils;

class MyClassDetail extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          article: {},
          status: false,
          itmStatus: true,
          detailData: {}
      };
    }
    _viewAppear(){
      this.getClassDetail();
    }
    getClassDetail(){
      let obg = UrlSearch();
      const self = this;
      classDetail({
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
      const keepTime = self.$$TimeRunner.getData();
      console.log(keepTime);
      let allKeepTime = Number(keepTime.hour)*60*60 + Number(keepTime.minute)*60 + Number(keepTime.second)
      let obg = UrlSearch();
      let userId = storage.getStorage('userId');
      transOver({
        userId: userId,
        courseId: obg.courseId,
      }).then((data)=>{
        console.log(data);
        self.goLink('/TrainResult', {keepTime: allKeepTime, courseId: obg.courseId})
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
        
        const carouselMap = detailData&&detailData.coursePlanDetails ? [{ tabName: 'thired', content: (<img alt="text" src={detailData.imgUrl} />), isActive: false }] : [];
        const stepDom = detailData&&detailData.coursePlanDetails&&detailData.coursePlanDetails.length > 0 ? detailData.coursePlanDetails.map((itm, idx)=>{
          return (<Row key={`${idx}-stp`}>
            <Col span={24} className="margin-top-2 border-bottom border-color-333 padding-top-3 padding-bottom-3" >
              <Row >
                <Col className="text-align-center">
                  <Row justify="center">
                    <Col span={10} className="bg-8EBF66 text-align-center border-radius-5f line-height-2r">{itm.name}</Col>
                  </Row>
                </Col>
                <Col span={24} className="font-size-10 text-align-center line-height-2r textclolor-white">计划难度</Col>
                <Col span={24} className="font-size-8 text-align-center textclolor-black-low ">{itm.description}</Col>
              </Row>
            </Col>
        </Row>)
        }) : <Row><Col className="text-align-center font-size-8 textclolor-white line-height-4r">暂无数据</Col></Row>;

        return(
          <section className="padding-all bg-000">
            <Row className="minheight-100" justify="center" content="flex-start">
              <Col>
                <Carousel options={carouselMap} containerStyle={{borderRadius: '0.5rem', height:'10rem'}} dotDefaultStyle={{width: '5px'}} dotActuveStyle={{}} showDotsText={false} dragAble />
              </Col>

              <Col span={24} className="margin-top-2 border-radius-5f overflow-hide bg-0D0D0D ">
                <Row className="padding-top-2" content="flex-start">
                  <Col span={1}></Col>
                  <Col span={12} className="font-size-10 textclolor-white ">{detailData.name}</Col>
                  <Col span={10} className="textclolor-333 text-align-right"><Icon iconName={'android-time '} size={'120%'} iconColor={'#333'} /> {moment(detailData.createTime).format('YYYY-MM-DD')} </Col>
                  <Col className="bg-1B1B1B">
                    {stepDom}
                  </Col>
                </Row>
              </Col>
              { detailData&&detailData.coursePlanDetails ? <Col className="margin-top-3 heighr-10 border-radius-5f overflow-hide">
                <video controls="controls" className="width-100" poster="http://static1.keepcdn.com/2017/11/10/15/1510299685255_315x315.jpg" 
                src={detailData.mvUrl} id="audioPlay" ref={(r) => { this.$$videos = r; }}  x5-playsinline="" playsinline="" webkit-playsinline=""  />
              </Col>: <div />}
              { detailData&&detailData.coursePlanDetails ? <Col className="textclolor-white text-align-center margin-top-3">
                <TimeRunner ref={(r) => { this.$$TimeRunner = r; }} />
              </Col> : <div />}
              {
                status ? (<Row className="width-100">
                  <Col span={11} className="margin-top-3">
                { itmStatus ? <Buttons
                  text="暂停"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    this.$$TimeRunner.stop();
                    this.$$videos.pause();
                    self.setValue('itmStatus', false)
                  }}
                /> : <Buttons
                text="开始"
                type={'primary'}
                size={'large'}
                style={{backgroundColor: '#8EBF66', color:'#333'}}
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
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    this.$$TimeRunner.stop()
                    this.submitClick()
                  }}
                />
              </Col>
                </Row>) :  detailData&&detailData.coursePlanDetails ? (<Col className="margin-top-3">
                <Buttons
                  text="开始训练"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#8EBF66', color:'#333'}}
                  onClick={()=>{
                    console.log(this.$$TimeRunner);
                    this.$$TimeRunner.start();
                    this.$$videos.play();
                    this.startClass()
                  }}
                />
              </Col>) : <div />
              }
              
              
            
            </Row>
          </section>
        );
    }
}
export default MyClassDetail;
