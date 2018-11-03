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
  
class ServiceTitle extends Component {
    constructor(props) {
      super(props);
      this.state = {
        liveInfo: null
      };
    }
    render() {

        return(
          <section className="padding-all bg-000 minheight-100">
            <div className="textclolor-white width-100 font-size-normal text-align-center margin-top-2r line-height-1f">牛油果体适能运动风险免责协议</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f margin-top-2r">1.参与牛油果体适能健身服务的用户，具有完全的法律行为能力，同意遵守相关管理规章制度，应接受牛油果体适能的相关服务协议，并已知晓有关的健身规则与警示，承诺遵守牛油果体适能的相关规定。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">2.牛油果员工以及教练不提供任何形式的体检服务，牛油果员工以及教练对用户身体情况的任何询问、了解和建议都不构成本公司对用户身体状况是否符合任意课程和产品要求的承诺和保证。在确认本声明前，用户应自行到医疗机构进行体检，了解自身身体情况，以确保用户具备参与牛油果体适能健身产品的身体条件，且没有任何不宜运动的疾病、损伤和其他缺陷。因用户自身的任何疾病、损伤或其他缺陷导致用户在接受服务时发生任何损害的，牛油果不承担任何法律责任。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">3.用户有任何身体方面的原因会影响或可能会影响使用牛油果的健身产品的，在使用牛油果健身产品过程中感到任何不适的，请及时告知牛油果的健身教练。否则，如果发生身体损害，牛油果不承担法律责任。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">4.严禁14周岁以下儿童进入牛油果健身场所，严禁孕妇及哺乳期女性、心肺功能疾病、颈椎病、皮肤病、关节损伤及一切传染病患者等不适合健身运动者使用牛油果提供的健身产品，购买时如有隐瞒，所发生的一切后果及对他人产生的后果牛油果及教练组不负任何责任。如因此造成第三人损害的，则由其承担赔偿责任。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">5.经教练评估存在运动风险且坚持上课的用户，需现场签订《责任免除和豁免协议》。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">6.用户有遵守声明中约定和管理制度、用户手册的义务，遵守任何形式（包括口头、文本等）告知的安全规范，如有违反相关规定的发生，造成任何后果牛油果不承担法律责任，且牛油果有权终止其使用资格，已缴纳的费用不予退还。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">7.运动前后严禁饮用含酒精类饮品及任何国家法律法规禁止的兴奋类服用剂。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">8.为了用户的健身安全，用户训练时须穿着专业的运动服，运动鞋及运动装备。运动期间不得参与违反国家法律法规的活动、不得穿着违反道德规范服饰进行运动。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">9.用户在参加健身锻炼时请勿携带珠宝饰品等贵重物品，以免丢失或造成意外。牛油果提供的储物柜仅为方便用户，牛油果本身不提供锁具、不具有保管物品义务。物品遗失概不负责。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">10.因个人体制、基础形态、运动技能的不同，牛油果不能保证所有用户都能取得某项理想的健身效果。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">11.课程中应专心学习与规范动作，避免发生意外伤害，因用户自身动作不当导致的伤残事故等意外情况，牛油果不承担任何法律责任。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">12.牛油果保留增加、改进或者取消非适合课程、产品的权利。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">附：法律适用、管辖与其他</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">本协议履行过程中，因您使用牛油果服务产生的争议应由牛油果与您沟通并协商处理。协商不成时，双方均同意以牛油果平台管理者住所地深圳市南山区人民法院为管辖法院。</div>
          </section>
        );
    }
}
export default ServiceTitle;
