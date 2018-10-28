import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import computed from '../utils/computed'
import { coursePlanRecords, myClass } from '../api/classes'

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
  } = Components;
const { sessions, storage } = utils;

class Appointment extends Component {
    constructor(props) {
      super(props);
      this.state = {
          status: this.props.status,
          userInfo: storage.getStorage('userInfo'),
          dataDetail: {},
          loadText: '加载中'
      };
    }
    componentDidMount(){
        this.getMyClass()
    }
    getMyClass(){
        const self = this;
        myClass({
            userId: storage.getStorage('userId')
        }).then((res)=>{
            if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
            let data = res.result;
            console.log(data);
            if(data&&JSON.stringify(data)!=='{}'){
                self.setState({
                    dataDetail: data
                })
            } else {
                self.setState({
                    loadText: '暂无数据'
                })
            }
      }).catch((e)=>{
        console.log(e)
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
        const { userInfo, dataDetail, loadText } = this.state;
        const self = this;
        let appintArrDom = dataDetail&&dataDetail.myCourses ? dataDetail.myCourses.map((itm, idx)=>{
            return (<div key={`${idx}-train`}  className="overflow-hide relative heighr-8 textclolor-white padding-all margin-bottom-3"
            onClick={()=>{self.goLink('/MyPlanRecode', {courseId: itm.id})}}>
                <Row>
                    <Col span={12} className="zindex-10 font-size-12 text-align-left">{itm.name}</Col>
                    <Col span={12} className="zindex-10 font-size-8 text-align-right line-height-2r">{itm.date}</Col>
                </Row>
                <Row className="margin-top-1r">
                    <Col span={8} className="zindex-10 text-align-left">
                        <Row>
                            <Col className="font-size-8">训练天数</Col>
                            <Col className="font-size-16">{itm.trainingDays}</Col>
                        </Row>
                    </Col>
                    <Col span={8} className="zindex-10 text-align-center">
                        <Row>
                            <Col className="font-size-8">完成比例</Col>
                            <Col className="font-size-16">{computed.accMul(itm.completePercent||0, 100)}%</Col>
                        </Row>
                    </Col>
                    <Col span={8} className="zindex-10 text-align-right">
                        <Row>
                            <Col className="font-size-8">训练时常/分钟</Col>
                            <Col className="font-size-16">{`${parseInt(itm.trainingMinutes/60)}:${parseInt(itm.trainingMinutes%60)}`}</Col>
                        </Row>
                    </Col>
                </Row>
                <div className="width-100 bg-000 opacity-6 heightp-100 absolute-left zindex-9"></div>
                <div className="width-100 absolute-left heightp-100 zindex-6 bg bg3" />
            </div>)
        }) : <Row ><Col className="text-align-center font-size-8 textclolor-white line-height-2r">{loadText}</Col></Row>;
        return(
          <section className="bg-000 minheight-90">
            <div className="padding-all minheight-100">
            <Row >
              <Col span={24} className="overflow-hide">
              <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-1B1B1B border-radius-5f overflow-hide relative">
                  <Col span={8}>
                    <Row>
                        <Col className={"text-align-center font-size-26 textclolor-white"}>{dataDetail.mySignInCount||0}</Col>
                        <Col className={"text-align-center font-size-8 textclolor-black-low"}>累计打卡/天</Col>
                    </Row>
                  </Col>
                  <Col span={8} className="text-align-center zindex-10">
                    <div className="middle-round-5 border-radius-round bg-gray display-inline-block line-height-4r overflow-hide">
                        <img src={ userInfo.imgUrl} className="width-100" />
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col span={8}>
                    <Row>
                        <Col className={"text-align-center font-size-26 textclolor-white"}>{dataDetail.myCompletedPlanCount||0}</Col>
                        <Col className={"text-align-center font-size-8 textclolor-black-low"}>累计完成计划/天</Col>
                    </Row>
                  </Col>
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                </Row>
                </TransAnimal>
              </Col>
             
            </Row>
            <div className='margin-top-2 border-radius-5f overflow-hide bg-0D0D0D '>
            <Row content="flex-start">
                <Col span={1} className="line-height-2r "></Col>
                <Col span={22} className="font-size-10 textclolor-white line-height-2r ">计划记录</Col>
                <Col className="bg-1B1B1B padding-all">
                    {appintArrDom}
                </Col>
            </Row>
            </div>
            </div>
          </section>
        );
    }
}
export default Appointment;
