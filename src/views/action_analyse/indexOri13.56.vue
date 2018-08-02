<template>
  <div id="sa-main" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight: 300;color: #777C7C;font-size: 14px;line-height: 1.42857143;">
    <div id="bookmark-save-bar" class="fixed-top-bar">
      <div class="bookmark-tool-bar" data-id="">
        <div class="from-dashboard-back" style="display:none">
          <a data-method="from-dash-back"><!--{en}Back--><!--{cn}--><span class="icon-arrow-left"></span>
            返回<!--/{cn}--></a>
        </div>
        <div class="analyse-top">
          <div class="bookmark-title-container">
            <span class="bookmark-title" contenteditable="false">事件分析</span>
            <span class="icon-help" style="display: none;"></span>
          </div>
          <span class="sa-h-split" style="display:none"></span>
        </div>
      </div>
    </div>
    <div class="sa-report">

      <!--添加指标-->
      <div class="ops-item" style="border-bottom: none; background-color: #FDFDFE;">
        <span data-method="toggle-measures" style="vertical-align: sub; cursor: pointer;" class="icon-chart-collapse" aria-hidden="true"></span>
        <span style="color: #4B5764; font-weight: 400;">请添加指标</span>
      </div>
      <!--任意事件-->
      <section class="report-ops" id="report-ops">
        <div class="ops-item measures-container" id="measures-container">
          <div id="measure-line" class="measure-line">
            <div class="ops-item">
              <div class="measure-line-prefix">
                <span data-method="line-prefix">A</span>
              </div>
              <div id="custom-measure-line" style="display:none;">
                <input id="custom-measure-name" type="text" class="form-control" data-error-reg-exp="\S+"
                       data-error-text="必填" value="" placeholder="请输入指标名称">
                <span>显示</span>
                <div class="custom-measure-display-name">
                  <input id="measure-express" type="text" class="form-control" data-measure-express=""
                         data-expression-filters="">
                  <ul class="dropdown-menu" role="menu">
                  </ul>
                </div>
                <span class="icon-help" title="支持加、减、乘、除、常数、括号。事件名或属性名包含特殊字符时用英文双引号包起来。" data-placement="top" data-container="body"></span>
                <div class="selector">
                  <button id="custom-measure-format" class="btn-selector dropdown-toggle" type="button"
                          data-toggle="dropdown" data-value="%2p">百分比
                  </button>
                  <ul class="dropdown-menu" role="menu">
                    <li><a data-value="%2p">百分比</a></li>
                    <li><a data-value="%2f">两位小数</a></li>
                    <li><a data-value="%d">取整</a></li>
                  </ul>
                </div>

                <button data-method="measure-save" type="button" class="btn-icon btn-link" style="display:none;">
                  <span class="icon-save" data-toggle="tooltip" data-container="body" title=""
                        data-original-title="点击保存后发起查询"></span>
                </button>
                <button data-method="measure-edit" type="button" class="btn-icon btn-link">
                  <span class="icon-edit" data-toggle="tooltip" data-container="body" title=""
                        data-original-title="点击进行编辑"></span>
                </button>
                <button data-method="custom-measure-remove" type="button" class="btn-link event-measure-remove">
                  <span class="icon-remove"></span>
                </button>
              </div>
              <div id="normal-measure-line">
                <div id="select-event" class="selector select-event">
                  <button class="btn-selector multiselect" data-toggle="dropdown">
                    <span class="icon-event"></span><span class="multiselect-selected-text">任意事件</span>
                  </button>
                </div>
                <span class="mg-8">的</span>
                <div id="select-measures" class="select-measures">
                  <div data-method="aggregator-select" class="aggregator-select">
                    <div class="selector dropdown">
                      <button data-toggle="dropdown" class="btn-selector dropdown-toggle" data-target="#">
    <span class="selected" data-event-name="$Anything" data-aggregator="general" data-field="">
    总次数</span>
                      </button>
                      <ul class="dropdown-menu">
                        <li class="active"><a data-aggregator="general" data-field="">总次数</a></li>
                        <li><a data-aggregator="unique" data-field="">触发用户数</a></li>
                        <li><a data-aggregator="average" data-field="">人均次数</a></li>
                        <li class="divider"></li>
                        <li class="dropdown-submenu">
                          <a tabindex="-1">屏幕宽度</a>
                          <ul class="dropdown-menu">
                            <li><a data-cname="屏幕宽度" data-field="event.$Anything.$screen_width"
                                   data-aggregator="SUM">总和</a></li>
                            <li><a data-cname="屏幕宽度" data-field="event.$Anything.$screen_width"
                                   data-aggregator="AVG">均值</a></li>
                            <li><a data-cname="屏幕宽度" data-field="event.$Anything.$screen_width" data-aggregator="MAX">最大值</a>
                            </li>
                            <li><a data-cname="屏幕宽度" data-field="event.$Anything.$screen_width" data-aggregator="MIN">最小值</a>
                            </li>
                            <li><a data-cname="屏幕宽度" data-field="event.$Anything.$screen_width"
                                   data-aggregator="uniqAvg">人均值</a></li>
                            <li><a data-cname="屏幕宽度" data-field="event.$Anything.$screen_width"
                                   data-aggregator="uniqCount">去重数</a></li>
                          </ul>
                        </li>
                        <li class="dropdown-submenu">
                          <a tabindex="-1">屏幕高度</a>
                          <ul class="dropdown-menu">
                            <li><a data-cname="屏幕高度" data-field="event.$Anything.$screen_height" data-aggregator="SUM">总和</a>
                            </li>
                            <li><a data-cname="屏幕高度" data-field="event.$Anything.$screen_height" data-aggregator="AVG">均值</a>
                            </li>
                            <li><a data-cname="屏幕高度" data-field="event.$Anything.$screen_height" data-aggregator="MAX">最大值</a>
                            </li>
                            <li><a data-cname="屏幕高度" data-field="event.$Anything.$screen_height" data-aggregator="MIN">最小值</a>
                            </li>
                            <li><a data-cname="屏幕高度" data-field="event.$Anything.$screen_height"
                                   data-aggregator="uniqAvg">人均值</a></li>
                            <li><a data-cname="屏幕高度" data-field="event.$Anything.$screen_height"
                                   data-aggregator="uniqCount">去重数</a></li>
                          </ul>
                        </li>
                        <li class="divider"></li>
                        <li>
                          <a data-method="more">
                            更多...<!--{en}More...-->
                            <span class="icon-expand-down pull-right"></span>
                          </a>
                        </li>
                        <li style="display:none;" class="dropdown-submenu">
                          <a tabindex="-1">Distinct ID</a>
                          <ul class="dropdown-menu">
                            <li>
                              <a data-cname="Distinct ID" data-field="event.$Anything.$distinct_id"
                                 data-aggregator="uniqCount">去重数</a>
                            </li>
                          </ul>
                        </li>
                        <li style="display:none;" class="dropdown-submenu">
                          <a tabindex="-1">IP</a>
                          <ul class="dropdown-menu">
                            <li>
                              <a data-cname="IP" data-field="event.$Anything.$ip" data-aggregator="uniqCount">去重数</a>
                            </li>
                          </ul>
                        </li>
                        <li style="display:none;" class="dropdown-submenu">
                          <a tabindex="-1">国家</a>
                          <ul class="dropdown-menu">
                            <li>
                              <a data-cname="国家" data-field="event.$Anything.$country"
                                 data-aggregator="uniqCount">去重数</a>
                            </li>
                          </ul>
                        </li>
                        <li style="display:none;" class="dropdown-submenu">
                          <a tabindex="-1">操作系统</a>
                          <ul class="dropdown-menu">
                            <li>
                              <a data-cname="操作系统" data-field="event.$Anything.$os" data-aggregator="uniqCount">去重数</a>
                            </li>
                          </ul>
                        </li>
                        <li style="display:none;" class="dropdown-submenu">
                          <a tabindex="-1">是否首日访问</a>
                          <ul class="dropdown-menu">
                            <li>
                              <a data-cname="是否首日访问" data-field="event.$Anything.$is_first_day"
                                 data-aggregator="uniqCount">去重数</a>
                            </li>
                          </ul>
                        </li>
                        <li style="display:none;" class="dropdown-submenu">
                          <a tabindex="-1">浏览器</a>
                          <ul class="dropdown-menu">
                            <li>
                              <a data-cname="浏览器" data-field="event.$Anything.$browser"
                                 data-aggregator="uniqCount">去重数</a>
                            </li>
                          </ul>
                        </li>
                        <li style="display:none;" class="dropdown-submenu">
                          <a tabindex="-1">省份</a>
                          <ul class="dropdown-menu">
                            <li>
                              <a data-cname="省份" data-field="event.$Anything.$province"
                                 data-aggregator="uniqCount">去重数</a>
                            </li>
                          </ul>
                        </li>
                        <li style="display:none;" class="dropdown-submenu">
                          <a tabindex="-1">城市</a>
                          <ul class="dropdown-menu">
                            <li>
                              <a data-cname="城市" data-field="event.$Anything.$city" data-aggregator="uniqCount">去重数</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <button data-method="measure-remove" type="button" class="btn-link event-measure-remove">
                      <span class="icon-remove"></span>
                    </button>
                    <span data-method="suffix" class="mg-8" style="display: none;">和</span>
                  </div>
                </div>
              </div>
              <div style="float: right;" class="measure-button">
                <button data-method="switch-measure" type="button" class="btn btn-icon btn-link">
        <span class="icon-addiction" data-toggle="tooltip" data-placement="right" data-container="body" title=""
              data-original-title="切换自定义指标">
        </span>
                </button>
                <button data-method="add-filter" type="button" class="btn btn-link">
                  <span class="icon-add"></span><span>筛选条件</span>
                </button>
              </div>
            </div>
            <div class="ops-item" data-container="single-filter"></div>
          </div>
          <button data-method="event-add" type="button" class="event-measure-add-new" data-toggle="tooltip"
                  data-placement="right" data-container="body" title="" data-original-title="添加不同事件的指标">
            <span class="icon-new"></span>
          </button>
        </div>
        <div id="segmentation-group-hold-place" class="ops-item">
          <div class="group-control-item">
            按
            <div class="selector property">
              <select class="btn-selector" style="display: none;">
                <option value="" data-type="" data-dict="">总体</option>
                <optgroup label="事件属性" data-icon="icon-event-property">
                  <option value="event.$Anything.$distinct_id" data-type="string" data-dict="false">Distinct ID</option>
                  <option value="event.$Anything.$ip" data-type="string" data-dict="false">IP</option>
                  <option value="event.$Anything.$country" data-type="string" data-dict="false">国家</option>
                  <option value="event.$Anything.$screen_width" data-type="number" data-dict="false">屏幕宽度</option>
                  <option value="event.$Anything.$screen_height" data-type="number" data-dict="false">屏幕高度</option>
                  <option value="event.$Anything.$os" data-type="string" data-dict="false">操作系统</option>
                  <option value="event.$Anything.$is_first_day" data-type="bool" data-dict="false">是否首日访问</option>
                  <option value="event.$Anything.$browser" data-type="string" data-dict="false">浏览器</option>
                  <option value="event.$Anything.$user_id" data-type="string" data-dict="true">用户 ID</option>
                  <option value="event.$Anything.$province" data-type="string" data-dict="false">省份</option>
                  <option value="event.$Anything.$city" data-type="string" data-dict="false">城市</option>
                </optgroup>
                <optgroup label="用户属性" data-icon="icon-user-property">
                  <option value="user.age" data-type="string" data-dict="false">age</option>
                  <option value="user.gender" data-type="string" data-dict="false">gender</option>
                  <option value="user.jgiOSId" data-type="string" data-dict="false">jgiOSId</option>
                  <option value="user.userName" data-type="string" data-dict="false">userName</option>
                  <option value="user.xmiOSId" data-type="string" data-dict="false">xmiOSId</option>
                  <option value="user.UsageRate" data-type="number" data-dict="false">使用率</option>
                  <option value="user.UsedQuota" data-type="number" data-dict="false">使用额度</option>
                  <option value="user.LoanNumber" data-type="number" data-dict="false">借款总次数</option>
                  <option value="user.LoanAumont" data-type="number" data-dict="false">借款总金额</option>
                  <option value="user.LoanAmount" data-type="number" data-dict="false">借款金额</option>
                  <option value="user.Yearofbirth" data-type="string" data-dict="false">出生年份</option>
                  <option value="user.ResidualInterest" data-type="number" data-dict="false">剩余利息</option>
                  <option value="user.ResidualCorpus" data-type="number" data-dict="false">剩余本金</option>
                  <option value="user.SurplusQuota" data-type="number" data-dict="false">剩余额度</option>
                  <option value="user.$name" data-type="string" data-dict="false">姓名</option>
                  <option value="user.certificationTime" data-type="datetime" data-dict="false">实名认证时间</option>
                  <option value="user.$utm_medium" data-type="string" data-dict="false">广告系列媒介</option>
                  <option value="user.$utm_source" data-type="string" data-dict="false">广告系列来源</option>
                  <option value="user.Gender" data-type="string" data-dict="false">性别</option>
                  <option value="user.Phone" data-type="string" data-dict="false">手机号</option>
                  <option value="user.Credit_line" data-type="number" data-dict="false">授信额度</option>
                  <option value="user.IsLoanSuccess" data-type="bool" data-dict="false">是否成功借款</option>
                  <option value="user.IsApply" data-type="bool" data-dict="false">是否进件</option>
                  <option value="user.latestFaceRecognitionTime" data-type="datetime" data-dict="false">最近一次人脸识别时间
                  </option>
                  <option value="user.$signup_time" data-type="datetime" data-dict="false">注册时间</option>
                  <option value="user.Registeredsources" data-type="string" data-dict="false">注册来源</option>
                  <option value="user.$first_browser_language" data-type="string" data-dict="false">浏览器语言</option>
                  <option value="user.$utm_matching_type" data-type="string" data-dict="false">渠道追踪匹配模式</option>
                  <option value="user.$id" data-type="string" data-dict="true">用户 ID</option>
                  <option value="user.$province" data-type="string" data-dict="false">省份</option>
                  <option value="user.$city" data-type="string" data-dict="false">城市</option>
                  <option value="user.IDCardNo" data-type="string" data-dict="false">身份证号</option>
                  <option value="user.RepaymentStatus" data-type="string" data-dict="false">还款状态</option>
                  <option value="user.OverdueDays" data-type="number" data-dict="false">逾期天数</option>
                  <option value="user.overdueNumber" data-type="number" data-dict="false">逾期总次数</option>
                  <option value="user.overdueAumont" data-type="number" data-dict="false">逾期总金额</option>
                  <option value="user.BankName" data-type="string" data-dict="false">银行名称</option>
                  <option value="user.FirstFaceRecognitionTime" data-type="datetime" data-dict="false">首次人脸识别时间</option>
                  <option value="user.$first_referrer" data-type="string" data-dict="false">首次前向地址</option>
                  <option value="user.$first_referrer_host" data-type="string" data-dict="false">首次前向域名</option>
                  <option value="user.FirstWithdrawCashTime" data-type="datetime" data-dict="false">首次提现时间</option>
                  <option value="user.$first_search_keyword" data-type="string" data-dict="false">首次搜索引擎关键词</option>
                  <option value="user.$first_traffic_source_type" data-type="string" data-dict="false">首次流量来源类型</option>
                  <option value="user.$first_browser_charset" data-type="string" data-dict="false">首次浏览器字符类型</option>
                  <option value="user.$first_visit_time" data-type="datetime" data-dict="false">首次访问时间</option>
                  <option value="user.FirstEntryTime" data-type="datetime" data-dict="false">首次进件时间</option>
                </optgroup>
                <optgroup label="用户分群" data-icon="icon-profiling">
                  <option value="user.fenqun" data-type="bool" data-dict="false">11月新客申请</option>
                  <option value="user.liushiyonghu" data-type="bool" data-dict="false">流失用户</option>
                  <option value="user.test" data-type="bool" data-dict="false">绑卡流失用户</option>
                </optgroup>
              </select>
              <div>
                <button class="btn-selector multiselect" data-toggle="dropdown"><span
                  class="icon-event-property"></span><span class="multiselect-selected-text">国家</span></button>
                <ul class="multiselect-container dropdown-menu"
                    style="max-height: 490px; overflow-y: auto; overflow-x: hidden;">
                  <li class="multiselect-item filter" value="0"><input class="multiselect-search" type="text"
                                                                       placeholder="搜索"></li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="" data-dict=""
                                                                                      data-type=""
                                                                                      style="display: none;"> 总体</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item multiselect-group"><span
                    class="icon-event-property"></span><label>事件属性</label></li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$distinct_id"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> Distinct
                      ID</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$ip"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> IP</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item active">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$country"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 国家</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$screen_width"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      屏幕宽度</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$screen_height"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      屏幕高度</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$os"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      操作系统</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$is_first_day"
                                                                                      data-dict="false" data-type="bool"
                                                                                      style="display: none;">
                      是否首日访问</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$browser"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      浏览器</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$user_id"
                                                                                      data-dict="true"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 用户
                      ID</label><span class="icon-data-type-dict"></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$province"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 省份</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="event.$Anything.$city"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 城市</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item multiselect-group"><span
                    class="icon-user-property"></span><label>用户属性</label></li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.age"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      age</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.gender"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      gender</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.jgiOSId"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      jgiOSId</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.userName"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      userName</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.xmiOSId"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      xmiOSId</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.UsageRate"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      使用率</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.UsedQuota"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      使用额度</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.LoanNumber"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      借款总次数</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.LoanAumont"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      借款总金额</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.LoanAmount"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      借款金额</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.Yearofbirth"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      出生年份</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.ResidualInterest"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      剩余利息</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.ResidualCorpus"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      剩余本金</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.SurplusQuota"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      剩余额度</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.$name"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 姓名</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.certificationTime"
                                                                                      data-dict="false"
                                                                                      data-type="datetime"
                                                                                      style="display: none;">
                      实名认证时间</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$utm_medium"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      广告系列媒介</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$utm_source"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      广告系列来源</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.Gender"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 性别</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.Phone"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      手机号</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.Credit_line"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      授信额度</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.IsLoanSuccess"
                                                                                      data-dict="false" data-type="bool"
                                                                                      style="display: none;">
                      是否成功借款</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.IsApply"
                                                                                      data-dict="false" data-type="bool"
                                                                                      style="display: none;">
                      是否进件</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.latestFaceRecognitionTime"
                                                                                      data-dict="false"
                                                                                      data-type="datetime"
                                                                                      style="display: none;"> 最近一次人脸识别时间</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$signup_time"
                                                                                      data-dict="false"
                                                                                      data-type="datetime"
                                                                                      style="display: none;">
                      注册时间</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.Registeredsources"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      注册来源</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$first_browser_language"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      浏览器语言</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$utm_matching_type"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      渠道追踪匹配模式</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.$id"
                                                                                      data-dict="true"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 用户
                      ID</label><span class="icon-data-type-dict"></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$province"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 省份</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.$city"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 城市</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.IDCardNo"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      身份证号</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.RepaymentStatus"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      还款状态</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.OverdueDays"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      逾期天数</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.overdueNumber"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      逾期总次数</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.overdueAumont"
                                                                                      data-dict="false"
                                                                                      data-type="number"
                                                                                      style="display: none;">
                      逾期总金额</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.BankName"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      银行名称</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.FirstFaceRecognitionTime"
                                                                                      data-dict="false"
                                                                                      data-type="datetime"
                                                                                      style="display: none;">
                      首次人脸识别时间</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$first_referrer"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      首次前向地址</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$first_referrer_host"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      首次前向域名</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.FirstWithdrawCashTime"
                                                                                      data-dict="false"
                                                                                      data-type="datetime"
                                                                                      style="display: none;">
                      首次提现时间</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$first_search_keyword"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 首次搜索引擎关键词</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$first_traffic_source_type"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;">
                      首次流量来源类型</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$first_browser_charset"
                                                                                      data-dict="false"
                                                                                      data-type="string"
                                                                                      style="display: none;"> 首次浏览器字符类型</label><span
                      class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.$first_visit_time"
                                                                                      data-dict="false"
                                                                                      data-type="datetime"
                                                                                      style="display: none;">
                      首次访问时间</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.FirstEntryTime"
                                                                                      data-dict="false"
                                                                                      data-type="datetime"
                                                                                      style="display: none;">
                      首次进件时间</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item multiselect-group"><span class="icon-profiling"></span><label>用户分群</label>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.fenqun"
                                                                                      data-dict="false" data-type="bool"
                                                                                      style="display: none;">
                      11月新客申请</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio"
                                                                                      value="user.liushiyonghu"
                                                                                      data-dict="false" data-type="bool"
                                                                                      style="display: none;">
                      流失用户</label><span class=""></span></a>
                  </li>
                  <li class="multiselect-item">
                    <a tabindex="0"><span class=""></span><label class="radio"><input type="radio" value="user.test"
                                                                                      data-dict="false" data-type="bool"
                                                                                      style="display: none;">
                      绑卡流失用户</label><span class=""></span></a>
                  </li>
                </ul>
              </div>
            </div>
            <span data-method="bucket" data-bucket-value="" class="icon-setting report-bucket btn-icon btn-link"
                  data-toggle="tooltip" data-placement="top" title="" data-bucket-type="" style="display: none;"
                  data-original-title="选择如何分组"></span>
            查看
            <button data-method="by-remove" type="button" class="btn-icon btn-link">
              <span data-method="by-remove" class="icon-remove"></span>
            </button>
            <button data-method="by-add" type="button" class="btn-icon btn-link">
              <span data-method="by-add" class="icon-add"></span>
            </button>
          </div>
        </div>
        <div id="filter-hold-place" class="ops-item"></div>
        <div class="ops-item">
          <button id="btnAddFilter" type="button" class="btn btn-link">
            <span class="icon-add"></span><span>筛选条件</span>
          </button>
          <div class="query-button-wrap">
            <button id="btn-query" type="button" class="btn btn-primary" style="display:none;">查询</button>
          </div>
        </div>
      </section>

      <!--任意事件总次数-->
      <section class="report-chart segmentation-chart">
        <header>
          <div class="report-date-picker-wrap">
            <span class="icon-date-picker"></span>
            <input id="inputDate" type="text" class="form-control" readonly="readonly" data-placement="top"
                   data-container="body" title="" data-calendar-status-refresh-time="1533040261"
                   data-original-title="事件发生的时间范围">
          </div>
          <div class="report-date-picker-tip">
            <span>对比时间:</span>
            <div class="content">2016-11-13 至 2016-11-15</div>
          </div>
          <div class="report-name-wrap">
            <h4 id="reportName" class="report-name">任意事件的总次数</h4>
          </div>
          <div class="report-config btn-group">
            <div class="dropdown chart-config">
              <button id="btn-chart-config" type="button" class="btn-selector dropdown-toggle">显示设置</button>
              <div class="config" style="display: none;">
                <div class="range-label-time sa-tab clearfix">
                  <div data-for="#chart-measure-selector" class="selected" data-index="0">显示指标</div>
                  <div data-for="#chart-by-selector" data-index="1">显示分组</div>
                </div>
                <ul id="chart-measure-selector">
                </ul>
                <ul id="chart-by-selector"></ul>
              </div>
            </div>
            <div class="dropdown">
              <button id="charts-type" type="button" class="btn-selector dropdown-toggle" data-toggle="dropdown"
                      data-value="line">线图
              </button>
              <ul class="dropdown-menu pull-right" role="menu">
                <li class="active"><a data-value="line"><span data-value="line"
                                                              class="icon-line-chart"></span><span>线图</span></a></li>
                <li><a data-value="column"><span data-value="column" class="icon-bar-chart"></span><span>柱图</span></a>
                </li>
                <li><a data-value="pie"><span data-value="pie" class="icon-pie-chart"></span><span>饼图</span></a></li>
                <li><a data-value="stack"><span data-value="stack" class="icon-stack-chart"></span><span>累积</span></a>
                </li>
              </ul>
            </div>
            <div class="dropdown">
              <button id="input-unit" type="button" class="btn-selector dropdown-toggle" data-toggle="dropdown"
                      data-value="day">
                <span id="inputUnit" class="selected" data-value="day">按天</span>
              </button>
              <ul class="dropdown-menu pull-right" role="menu">
                <li><a data-value="minute">按分钟</a></li>
                <li><a data-value="hour">按小时</a></li>
                <li class="active"><a data-value="day">按天</a></li>
                <li><a data-value="week">按周</a></li>
                <li><a data-value="month">按月</a></li>
              </ul>
            </div>
          </div>
        </header>
        <div class="report-no-data" style="display:none;">
          <div class="report-no-data-msg">
            <h5>没有查找到数据</h5>
            <p>请尝试调整时间段或筛选条件</p>
          </div>
        </div>
      </section>

      <!--图表模块-->
      <section id="chartsContainer" class="report-chart"
               style="padding-bottom: 20px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;"
               _echarts_instance_="ec_1533040258316">
        <div style="position: relative; overflow: hidden; width: 1094px; height: 380px; cursor: default;">
          <canvas width="1094" height="380" data-zr-dom-id="zr_0"
                  style="position: absolute; left: 0px; top: 0px; width: 1094px; height: 380px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></canvas>
        </div>
        <div
          style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1); background-color: rgba(255, 255, 255, 0.9); border-width: 1px; border-color: rgb(51, 152, 219); border-radius: 4px; color: rgb(46, 56, 74); font: 300 12px/18px &quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif; padding: 5px; left: 254.1px; top: 290.043px;">
          <div class="sa-echarts-tooltip-triangle top"></div>
          <div class="sa-tooltip">6-4(一)<br>局域网：1,254 次</div>
        </div>
      </section>

      <!--间隔面板-->
      <div class="page-part-h-split" style=""></div>
      <div class="page-data-truncated" style="display: none;"></div>

      <!--导出-->
      <div class="table-config clearfix" style="display: block;">
        <div class="input-icon-wrap pull-left">
          <span data-method="search" class="icon-search" style="display: none;"></span>
          <input data-method="search" data-last="" data-timeout="" type="text" class="form-control" placeholder="按分组筛选"
                 style="width:200px;display:none;">
          <label data-method="rollup" class="sa-checkbox" style="display: none;">
            <input id="chk-rollup-display" type="checkbox" data-method="checkbox">
            <label for="chk-rollup-display"></label>
            <span>显示合计</span>
          </label>
        </div>
        <div class="btn-group pull-right" role="group" aria-label="...">
          <button data-method="export" type="button" style="margin-left: 10px; width: 76px;"
                  class="btn btn-default btn-icon" data-placement="bottom" data-toggle="tooltip"
                  data-original-title="导出表格中数据 csv">
            <span class="icon-export" style="vertical-align: sub;"></span>
            <span style="display: inline-block;line-height: 20px;">导出</span>
          </button>
        </div>
        <div class="btn-group pull-right" role="group" aria-label="...">
          <button data-method="transfer" type="button" class="btn btn-default btn-icon">
            <span class="icon-reverse"></span>
          </button>
          <button data-method="percent" type="button" class="btn btn-default btn-icon">
            <span class="icon-percentage" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      <!--表格-->
      <section id="table-container" class="report-chart" style="">
        <div id="table-tab" style="display:none;" class="sa-tab tab-table">
          <a data-method="switch-left" class="active"></a>
          <a data-method="switch-right"></a>
          <a data-method="switch-ratio" style="display:none;">时间对比变化率</a>
        </div>
        <div class="table-wrap">
          <table class="table-normal table-segmentation">
            <thead>
            <tr>
              <th data-series-index="" data-method="sort" data-sort="" class="


          text-col">

                国家<span class="icon-ascending-order"></span><span class="icon-descending-order"></span>

              </th>
              <th data-series-index="" data-method="sort" data-sort="descend" class="

          rollup-col
          ">
                <span class="icon-ascending-order"></span><span class="icon-descending-order"></span>合计


                <span data-method="hideDateCol" class="icon-chart-collapse" aria-hidden="true"></span>
              </th>
              <th data-series-index="1" data-method="sort" data-sort="" class="
          date-col

          ">
                <span class="icon-ascending-order"></span><span class="icon-descending-order"></span>6-5(二)


              </th>
              <th data-series-index="0" data-method="sort" data-sort="" class="
          date-col

          ">
                <span class="icon-ascending-order"></span><span class="icon-descending-order"></span>6-4(一)


              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th class="
         ">
                中国
              </th>
              <td class="
         rollup-col">
                49,119
              </td>
              <td class="
        date-col ">
                24,751
                <span class="ratio ratio-pos hide">1.6%</span>
              </td>
              <td class="
        date-col ">
                24,368
              </td>
            </tr>
            <tr>
              <th class="
         ">
                美国
              </th>
              <td class="
         rollup-col">
                16,291
              </td>
              <td class="
        date-col ">
                8,108
                <span class="ratio ratio-neg hide">0.9%</span>
              </td>
              <td class="
        date-col ">
                8,183
              </td>
            </tr>
            <tr>
              <th class="
         ">
                韩国
              </th>
              <td class="
         rollup-col">
                8,534
              </td>
              <td class="
        date-col ">
                4,153
                <span class="ratio ratio-neg hide">5.2%</span>
              </td>
              <td class="
        date-col ">
                4,381
              </td>
            </tr>
            <tr>
              <th class="
         ">
                日本
              </th>
              <td class="
         rollup-col">
                8,132
              </td>
              <td class="
        date-col ">
                4,025
                <span class="ratio ratio-neg hide">2%</span>
              </td>
              <td class="
        date-col ">
                4,107
              </td>
            </tr>
            <tr>
              <th class="
         ">
                局域网
              </th>
              <td class="
         rollup-col">
                2,506
              </td>
              <td class="
        date-col ">
                1,252
                <span class="ratio ratio-neg hide">0.2%</span>
              </td>
              <td class="
        date-col ">
                1,254
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div id="table-pagination"></div>
      </section>

      <div class="modal fade" id="config-axis-container" tabindex="-1" role="dialog" aria-labelledby=""
           aria-hidden="true"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'test', data() {
      return {msg: 'action analyse'}
    }
  }
</script>

<style scoped>
  @import "../../styles/components.css";
  @import "../../styles/compnent.index.css";
  @import "../../styles/bootstrap.min.css";
</style>
