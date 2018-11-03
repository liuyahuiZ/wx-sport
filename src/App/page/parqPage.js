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
            <div className="textclolor-white width-100 font-size-normal text-align-center margin-top-2r line-height-1f">牛油果体适能训练计划风险问卷</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f margin-top-2r">牛油果体适能致力于为您带来更加安全、科学的快乐健身方式。但对于部分学员，在开始进行更加频繁的运动前需听从医生的建议。此调查问卷主要针对您可能或已确定的健康风险进行调研。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">如果您的年龄处在15岁至69岁之间，此问卷将告知您开始运动前是否应与医生确认；如果您的年龄超过69岁，且您不经常运动，请先咨询医生建议。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">请仔细阅读问题并诚实的回答每一个问题</div>
            <Row className="textcolor-515151 font-size-small line-height-1f">
              <Col>
                <Row>
                  <Col span={2}>是</Col>
                  <Col span={2}>否</Col>
                  <Col span={20}>是否患有心脏病或仅可进行医生所制定的运动？</Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col span={2}>是</Col>
                  <Col span={2}>否</Col>
                  <Col span={20}>运动时是否感到胸部疼痛？</Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col span={2}>是</Col>
                  <Col span={2}>否</Col>
                  <Col span={20}>在过去的一个月里，当您没有运动的时候是否胸痛？</Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col span={2}>是</Col>
                  <Col span={2}>否</Col>
                  <Col span={20}>是否有因头晕而失去平衡，或曾经失去知觉？</Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col span={2}>是</Col>
                  <Col span={2}>否</Col>
                  <Col span={20}>是否有骨头或关节的问题，且您的医生告知您运动可能导致病情加重？</Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col span={2}>是</Col>
                  <Col span={2}>否</Col>
                  <Col span={20}>是否在服用心脏或血压类药物？</Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col span={2}>是</Col>
                  <Col span={2}>否</Col>
                  <Col span={20}>是否有不适宜运动的因素？</Col>
                </Row>
              </Col>
            </Row>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">如果您回答：</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">“否”：如果以上所有的问题您的回答都是“否”，您可以：
″	开始慢慢的逐步进行更加频繁且有规律的运动。
″	参加身体评估或个性化运动方案。有一个或多个“是”： 建议您在您开始运动或做身体评估之前，先得到医生的建议。您或许可以做任何您想做的运动，只需您慢慢开始并有计划的运动。或者，您可能需要把您的运动范围限制在对您安全的范围内。请将您希望参加的运动与医生沟通并遵医嘱。
″	如果您因为暂时的疾病而感到不舒服，比如感冒或发烧——请等到您身体感觉好一些了再开始运动；或者如果您怀孕了，请听从医生的建议再开始运动。
如果你的健康状况发生了改变，且以上任何问题的答案变成了“是”，请及时告知您的教练咨询您是否应该改变您的健身计划。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">备注：此问卷调查必须在接受健康评估或任何规定的健身计划之前提交。如果完成问卷后仍有任何疑虑，请在开始运动前咨询您的医生。此问卷一经签署将具有法律效力。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">客户确认：☐ 以上资料属实，已阅读并同意本问卷内容及服务协议内容。并妥当保存此回执，以便查询。</div>
          </section>
        );
    }
}
export default ServiceTitle;
