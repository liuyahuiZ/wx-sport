import React , { Component }from 'react';
import { Components, utils } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import formate from '../utils/formate';
import { myClass, userRegistry, courseRatio, userInfo, userMoves, userMovesUpdate } from '../api/classes';
import { getToken } from '../api/index';

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
    Loade,
    Input
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
          resourceKey: '',
          userInfo: storage.getStorage('userInfo') ||{},
          myClassList:[],
          ratioList: [],
          loadText: '加载中',
          userId: storage.getStorage('userId') ||{},
          userInfoMation: {}
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
      this.getUserInfoMation();
      this.getUserMoves();
      // console.log('userId', userId);
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        status: nextProps.status
      })
      if(nextProps.status){
        this.getUserInfoMation();
        this.getUserMoves();
      }
    }

    getUserInfoMation(){
      let userId = storage.getStorage('userId');
      const self = this;
      userInfo({
        userId: userId
      }).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        if(res.code>0&&data){
          self.setState({
            userInfoMation: data
          })
        }
        // console.log(res);
      }).catch((e)=>{
        console.log(e);
      })
    }

    getUserMoves(){
      let userId = storage.getStorage('userId');
      const self = this;
      userMoves({
        userId: userId
      }).then((res)=>{
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        self.setState({
          userMoveArr: data
        })
        // console.log(res);
      }).catch((e)=>{
        console.log(e);
      })
    }
    
    getMyClass(userId){
      // console.log(userId);
      const self = this;
      Loade.show();
      myClass({userId: userId}).then((res)=>{
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

    getCourseRatio(userId){
      const self = this;
      Loade.show();
      courseRatio({userId: userId}).then((res)=>{
        Loade.hide();
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        if(data && data.length > 0){
          self.setState({
            ratioList: data
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

    getUserinfo(code){
      const self = this;
      getToken({code: code}).then((data)=>{
        // console.log(data);
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

    checkUser(){
      if (storage.getStorage('userInfo')) {
        // this.goLink('/PersonalFiles');
      } else {
        window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${reditUrl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
      }
    }

    submitClick(){
        Modal.alert({ title: 'warning',
          content: (<div> others
            <Buttons
              text="click to do a new Alert "
              type={'link'}
              onClick={() => {
                Modal.formConfirm({ title: 'Form Open',
                content: (
                  1231
                ),
                style: '',
                btnConStyle: 'center',
                btnSure: {
                  text: '确认',
                  type: 'link',
                  style: { 'height': '2rem'}
                },
                btnCancle: {
                  text: '取消',
                  type: 'link',
                  style: { 'height': '2rem'}
                }
              },
              (id, callback) => { callback(id); },
              (id, callback) => { callback(id); alert('this is cancle callback'); });
              }}
            />
          </div>),
          btn: {
            text: '确定',
            type: 'link',
            style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
          }, 
          type: 'large'
        },
        () => { console.log('nult callback'); });
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

    submitMove(){
      const { userMoveArr } = this.state;
      let userId = storage.getStorage('userId')
      if(userMoveArr.length>0){
        let newArr = []
        for(let i=0;i<userMoveArr.length;i++){
          newArr[i] = {
            "name": userMoveArr[i].text,
            "userId": userId,
            "weight": userMoveArr[i].value,
            "unit": userMoveArr[i].unit
          }
        }
        console.log(newArr);
        userMovesUpdate(newArr).then((res)=>{
          Loade.hide();
          if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
          if(res.code>0){
            Modal.alert({ title: '',
            content: (<Row><Col className="text-align-center">提交成功!</Col></Row>),
            btn: {
              text: '确定',
              type: 'link',
              style: { 'height': '2rem', 'margin': '0', 'borderRadius': '0'}
            }, 
            type: 'large'
            },
            () => {});
          }
        }).catch((err)=>{
          Loade.hide();
        })
      }
    }

    render() {
        const { status, myClassList, resourceKey, userInfo, loadText, ratioList, userId, userInfoMation, userMoveArr } = this.state;
        const self = this;
        const myClassListDom = myClassList.length > 0 ? myClassList.map((itm, idx)=>{
          return (<Row justify="center" className="margin-top-3" key={`${idx}-r`} onClick={()=>{
            self.goLink('/MyClassDetail', {
              courseId : itm.id,
              nowSection: itm.nowSection
            })
          }}>
          <Col className="text-align-center textclolor-white">{itm.name}</Col>
          <Col className="margin-top-3" span={15}>
            <Progress percent={itm.nowSection/itm.allSection * 100} barColor={'linear-gradient(90deg, #93C770 40%, #3FEFEC 60%)'} bgColor={'#333'} style={{height: '7px'}} radius={20} />
          </Col>
          <Col className="margin-top-3 text-align-center textcolor-8EBF66" span={6}>共{itm.allSection}天</Col>
        </Row>)
        }) : (<Row ><Col className="text-align-center font-size-small textclolor-white line-height-4r" onClick={()=>{this.getMyClass(userId)}}>{loadText}</Col></Row>);

        const ratioListDom = ratioList.length > 0 ? ratioList.map((itm, idx)=>{
          return (<Row className="images-33 padding-all-2 float-left"><Col key={`ratio-${idx}`}  className="padding-all" onClick={()=>{self.goLink('/TrainResult',{
            courseId : itm.id,
            nowSection: itm.nowSection
          })}}>
            <ProgressCircle score={parseFloat(itm.nowSection/itm.allSection  * 100).toFixed(2)} show={true} innerText={`${parseFloat(itm.nowSection/itm.allSection  * 100).toFixed(2)}%`} />
          </Col></Row>)
        }) : <Row><Col className="text-align-center font-size-small textclolor-white line-height-4r" onClick={()=>{this.getCourseRatio(userId)}}>{loadText}</Col></Row>;

        const tabOptions = [{
          tabName: (<Row>
            <Col style={{'height': '1.5rem'}}>
            <div className={`icon small ${resourceKey ==='1' ? 'icon-working-a': 'icon-working'}`} />
            </Col>
            <Col className="font-size-small">正在进行</Col></Row>),
          keyword: '1', 
          headStyle: {height: '4rem'},
          content: (
            <Row justify="center">
              <Col  className="margin-top-3">
                <Row justify="center" className="textclolor-666 font-size-small">
                  <Col span={6}>第一周</Col>
                  <Col span={2}>1</Col>
                  <Col span={2}>2</Col>
                  <Col span={2}><div className="bg-8EBF66 font-size-small textclolor-white small-round text-align-center border-radius-100">3</div></Col>
                  <Col span={2}>4</Col>
                  <Col span={2}>5</Col>
                  <Col span={2}>6</Col>
                  <Col span={2}>7</Col>
                </Row>
              </Col>
              <Col className="margin-top-3">
                {myClassListDom}
              </Col>
             
            </Row>
          )
        },
        {
          tabName: (<Row>
            <Col style={{'height': '1.5rem'}}>
            <div className={`icon ${resourceKey ==='2' ? 'icon-complate-a': 'icon-complate'}`} />
            </Col>
            <Col className="font-size-small">已完成</Col></Row>),
            keyword: '2',
            content: (
            <div>
              {ratioListDom}
            </div>
          )
        },
        {
          tabName: (<Row>
            <Col style={{'height': '1.5rem'}}>
            <Icon iconName={'android-star'} size={'180%'} iconColor={resourceKey ==='3' ? '#8FBF66' :'#fff'} />
            </Col>
            <Col className="font-size-small">动态</Col></Row>),
            keyword: '3',
            content: (
            <Row>
              <Col span={8} className="padding-all">
                <ProgressCircle score={70} show={resourceKey ==='3'} innerText={`${70}%`} />
              </Col>
            </Row>
          )
        }]

        const movesDom = userMoveArr && userMoveArr.length > 0 ? userMoveArr.map((itm,idx)=>{
          return (<div className="images-33 float-left padding-all" key={`${idx}-ke`}>
            <Row className="text-align-center">
            <Col className="textclolor-white">{itm.text}</Col>
            <Col className="border-radius-5f overflow-hide bg-262626 textcolor-9eea6a margin-top-2">
              <Row>
                <Col span={12}>
              <Input
                placeholder="请输入"
                value={itm.value}
                innerStyle={{"backgroundColor":"#262626","color":"#9eea6a","textAlign":"right","height":"1.5rem","border":"none"}}
                maxLength={100}
                type="number"
                onChange={(e,t,v)=>{
                    // self.setValue('weight',v)
                    let allMove = userMoveArr;
                    allMove[idx].value= v;
                    self.setState({
                      userMoveArr: allMove,
                      // upMoves: newMove
                    })
                }}
                /></Col>
                <Col span={12} className="font-size-small line-height-1f5 text-align-left padding-left-3">{itm.unit}</Col>
                </Row>
            </Col></Row>
          </div>)
        }) : <div className="text-align-center textclolor-white line-height-2r">暂无数据</div>;

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

                  <Col className="text-align-center zindex-10" onClick={()=>{ this.checkUser()}}>
                    <div className="middle-round-5 border-radius-round bg-gray display-inline-block line-height-4r overflow-hide" >
                      { userInfo&&userInfo.imgUrl ? <img src={userInfo.imgUrl} className="width-100" />  : <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />}
                    </div>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10">
                    <span className="textclolor-white">{userInfo.nickName || '请登陆'}</span>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10">
                    <Row >
                      <Col span={8} className="text-align-center line-height-2r"><span className="font-size-small textclolor-white">积分 0</span></Col>
                      <Col span={8} className="text-align-center heighr-2 line-height-2r"><span className="font-size-small textclolor-white">余额 {formate.formateMoney(userInfoMation.balance || 0)}元</span></Col>
                      <Col span={6} className="text-align-center line-height-1r">
                      <Buttons
                          text="充值"
                          type={'primary'}
                          size={'small'}
                          style={{backgroundColor: '#9eea6a', color:'#333'}}
                          onClick={()=>{
                            this.goLink('/Recharge')
                          }}/>
                      </Col>
                    </Row>
                  </Col>
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                  <div className="width-100 absolute-left zindex-6 heightp-100 bg bgx filter-3" />
                </Row>
                </TransAnimal>
              </Col>
              <Col className='padding-all bg-1B1B1B margin-top-3 border-radius-5f line-height-2r' onChange={()=>{self.goLink('/Registor')}}>
                  <Row>
                    <Col className="textclolor-white" span={6}>年龄</Col>
                    <Col className="textclolor-white" span={18}>{userInfoMation.age||0}岁</Col>
                  </Row>
                  <Row>
                    <Col className="textclolor-white" span={6}>身高</Col>
                    <Col className="textclolor-white" span={6}>{userInfoMation.height||0} 厘米</Col>
                    <Col className="textclolor-white" span={4}>体重</Col>
                    <Col className="textclolor-white" span={8}>{userInfoMation.weight||0} 公斤</Col>
                  </Row>
                
                  <Row>
                    <Col className="textclolor-white" span={6}>伤病历史</Col>
                    <Col className="textclolor-white" span={18}>{userInfoMation.injuryHistory||'无'}</Col>
                  </Row>
                  <Row>
                    <Col className="textclolor-white" span={6}>运动经验</Col>
                    <Col className="textclolor-white" span={18}>{userInfoMation.exercise||'无'}</Col>
                  </Row>
              </Col>
              <Col className=' bg-1B1B1B margin-top-3 border-radius-5f overflow-hide'>
              <Row className="bg-0D0D0D line-height-2r"><Col className="textclolor-white">测试动作成绩</Col></Row>
              <Row className="bg-1B1B1B">
                <Col>
                {movesDom}
                </Col>
              </Row>
                {/* <Tab options={tabOptions} active={this.state.resourceKey} onChange={(v) => {
                  this.tabChange(v);
                }} /> */}
              </Col>
              <Col className="margin-top-1r margin-bottom-1r">
                  <Row justify="center">
                    <Col span={14}>
                      <Buttons 
                        text="提交/更新"
                        type={'primary'}
                        size={'small'}
                        style={{backgroundColor: '#9eea6a', color:'#333'}}
                        onClick={()=>{
                          self.submitMove()
                        }}/>
                    </Col>
                  </Row>
                </Col>
              <Col span={24} className="bg-1B1B1B margin-top-2 border-radius-5f">
                <Item
                    leftContent={{text: (<Row><Col span={5}>
                        <Icon iconName={'clipboard '} size={'160%'} iconColor={'#fff'}  />
                        </Col><Col span={19}>服务条款</Col></Row>), style: {flex: '5'}, className: 'font-size-small textclolor-gray'}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-small textclolor-gray text-align-right'}}
                    onClick={()=>{
                      this.goLink('/ServiceTitle')
                    }}
                    showRight 
                    />
                <Item
                    leftContent={{text: (<Row><Col span={5}>
                        <Icon iconName={'compose  '} size={'160%'} iconColor={'#fff'}  />
                        </Col><Col span={19}>PAR-Q 问卷</Col></Row>), style: {flex: '5'}, className: 'font-size-small textclolor-gray'}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-small textclolor-gray text-align-right'}}
                    onClick={()=>{
                      this.goLink('/ParqPage')
                    }}
                    showRight 
                    />
                <Item
                    leftContent={{text: (<Row><Col span={5}>
                        <Icon iconName={'information-circled '} size={'160%'} iconColor={'#fff'}  />
                        </Col><Col span={19}>关于牛油果</Col></Row>), style: {flex: '5'}, className: 'font-size-small textclolor-gray'}} 
                    rightContent={{text: '', style: {flex: '5'}, className: 'font-size-small textclolor-gray text-align-right'}}
                    onClick={()=>{
                      this.goLink('/About')
                    }}
                    showRight />
              </Col>
            </Row>
          </section>
        );
    }
}
export default OcrDoc;
