import React , { Component }from 'react';
import { Components } from 'neo';
import { hashHistory } from 'react-router';
import config from '../config/config';
import fetch from '../servise/fetch';
import { UrlSearch } from '../utils';
import { userMarkRate } from '../api/classes'

const {
    Buttons,
    Toaster,
    Row,
    Col,
    Icon,
    Modal,
    TransAnimal,
    LoadMore
  } = Components;
  
class OcrDoc extends Component {
    constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          status: this.props.status,
          productList: [],
          enableLoad: 'canload',
          currentPage: 1,
          pageSize: 5,
          markList: []
      };
    }
    componentDidMount(){
      this.getMark();
    }
    componentWillReceiveProps(nextProps){
      this.setState({
        status: nextProps.status
      })
    }
        
    goLink(link){
      if(link) {
        hashHistory.push(link);
      }
    }
    loadmore(){
      console.log('load...');
      const self = this;
      // 'loading' 'loaded' 'canload'
      self.setState({
        enableLoad: 'loading'
      })
      // self.getProduct();
    }
    getMark(){
      const self = this;
      userMarkRate({limit: 4}).then((res)=>{
        console.log(res);
        if(res.code<=0) { Toaster.toaster({ type: 'error', content: res.msg, time: 3000 }); return; }
        let data = res.result;
        self.setState({
          markList: data
        })
      }).catch((err)=>{
        Toaster.toaster({ type: 'error', content: err, time: 3000 });
      })
    }
    getProduct(){
      const {currentPage, pageSize, productList} = this.state;
      const self = this;
      let reqbody={
        "currentPage" : currentPage,
        "pageSize": pageSize,
      }
      fetch( config.ROOT_URL+ 'article/getArticle', { method: 'POST', data: reqbody})
      .then(data => {
          console.log(data)
          let page =  currentPage;
          let products = productList;
          let enableLoad = 'loading';
          if(data.respHead.code=='0000'){
            products = products.concat(data.respBody.list);
            if( products.length >= data.respBody.pageInfo.allCount ) {
              enableLoad = 'loaded'
            } else{
              page = currentPage + 1;
              enableLoad = 'canload';
            }
            self.setState({
              productList: products,
              enableLoad: enableLoad,
              currentPage: page
            })
          }else{

          }
      })
    }
    

    render() {
        const { status, markList, enableLoad } = this.state;
        const productListDom = markList.length > 0 ? markList.map((itm, idx)=>{
          return (
          <Row className={`padding-all padding-bottom-3 ${idx === (markList.length-1)? '' :'border-bottom border-color-333'}`}  key={`${idx}-itm`} onClick={()=>{
            this.handleClick(`/articleDetail?id=${itm._id}`)
        }}>
            <Col span={6} className="">
            <div className="middle-round overflow-hide border-radius-9r">
              <img className='middle-round'
              src={itm.img_url}
            />
            </div>
            </Col>
            <Col span={14} className="textclolor-white font-size-9 margin-top-3">
              <Row>
                <Col>{itm.nick_name}</Col>
                <Col className="font-size-7 textcolor-aeaeae">运动量{itm.sumMark}h</Col>
              </Row>
            </Col>
            <Col span={4} className="padding-all">
              <div className={`icon trophy ${idx < 3 ? `icon-trophy-${idx}`: ''}`} />
            </Col>
          </Row>)
        }) : <div />;
        return(
          <section className="bg-000 minheight-90">
          <LoadMore enableLoad={enableLoad} percent={20}  loadfunc={()=>{this.loadmore()}}>
            <div className="padding-all minheight-100">
            <Row >
              <Col span={24} className="overflow-hide">
              <TransAnimal >
                <Row justify="center" className="padding-all-1r bg-8EBF66 border-radius-5f overflow-hide relative">
                  <Col className="text-align-center margin-top-1r zindex-10">
                    <div className="middle-round border-radius-round bg-gray display-inline-block line-height-4r overflow-hide">
                        <img src={ markList.length>0&&markList[0].img_url} className="width-100" />
                        <Icon iconName={'social-octocat '} size={'180%'} iconColor={'#fff'} />
                    </div>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10">
                    <span className="textclolor-white">{markList.length>0&&markList[0].nick_name}占领了封面</span>
                  </Col>
                  <Col className="text-align-center margin-top-1r zindex-10" />
                  <div className="width-100 bg-000 opacity-2 heightp-100 absolute-left zindex-9 border-all border-color-000"></div>
                  <div className="width-100 absolute-left zindex-6 heightp-100 bg bg1" />
                </Row>
                </TransAnimal>
              </Col>
             
              {/* <Col span={24} className="bg-1B1B1B margin-top-2 border-radius-5f">
                <Row>
                  <Col span={12}></Col>
                  <Col span={12}></Col>
                </Row>
              </Col> */}
            </Row>
            <div className='bg-1B1B1B margin-top-2 border-radius-5f padding-all'>{productListDom}</div>
            </div>
            </LoadMore>
          </section>
        );
    }
}
export default OcrDoc;
