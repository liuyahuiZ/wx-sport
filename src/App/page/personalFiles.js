import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import { userGatherInfo } from '../api/classes';

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    Loade
  } = Components;
const { sessions, storage } = utils;
class PersonalFiles extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: storage.getStorage('userInfo') ||{},
          trateInfo: {},
          loadText: '加载中'
      };
    }

    _viewAppear(){
      let userId = storage.getStorage('userId');
      const self = this;
      Loade.show();
      userGatherInfo({
        userId: userId,
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        if(res.code>0&&res.result){
          let data = res.result;
          self.setState({
            trateInfo: data
          })
        }
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
           
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }

    render() {
        const { userInfo, trateInfo, loadText } = this.state;
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
                    { userInfo&&userInfo.imgUrl ? <img src={userInfo.imgUrl} className="width-100" />  : <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />}
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
                <Row className="bg-0D0D0D">
                  <Col span={12} className="padding-all font-size-default textclolor-black-low text-align-center" onClick={()=>{this.doSheet()}}>初试成绩 <Icon iconName={'chevron-down '} size={'90%'} iconColor={'#999'} /></Col>
                  <Col span={12} className="padding-all font-size-default textclolor-black-low text-align-center" onClick={()=>{this.doSheet()}}>当前成绩 <Icon iconName={'chevron-up '} size={'90%'} iconColor={'#999'} /></Col>
                </Row>
               {otherDom}
              </Col>
              <Col className="margin-top-1r">
                <Buttons
                  text="返回"
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
