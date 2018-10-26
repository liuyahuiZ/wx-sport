import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import BaseView from '../core/app';
import { UrlSearch } from '../utils';
import { userMark, userInfo } from '../api/classes';

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

class OcrDoc extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          resourceKey: '1',
          js: 5,
          bd: 5,
          wg: 5,
          height: '',
          weight: '',
          birthday: '',
          active: 'man'
      };
    }

    _viewAppear(){
      this.getUserInfo();
    }

    setValue(key,val){
        this.setState({[key]: val});
    }

    getUserInfo(){
      let obg = UrlSearch();
      const self = this;
      userInfo({userId: obg.teacherId}).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let info = res.result;
        self.setState({
          userInfo: info
        })
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: '获取教练信息失败', time: 3000 });
      })
    }

    submitMark(){
      let obg = UrlSearch();
      let userId = storage.getStorage('userId');
      const {js, bd, wg} = this.state;
      Loade.show();
      userMark({
        userId: obg.teacherId,
        js: js,
        bd: bd,
        wg: wg
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        Modal.alert({ title: '评分成功',
          content: "您对该教练评分成功!",
          btn: {
            text: '确定',
            type: 'link',
            style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
          }, 
          type: 'large'
        },
        () => { console.log('nult callback'); });
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
        

    render() {
        const { userInfo, js, bd, wg, height, weight, birthday, phone, active, history, expeirence } = this.state;
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
                        <Col span={9} onClick={()=>{self.setValue('active','man')}} className={`${active=='man'? 'bg-8EBF66 textclolor-333' : 'bg-000 textclolor-gray border-all border-color-e5e5e5'} margin-top-p4r font-size-8 text-align-center border-radius-6r line-height-20`}>
                            <Icon iconName="female" size={'130%'} iconColor={`${active=='man'? '#333': '#fff'}`} />
                            <span>男</span>
                        </Col>
                        <Col span={4}> </Col>
                        <Col span={9} onClick={()=>{self.setValue('active','woman')}} className={`${active=='woman'? 'bg-8EBF66 textclolor-333' : 'bg-000 textclolor-gray border-all border-color-e5e5e5'} margin-top-p4r font-size-8 text-align-center border-radius-6r line-height-20`}>
                            <Icon iconName="male " size={'130%'} iconColor={`${active=='woman'? '#333': '#fff'}`} />
                            <span>女</span>
                        </Col>
                    </Row>
                  </Col>
                  {/* <Col className="zindex-10 text-align-center ">
                    <span className="zindex-10 font-size-8 textclolor-white">{userInfo.describe || 'xxx'}</span>
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
                        innerStyle={{"backgroundColor":"#1B1B1B","color":"#fff"}}
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
                        innerStyle={{"backgroundColor":"#1B1B1B","color":"#fff"}}
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
                    <Col span={16}>
                    <Input
                        placeholder="请输入生日"
                        value={birthday}
                        innerStyle={{"backgroundColor":"#1B1B1B","color":"#fff"}}
                        maxLength={100}
                        onChange={(e,t,v)=>{
                            self.setValue('birthday',v)
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
                        innerStyle={{"backgroundColor":"#1B1B1B","color":"#fff"}}
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
                        innerStyle={{"backgroundColor":"#1B1B1B","color":"#fff"}}
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
                        innerStyle={{"backgroundColor":"#1B1B1B","color":"#fff"}}
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
                  style={{backgroundColor: '#80EA46', color:'#333'}}
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
export default OcrDoc;
