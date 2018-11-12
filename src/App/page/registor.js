import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import BaseView from '../core/app';
import { UrlSearch } from '../utils';
import { userMark, userUpdInfo } from '../api/classes';

const {
    Buttons,
    Toaster,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    Rate,
    Loade,
    Input
} = Components;
const { sessions, storage } = utils;

class Registor extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: storage.getStorage('userInfo') ||{},
          resourceKey: '1',
          height: '',
          weight: '',
          birthday: '',
          phone: '',
          active: 'man',
          history: '',
          expeirence: '',
          year: '',
          month: '',
          day: ''
      };
    }

    componentDidMount(){
        // console.log('obg', storage.getStorage('userInfo'), UrlSearch());
        // console.log(storage.getStorage('authCode'))
        let obg = UrlSearch();
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
        if((userId&&userId!=='')){
          // this.getMyClass(userId);
          // this.getCourseRatio(userId);
        }
        console.log('userId', userId);
    }

    _viewAppear(){
    }

    setValue(key,val){
        this.setState({[key]: val});
    }

    submitMark(){
      let obg = UrlSearch();
      let userId = storage.getStorage('userId');
      let date = new Date;
      let nowYear = date.getFullYear()
      const { height, weight, birthday, phone, history, expeirence, active, year, month, day } = this.state;
      if(!height&&height==='') {
          Toaster.toaster({ type: 'error', position: 'top', content: '请输入身高', time: 3000 }, true);
          return false;
      }
      if(!weight&&weight==='') {
        Toaster.toaster({ type: 'error', position: 'top', content: '请输入体重', time: 3000 }, true);
        return false;
      }
      if(!year&&year==='') {
        Toaster.toaster({ type: 'error', position: 'top', content: '请输入生日', time: 3000 }, true);
        return false;
      }
      if(!phone&&phone==='') {
        Toaster.toaster({ type: 'error', position: 'top', content: '请输入电话', time: 3000 }, true);
        return false;
      }
      if(!history&&history==='') {
        Toaster.toaster({ type: 'error', position: 'top', content: '请输入伤病历史', time: 3000 }, true);
        return false;
      }
      if(!expeirence&&expeirence==='') {
        Toaster.toaster({ type: 'error', position: 'top', content: '请输入运动经验', time: 3000 }, true);
        return false;
      }
      Loade.show();
      userUpdInfo({
        id: userId,
        age: (nowYear - year),
        height: height,
        weight: weight,
        injuryHistory : history,
        phoneNo: phone,
        exercise: expeirence,
        sex: active
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        hashHistory.goBack();
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
        

    render() {
        const { userInfo, height, weight, birthday, phone, active, history, expeirence, year, month, day } = this.state;
        const self = this;

        return(
          <section className="padding-all bg-000 minheight-100">
            <Row justify="center">
              <Col span={20} >
              <TransAnimal >
                <Row justify="center" className="padding-all-1r overflow-hide relative">
                  <Col className="zindex-10 text-align-center margin-top-1r">
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r  overflow-hide">
                        <img src={userInfo.imgUrl} className="width-100" />
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="zindex-10 text-align-center margin-top-1r">
                    <span className="zindex-10 textclolor-white">{userInfo.nickName}</span>
                  </Col>
                  <Col span={16}>
                    <Row justify="center">
                        <Col span={9} onClick={()=>{self.setValue('active','man')}} className={`${active=='man'? 'bg-8EBF66 textclolor-333' : 'bg-000 textclolor-gray border-all border-color-e5e5e5'} margin-top-p4r font-size-small text-align-center border-radius-6r line-height-25`}>
                            <Icon iconName="female" size={'130%'} iconColor={`${active=='man'? '#333': '#fff'}`} />
                            <span>男</span>
                        </Col>
                        <Col span={4}> </Col>
                        <Col span={9} onClick={()=>{self.setValue('active','woman')}} className={`${active=='woman'? 'bg-8EBF66 textclolor-333' : 'bg-000 textclolor-gray border-all border-color-e5e5e5'} margin-top-p4r font-size-small text-align-center border-radius-6r line-height-25`}>
                            <Icon iconName="male " size={'130%'} iconColor={`${active=='woman'? '#333': '#fff'}`} />
                            <span>女</span>
                        </Col>
                    </Row>
                  </Col>
                  {/* <Col className="zindex-10 text-align-center ">
                    <span className="zindex-10 font-size-small textclolor-white">{userInfo.describe || 'xxx'}</span>
                  </Col> */}
                </Row>
                </TransAnimal>
              </Col>
             
              <Col span={20} className="bg-1B1B1B margin-top-2 border-radius-5f">
                <Row justify="center">
                    <Col span={2} />
                    <Col span={6} className="textclolor-white line-height-3r text-align-left">身高</Col>
                    <Col span={16}>
                    <Input
                        placeholder="请输入身高"
                        value={height}
                        innerStyle={{"backgroundColor":"#262626","color":"#fff"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('height',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={2} />
                    <Col span={6} className="textclolor-white line-height-3r text-align-left">体重</Col>
                    <Col span={16}>
                    <Input
                        placeholder="请输入体重"
                        value={weight}
                        innerStyle={{"backgroundColor":"#262626","color":"#fff"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('weight',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={2} />
                    <Col span={6} className="textclolor-white line-height-3r text-align-left">生日</Col>
                    <Col span={8}>
                    <Input
                        placeholder="请输入年"
                        value={year}
                        innerStyle={{"backgroundColor":"#262626","color":"#fff"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('year',v)
                        }}
                        />
                    </Col>
                    <Col span={4}>
                    <Input
                        placeholder="月"
                        value={month}
                        innerStyle={{"backgroundColor":"#262626","color":"#fff"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('month',v)
                        }}
                        />
                    </Col>
                    <Col span={4}>
                    <Input
                        placeholder="日"
                        value={day}
                        innerStyle={{"backgroundColor":"#262626","color":"#fff"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('day',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={2} />
                    <Col span={6} className="textclolor-white line-height-3r text-align-left">电话</Col>
                    <Col span={16}>
                    <Input
                        placeholder="请输入电话"
                        value={phone}
                        innerStyle={{"backgroundColor":"#262626","color":"#fff"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('phone',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={2} />
                    <Col span={6} className="textclolor-white line-height-3r text-align-left">伤病历史</Col>
                    <Col span={16}>
                    <Input
                        placeholder="请输入伤病历史"
                        value={history}
                        innerStyle={{"backgroundColor":"#262626","color":"#fff"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('history',v)
                        }}
                        />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={2} />
                    <Col span={6} className="textclolor-white line-height-3r text-align-left">运动经验</Col>
                    <Col span={16}>
                    <Input
                        placeholder="请输入运动经验"
                        value={expeirence}
                        innerStyle={{"backgroundColor":"#262626","color":"#fff"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('expeirence',v)
                        }}
                        />
                    </Col>
                </Row>
              </Col>
              
              <Col className="margin-top-3" span={20}>
                <Buttons
                  text="注 册"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    this.submitMark()
                  }}
                />
              </Col>
        

            </Row>
          </section>
        );
    }
}
export default Registor;
