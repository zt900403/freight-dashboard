/**
 * Created by ZT on 18/03/12.
 */
/**
 * Created by zhang on 18/03/08.
 */
import React from 'react'
import {Collapse, Col, Row} from 'antd';
import './style.css'


const Panel = Collapse.Panel

class FreightFormDetail extends React.PureComponent {
    add = (a, b) => {
        return parseFloat(a) + parseFloat(b)
    }

    multiply = (a, b) => {
        return parseFloat(a) * parseFloat(b)
    }

    render() {
        let data = this.props.data
        let authority = this.props.userinfo ? this.props.userinfo.authority : []
        let admin = authority.includes('ADMIN')
        let flagStep1 = admin || authority.includes('STEP1')
        let flagStep2 = admin || authority.includes('STEP2')
        let flagStep3 = admin || authority.includes('STEP3')
        let flagStep4 = admin || authority.includes('STEP4')
        return (
                <Collapse bordered={false} defaultActiveKey={['1','2','3','4','5','6']}>
                    <Panel header="基本录入" key="1">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>品名:</strong> {data.productName} </p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>采购贸易方:</strong> {data.purchaser}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>A采购单位:</strong> {data.APurchaseCompany} </p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>A采购量:</strong> {data.APurchaseAmount}</p> : ''}
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>出发地:</strong> {data.startPlace} </p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>A销售贸易方:</strong> {data.ASeller}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>A销售单位:</strong> {data.ASellerCompany} </p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>油井号:</strong> {data.oilWellNumber}</p> : ''}
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>A销售量:</strong> {data.ASellAmount} </p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>A销售量调整:</strong> {data.ASellAmountAdjust}</p> : ''}
                            </Col>
                            <Col span={6} >
                                {flagStep2 ? <p><strong>A销售量小计: </strong><span className="red">{this.add(data.ASellAmountAdjust, data.ASellAmount)}</span> </p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep3 ? <p><strong>A销售单价:</strong> {data.ASellUnitPrice}</p> : ''}
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {admin ? <p><strong>A销售合计: </strong><span className="red">{this.multiply(data.ASellUnitPrice,
                                    this.add(data.ASellAmountAdjust,data.ASellAmount))}</span></p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>A销售地:</strong> {data.ASellPlace}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>运费单价:</strong> {data.freightUnitPrice} </p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>运输费吨位调整:</strong> {data.freightPriceTonsAdjust}</p> : ''}
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>其他增项:</strong> {data.otherAddItem} </p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep3 ? <p><strong>A采购单价:</strong> {data.ABuyUnitPrice}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {admin ? <p><strong>A采购小计价: </strong><span className="red">{this.multiply(data.ABuyUnitPrice,data.APurchaseAmount)}</span></p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep3 ? <p><strong>A补贴运费: </strong> {data.AFreightSubsidy}</p> : ''}
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {flagStep3 ? <p><strong>A补贴运费小计: </strong><span className="red">{this.multiply(data.AFreightSubsidy,data.APurchaseAmount)}</span></p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>车辆费用支出合计:</strong> {data.carTotalCost}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {admin ? <p><strong>运费小计: </strong><span className="red">{this.add(this.multiply(data.freightUnitPrice, data.freightPriceTonsAdjust),
                                                                                                    data.otherAddItem)}</span></p>: ''}
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="留货车辆录入" key="2">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>留货车辆: </strong>{data.keepCarNumber}</p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>留货量:</strong> {data.keepProductAmount}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>留货车辆单价:</strong> {data.keepCarUnitPrice}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>留货车辆费用小计: </strong><span className="red">{this.multiply(data.keepCarUnitPrice, data.keepProductAmount)}</span></p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>剩余货物入库量: </strong>{data.remainingProductStoreAmount}</p>: ''}
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="多点采购信息录入" key="3">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>库补装量: </strong>{data.warehouseSupplement}</p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep3 ? <p><strong>B采购单价:</strong> {data.BBuyUnitPrice}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {admin ? <p><strong>B采购小计价: </strong><span className="red">{this.multiply(data.warehouseSupplement, data.BBuyUnitPrice)}</span></p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep3 ? <p><strong>B补贴运费: </strong>{data.BFreightSubsidy}</p>: ''}
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {admin ? <p><strong>B补贴运费小计: </strong><span className="red">{this.multiply(data.BFreightSubsidy, data.warehouseSupplement)}</span></p> : ''}
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="第三方贸易商信息录入" key="4">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>B销售贸易方: </strong>{data.BSeller}</p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>B销售单位:</strong> {data.BSellerCompany}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>B销售量:</strong> {data.BSellAmount}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>B销售调整量: </strong>{data.BSellAmountAdjust}</p>: ''}
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {admin ? <p><strong>B销售量小计: </strong><span className="red">{this.add(data.BSellAmountAdjust, data.BSellAmount)}</span></p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep3 ? <p><strong>B销售单价: </strong>{data.BSellUnitPrice}</p>: ''}
                            </Col>
                            <Col span={6}>
                                {admin ? <p><strong>B销售合计: </strong><span className="red">{this.multiply(data.BSellUnitPrice,
                                    this.add(data.BSellAmountAdjust,data.BSellAmount))}</span></p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>B销售地: </strong>{data.BSellPlace}</p>: ''}
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>C销售贸易方: </strong>{data.CSeller}</p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>C销售单位:</strong> {data.CSellerCompany}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>C销售量:</strong> {data.CSellAmount}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>C销售调整量: </strong>{data.CSellAmountAdjust}</p>: ''}
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {admin ? <p><strong>C销售量小计: </strong><span className="red">{this.add(data.CSellAmountAdjust, data.CSellAmount)}</span></p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep3 ? <p><strong>C销售单价: </strong>{data.CSellUnitPrice}</p>: ''}
                            </Col>
                            <Col span={6}>
                                {admin ? <p><strong>C销售合计: </strong><span className="red">{this.multiply(data.CSellUnitPrice,
                                    this.add(data.CSellAmountAdjust,data.CSellAmount))}</span></p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>C销售地: </strong>{data.CSellPlace}</p>: ''}
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>D销售贸易方: </strong>{data.DSeller}</p>: ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>D销售单位:</strong> {data.DSellerCompany}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>D销售量:</strong> {data.DSellAmount}</p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep2 ? <p><strong>D销售调整量: </strong>{data.DSellAmountAdjust}</p>: ''}
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                {admin ? <p><strong>D销售量小计: </strong><span className="red">{this.add(data.DSellAmountAdjust, data.DSellAmount)}</span></p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep3 ? <p><strong>D销售单价: </strong>{data.DSellUnitPrice}</p>: ''}
                            </Col>
                            <Col span={6}>
                                {admin ? <p><strong>D销售合计: </strong><span className="red">{this.multiply(data.DSellUnitPrice,
                                    this.add(data.DSellAmountAdjust,data.DSellAmount))}</span></p> : ''}
                            </Col>
                            <Col span={6}>
                                {flagStep1 ? <p><strong>D销售地: </strong>{data.DSellPlace}</p>: ''}
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="易制毒购入明细" key="5">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>品名: </strong>{data.poisonName}</p> : '' }
                            </Col>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>A数量: </strong>{data.poisonANumber}</p> : '' }
                            </Col>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>B数量: </strong>{data.poisonBNumber}</p> : '' }
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>购买证号: </strong>{data.poisonBuyLicense}</p> : '' }
                            </Col>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>运输证号: </strong>{data.poisonTransportLicense}</p> : '' }
                            </Col>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>运往地: </strong>{data.poisonDestination}</p> : '' }
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="易制毒销售明细" key="6">
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>购买单位: </strong>{data.sellPoisonBuyCompany}</p> : '' }
                            </Col>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>购买人: </strong>{data.sellPoisonBuyer}</p> : '' }
                            </Col>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>品名: </strong>{data.sellPoisonName}</p> : '' }
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>数量: </strong>{data.sellPoisonNumber}</p> : '' }
                            </Col>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>提货单位: </strong>{data.sellPoisonTakeCompany}</p> : '' }
                            </Col>
                            <Col span={6}>
                                { flagStep4 ? <p><strong>运往地: </strong>{data.sellPoisonDestination}</p> : '' }
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>
        )
    }
}

export default FreightFormDetail
