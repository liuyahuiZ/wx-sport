import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import { userGatherInfo, courselastKeep, userInfo } from '../api/classes';

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    Loade,
    Textarea
  } = Components;
const { sessions, storage } = utils;
class PersonalFiles extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          trateInfo: {},
          lastKeep: {},
          loadText: '加载中',
          question: ''
      };
    }

    _viewAppear(){
      // let userId = storage.getStorage('userId');
      let obg = UrlSearch();
      this.getUserInfo()
      const self = this;
      Loade.show();
      userGatherInfo({
        userId: obg.userId,
      }).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        self.setState({
          trateInfo: data
        })
        Loade.hide();
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
      courselastKeep({
        userId: obg.userId,
      }).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        self.setState({
          lastKeep: data
        })
        Loade.hide();
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
      
    }

    setValue(key,val){
      this.setState({[key]: val});
    }

    getUserInfo(){
      let obg = UrlSearch();
      const self = this;
      userInfo({userId: obg.userId}).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let info = res.result;
        self.setState({
          userInfo: info
        })
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: '获取教练信息失败', time: 3000 });
      })
    }
           
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }

    render() {
        const { userInfo, trateInfo, loadText, lastKeep, question } = this.state;
        const self = this;
        const topDom = trateInfo&&trateInfo.top4 ? trateInfo.top4.map((itm,idx)=>{
          return (<Row className="images-half float-left" key={`rs-${idx}`}>
            <Col span={4}><div className="icon icon-sport margin-top-p4r" /></Col>
            <Col span={20} className="font-size-small textclolor-black-low line-height-2r">{JSON.stringify(itm)}</Col>
          </Row>)
        }) :  <div className="text-align-center font-size-small textclolor-white line-height-4r">暂无数据</div>;

        const otherDom = trateInfo&&trateInfo.other ? trateInfo.other.map((itm,idx)=>{
          return (<Row className="images-33 float-left padding-all" key={`rsd-${idx}`}>
            <Col className="font-size-small textclolor-black-low line-height-2r">{JSON.stringify(itm)}</Col>
            <Col><div className="icon icon-boy margin-top-p4r" /></Col>
        </Row>)
        }) :  <div className="text-align-center font-size-small textclolor-white line-height-4r">暂无数据</div>;

        return(
          <section className="padding-all bg-000 minheight-100">
            <Row >
              <Col span={24} >
              <TransAnimal >
              <Row justify="center" className="padding-all-1r bg-1B1B1B border-radius-5f overflow-hide relative">
                  {/* <Col span={12} className="text-align-left">
                    <Icon iconName={'quote '} size={'150%'} iconColor={'#fff'}   />
                  </Col>
                  <Col span={12} className="text-align-right">
                    <Icon iconName={'android-settings '} size={'150%'} iconColor={'#fff'}   />
                  </Col> */}

                  <Col className="margin-top-1r text-align-center zindex-10" >
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r overflow-hide" >
                        <img src={userInfo.imgUrl} className="width-100" />
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10">
                    <span className="textclolor-white">{userInfo.nickName || '请登陆'}</span>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10">
                    {/* <Row>
                      <Col span={8} className="text-align-center line-height-1r"><span className="font-size-small textclolor-white">粉丝 173人</span></Col>
                      <Col span={8} className="text-align-center border-left border-right border-color-fff heighr-1 line-height-1r"><span className="font-size-small textclolor-white">关注 26人</span></Col>
                      <Col span={8} className="text-align-center line-height-1r"><span className="font-size-small textclolor-white">积分 290</span></Col>
                    </Row> */}
                  </Col>
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                  <img className="width-100 absolute-left zindex-6 heightp-100" alt="text" src={`${config.IMG_URL}getphotoPal/2018-7-29/15328575406788.png`} />
                </Row>
                </TransAnimal>
              </Col>
              <Col span={24} className="bg-1B1B1B padding-all margin-top-1r border-radius-5f">
               <Row>
                   <Col className="textclolor-white">总运动{trateInfo.totalMinute}分钟</Col>
                   <Col>{topDom}</Col>
               </Row>
              </Col>
              <Col span={24} className="bg-1B1B1B margin-top-1r border-radius-5f">
               {otherDom}
              </Col>
              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-0D0D0D">
                <Row className="flex-start zindex-10 heighr-12" align="center" justify="center">
                    <Col><img src={lastKeep.imgUrl} /></Col>
                </Row>
              </Col>
              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-0D0D0D">
                <Row className="flex-start zindex-10 heighr-12" align="center" justify="center">
                    <Col>
                    <video controls="controls" className="width-100" poster="http://static1.keepcdn.com/2017/11/10/15/1510299685255_315x315.jpg" 
                    src={lastKeep.mvUrl} id="audioPlay" ref={(r) => { this.$$videos = r; }}  x5-playsinline="" playsinline="" webkit-playsinline=""  />
                  </Col>
                </Row>
              </Col>
              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white line-height-3r">学员问题反馈:</Col>
                </Row>
                <Row>
                <Col className="padding-all textclolor-black-low">
                {lastKeep.question}
                </Col>
                </Row>
              </Col>
              <Col className="margin-top-2 relative border-radius-5f overflow-hide bg-1B1B1B">
                <Row>
                  <Col className="textclolor-white line-height-3r">教练意见填写:</Col>
                </Row>
                <Row>
                <Col className="padding-all">
                <Textarea
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
              <Col className="margin-top-1r">
                <Buttons
                  text="提交"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    hashHistory.goBack();
                  }}
                />
              </Col>
            </Row>
          </section>
        );
    }
}
export default PersonalFiles;
