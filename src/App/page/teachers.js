import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import moment from 'moment';
import { userStudents, userRegistry, courseRatio } from '../api/classes';

const {
    Buttons,
    Toaster,
    Item,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    ProgressCircle,
    Tab,
    Progress,
    ProgressDrag,
    Loade
  } = Components;
const { sessions, storage } = utils;
//"https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html%2F%23%2FTab"
const reditUrl = "https%3A%2F%2Favocadomethod.cn%2Fdist%2Findex.html";
const appId = 'wx9a7768b6cd7f33d0';
class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          status: this.props.status,
          resourceKey: '1',
          userInfo: storage.getStorage('userInfo') ||{},
          myClassList:[],
          ratioList: [],
          loadText: '加载中',
          userId: storage.getStorage('userId') ||{},
      };
    }
    componentDidMount(){
      let userId = storage.getStorage('userId');
      if((userId&&userId!=='')){
        this.getMyClass(userId);
      }
      console.log('userId', userId);
    }


    getMyClass(userId){
      console.log(userId);
      const self = this;
      Loade.show();
      userStudents({userId: userId}).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        if(data && data.length > 0){
          self.setState({
            myClassList: data
          })
        } else {
          self.setState({
            loadText: '暂无数据'
          })
        }
      }).catch((e)=>{
        Loade.hide();
        console.log(e)
      })
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        status: nextProps.status
      })
    }

    checkUser(){
      console.log(storage.getStorage('userInfo'));
      if (storage.getStorage('userInfo')) {
        this.goLink('/PersonalFiles');
      } else {
        window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${reditUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
      }
    }

    switchChange(date){
        console.log(date);
    }
        
    tabChange(v) {
      const self = this;
      self.setState({
        'resourceKey': v
      });
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
        const { status, myClassList, resourceKey, userInfo, loadText, ratioList, userId } = this.state;
        const self = this;
        const myClassListDom = myClassList.length > 0 ? myClassList.map((itm, idx)=>{
          return (<Row justify="center" className={`margin-top-3 padding-bottom-3 ${idx === (myClassList.length-1) ? '' :'border-bottom border-color-333'}`} key={`${idx}-r`} onClick={()=>{
            self.goLink('/TeacherPersonal', {
              userId : itm.id,
              nowSection: itm.nowSection
            })
          }}>
          <Col span={6}>
            <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r overflow-hide" >
              <img src={itm.imgUrl} className="width-100" />
              <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
            </div>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={16}>
                <Row>
                  <Col className="text-align-left font-size-9 textclolor-white">{itm.nickName}</Col>
                  <Col className="text-align-left font-size-7 textcolor-aeaeae">{moment(itm.createTime).format('YYYY/MM/DD hh:mm')}</Col>
                </Row>
              </Col>
              <Col span={8} className="text-align-right">
                { itm.sign ? <span className="padding-all-5x font-size-7 textcolor-8EBF66 border-all border-color-8EBF66 border-radius-3">已打卡</span> :
                <span className="padding-all-5x textcolor-aeaeae border-radius-3 font-size-7 border-all border-color-d9d8d8">未打卡</span>}
              </Col>
              <Col className="" span={18}>
                <ProgressDrag percent={itm.percent*100} barColor={'linear-gradient(90deg, #93C770 40%, #3FEFEC 60%)'}
                 bgColor={'#333'} style={{height: '5px'}} barRoundStyle={{ 'width': '1.1rem','height': '1.1rem','background': '#333','border': '3px solid #4CF6C7'}} radius={20}
                onChange={(v)=>{ console.log(v);}} barWidthDisable enableDrag={false} />
              </Col>
              <Col className="text-align-right textcolor-8EBF66" span={6}>{itm.percent*100}%</Col>
            </Row>
          </Col>
        </Row>)
        }) : (<Row ><Col className="text-align-center font-size-8 textclolor-white line-height-4r" onClick={()=>{this.getMyClass(userId)}}>{loadText}</Col></Row>);

        const tabOptions = [{
          tabName: (<Row>
            <Col style={{'height': '1.5rem'}}>
            <div className={`icon small ${resourceKey ==='1' ? 'icon-working-a': 'icon-working'}`} />
            </Col>
            <Col className="font-size-8">正在进行</Col></Row>),
          keyword: '1', 
          headStyle: {height: '4rem'},
          content: (
            <Row justify="center">
              <Col className="margin-top-3">
                {myClassListDom}
              </Col>
             
            </Row>
          )
        },
        {
          tabName: (<Row>
            <Col style={{'height': '1.5rem'}}>
            <Icon iconName={'android-star'} size={'180%'} iconColor={resourceKey ==='3' ? '#8FBF66' :'#fff'} />
            </Col>
            <Col className="font-size-8">动态</Col></Row>),
            keyword: '3',
            content: (
            <Row>
              <Col span={8} className="padding-all">
                <ProgressCircle score={70} show={resourceKey ==='3'} innerText={`${70}%`} />
              </Col>
            </Row>
          )
        }]
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

                  <Col className="margin-top-1r text-align-center zindex-10" onClick={()=>{ this.checkUser()}}>
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r overflow-hide" >
                        <img src={userInfo.imgUrl} className="width-100" />
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10">
                    <span className="textclolor-white">{userInfo.nickName || '请登陆'}</span>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10">
                    <Row>
                      <Col span={8} className="text-align-center line-height-1r"><span className="font-size-7 textclolor-white">粉丝 173人</span></Col>
                      <Col span={8} className="text-align-center border-left border-right border-color-fff heighr-1 line-height-1r"><span className="font-size-7 textclolor-white">关注 26人</span></Col>
                      <Col span={8} className="text-align-center line-height-1r"><span className="font-size-7 textclolor-white">积分 290</span></Col>
                    </Row>
                  </Col>
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                  <div className="width-100 absolute-left zindex-6 heightp-100 bg bg1" />
                </Row>
                </TransAnimal>
              </Col>
             
              <Col className='padding-all bg-1B1B1B margin-top-3 border-radius-5f'>
                <Tab options={tabOptions} active={this.state.resourceKey} onChange={(v) => {
                  this.tabChange(v);
                }} />
              </Col>
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
