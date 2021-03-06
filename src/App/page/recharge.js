import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import BaseView from '../core/app';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import { userInfo } from '../api/classes';
import { topUpTemplateList, topUp, getToken} from '../api/index';
import formate from '../utils/formate';
import wx from 'weixin-js-sdk';

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
const reditUrl = "https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html";
const appId = 'wx9a7768b6cd7f33d0';
class Recharge extends BaseView {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: storage.getStorage('userInfo') ||{},
          trateInfo: {},
          loadText: '加载中',
          infos: {},
          templateList: [
            {
                "id": 1,
                "name": null,
                "amount": 100000,
                "accountAmount": 105000,
                "discount": 0,
                "startTime": 1543853651000,
                "endTime": 1543853651000,
                "remark": "冲1000 送 50",
                "limit": 99999999999,
                "used": 0,
                "isShow": 0,
                "isOver": 0,
                "createTime": 1543848571000,
                "updateTime": 1543853651000
            },
            {
                "id": 2,
                "name": null,
                "amount": 300000,
                "accountAmount": 320000,
                "discount": 0,
                "startTime": 1543853653000,
                "endTime": 1543853653000,
                "remark": "冲3000 送 200",
                "limit": 99999999999,
                "used": 0,
                "isShow": 0,
                "isOver": 0,
                "createTime": 1543848571000,
                "updateTime": 1543853653000
            },
            {
                "id": 3,
                "name": null,
                "amount": 500000,
                "accountAmount": 550000,
                "discount": 0,
                "startTime": 1543853653000,
                "endTime": 1543853653000,
                "remark": "5000 送 500",
                "limit": 99999999999,
                "used": 0,
                "isShow": 0,
                "isOver": 0,
                "createTime": 1543848571000,
                "updateTime": 1543853653000
            }
        ]
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
          this.getUserinfo(obg.code);
        }
      }else{
        if(!(userInfo&&userInfo.nickName&&userInfo.nickName!=='')){
          window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${reditUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
        }
      }

      
      this.getTmpList();
    }

    getUserinfo(code){
      const self = this;
      getToken({code: code}).then((data)=>{
        console.log(data);
       if(JSON.stringify(data)!=='{}'){
          storage.setStorage('userInfo', data);
          storage.setStorage('userId', data.id);
          // self.getMyClass(data.id);
          // self.getCourseRatio(data.id);
          // self.registry();
          self.setState({
            userInfo: data,
            userId: data.id
          })
        }
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: err, time: 3000 });
      })
    }

    
    getUserInfoMation(){
      let userId = storage.getStorage('userId');
      const self = this;
      Loade.show();
      userInfo({
        userId: userId,
      }).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        if(res.code>0&&res.result){
          let data = res.result;
          self.setState({
            infos: data
          })
        }
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }
    getTmpList(){
      const self = this;
      topUpTemplateList({}).then((res)=>{
        console.log(res);
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        if(res.code>0&&res.result){
          let data = res.result;
          self.setState({
            templateList: data
          })
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }
    doRecharge(itm){
      console.log(itm);
      const self = this;
      Loade.show();
      let userId = storage.getStorage('userId');
      topUp({
        "templateId": itm.id,
        "userId": userId
      }).then((res)=>{
        console.log(res.result);
        self.bought(res.result);
      }).catch((err)=>{
        console.log(err);
      })
    }

    bought(res){
      const self = this;
      wx.chooseWXPay({
        timestamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: 'prepay_id='+res.prepayId,
        signType: 'MD5', // 注意：新版支付接口使用 MD5 加密
        paySign: res.paySign,
        success: function (respon) {
          Modal.alert({ title: '',
            content: (<Row><Col className="text-align-center">充值成功，恭喜您成为会员</Col></Row>),
            btn: {
              text: '确定',
              type: 'link',
              style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
            }, 
            type: 'large'
          },() => { console.log('nult callback'); });
          // Toaster.toaster({ type: 'error', content: '购买成功', time: 3000 });
        }
      });
    }

    render() {
        const { userInfo, trateInfo, loadText, infos, templateList } = this.state;
        const self = this;
        const templateDom = templateList&&templateList.length>0 ? templateList.map((itm, idx)=>{
          return (
            <Col span={8} key={`${idx}-tpm`} onClick={()=>{
              self.doRecharge(itm);
            }}>
            <Row className="border-radius-5f border-all border-color-80EA46 textcolor-9eea6a padding-all">
              <Col className="text-align-center">{formate.tofix(itm.amount || 0)} 元</Col>
              <Col className="text-align-center font-size-8">送{formate.tofix(itm.accountAmount - itm.amount)}元</Col></Row>
            </Col>
          )
        }) : <Col />;
        return(
          <section className="padding-all bg-000 minheight-100">
            <Row >
              <Col span={24} >
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
                    {/* <Row>
                      <Col span={8} className="text-align-center line-height-1r"><span className="font-size-small textclolor-white">粉丝 173人</span></Col>
                      <Col span={8} className="text-align-center border-left border-right border-color-fff heighr-1 line-height-1r"><span className="font-size-small textclolor-white">关注 26人</span></Col>
                      <Col span={8} className="text-align-center line-height-1r"><span className="font-size-small textclolor-white">积分 290</span></Col>
                    </Row> */}
                  </Col>
                  <Col className={"border-bottom border-color-333 textclolor-black-low line-height-3r"}>
                    <Row>
                      <Col span={12}>充值账户</Col>
                      <Col span={12} className={"text-align-right"}>{userInfo.nickName}</Col>
                    </Row>
                  </Col>
                  <Col className={"border-bottom border-color-333 textclolor-black-low line-height-3r"}>
                    <Row>
                      <Col span={12}>享受折扣</Col>
                      <Col span={12} className={"text-align-right"}>{infos.memberDiscount ? `${(infos.memberDiscount * 10)}折`: '无折扣'}</Col>
                    </Row>
                  </Col>
                  <Col className={"border-bottom border-color-333 textclolor-black-low line-height-3r"}>
                    <Row>
                      <Col span={12}>剩余额度</Col>
                      <Col span={12} className={"text-align-right"}>{formate.formateMoney(infos.balance || 0)}元 </Col>
                    </Row>
                  </Col>
                  <Col className={"border-bottom border-color-333 textclolor-black-low line-height-3r"}>
                    <Row>
                      <Col span={12}>充值额度</Col>
                      <Col span={12} className={"text-align-right"}></Col>
                    </Row>
                  </Col>
                  <Col><Row gutter={16}>{templateDom}</Row></Col>
                  {/* <Col className={"textclolor-black-low line-height-3r text-align-center"} onClick={()=>{
                    self.goLink('/RechargeMind')
                  }}>
                    《充值须知》
                  </Col> */}
                  <Col>
                  <div className="textclolor-black-low text-align-center line-height-3r width-100 font-size-default line-height-2r margin-top-2r">充值须知</div>
                  <div className="textclolor-black-low width-100 font-size-small text-align-left line-height-1f">1、本充值卡金额适用于“牛油果”线上所有可购项目，含特价项目；</div>
                  <div className="textclolor-black-low width-100 font-size-small text-align-left line-height-1f ">2、本充值卡客户在购买线上项目时，系统默认优先使用充值卡充值金额支付；</div>
                  <div className="textclolor-black-low width-100 font-size-small text-align-left line-height-1f ">3、本充值卡余额不支持转移，但可申请退款；退款时，仅可原支付途径退回充值卡内充值金额，赠送金额即时清零不可退；</div>
                  <div className="textclolor-black-low width-100 font-size-small text-align-left line-height-1f ">4、如需“退款”，请微信联系人工服务。</div>
                </Col>
                </Row>
              </Col>
           
              <Col className="margin-top-1r">
                {/* <Buttons
                  text="返回"
                  type={'primary'}
                  size={'large'}
                  style={{backgroundColor: '#9eea6a', color:'#333'}}
                  onClick={()=>{
                    hashHistory.goBack();
                  }}
                /> */}
              </Col>
            </Row>
          </section>
        );
    }
}
export default Recharge;
