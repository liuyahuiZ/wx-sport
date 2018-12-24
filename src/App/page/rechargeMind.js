import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';

const {
    Buttons,
    Toaster,
    Item,
    Header,
    Row,
    Col,
    Icon,
  } = Components;
  
class RechargeMind extends Component {
    constructor(props) {
      super(props);
      this.state = {
        liveInfo: null
      };
    }
    render() {
        return(
          <section className="padding-all bg-000 minheight-100">
            <div className="textclolor-white width-100 font-size-normal text-align-center line-height-4r">充值注意事项</div>
            <div className="textcolor-515151 width-100 font-size-default text-align-left line-height-2r">一、	充值金额</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">¥1000   送50元</div>     
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">¥3000   送200元</div>   
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">¥5000   送500元</div>
            <div className="textcolor-515151 width-100 font-size-default line-height-2r margin-top-2r">二、	充值须知</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f">1、本充值卡金额适用于“牛油果”线上所有可购项目，含特价项目；</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">2、本充值卡客户在购买线上项目时，系统默认优先使用充值卡充值金额支付；</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">3、本充值卡余额不支持转移，但可申请退款；退款时，仅可原支付途径退回充值卡内充值金额，赠送金额即时清零不可退；</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">4、如需“退款”，请微信联系人工服务。</div>
          </section>
        );
    }
}
export default RechargeMind;
