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
            <div className="textclolor-white width-100 font-size-normal text-align-center margin-top-2r line-height-1f">牛油果体适能</div>
            <div className="textclolor-white width-100 font-size-default text-align-center line-height-2r">Avocado Method</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f margin-top-2r">所谓体适能是一种身体适应生活、运动与环境的综合能力。体适能较好的人在日常生活或工作中，
            从事体力性活动或运动皆有较佳的活力及适应能力，而不会轻易产生疲劳或力不从心的感觉。</div>
            <div className="textcolor-515151 width-100 font-size-small line-height-1f ">2017年牛油果体适能孕育而生,
            致力于打造一个专注于现代人健康的体育教育体系和健身品牌。通过合理安全的体适能动作编排让用户在短时间内得到体能的提升，提高控制身体的多线协调能力。</div>
            <div className="textclolor-white width-100 font-size-normal text-align-left margin-top-2r line-height-1f">三大核心理念</div>
            <div className="textclolor-white width-100 font-size-default text-align-left line-height-2r">教育（Education）、社交（Social）、管理（Management）</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">For 用户：</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">#精准计划 培养高效运动意识#</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">无论你是入门小白、进阶选手还是健身老司机</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">我们将提供一套完整的运动计划，精准训练</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">更客观的更全面的提供技术指导</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">培训、挖掘你的运动潜能</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">#抱团打卡 组建健身社交网#</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">线下小班入门课程、EasyCamp训练营</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">线上教练指导反馈，打卡排名</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">只要你够自觉够自律</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-left line-height-1f ">你永远都不孤单</div>
            {/* <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f margin-top-2r">For教练：</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">#解放时间 越专业越有价值#</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">使用平台进行会员管理与自我学习，</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">拒绝保姆式陪练、不再做销售机器，</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">而是有更多时间专注于提高自身的技术和知识</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">#商企联动 增加企业附加值#</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">利用平台协助商企管理员工健康</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">打造企业独特健身文化</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">Trains Smart，Move Efficiency</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">更机智，更高效</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">对低效率健身 say no！</div>
            <div className="textcolor-515151 width-100 font-size-small text-align-center line-height-1f ">掌握属于你的身体主动权</div> */}
          </section>
        );
    }
}
export default ServiceTitle;
