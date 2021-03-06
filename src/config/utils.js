import { $axios } from "./server";

/*
 前端全局错误码
    60000 所调接口的前端的必填项为空
*/

// 发送邮件的接口
const sendAuthCode = ({ type, to }) => {
  return new Promise((resolve, reject) => {
    if (!type || !to) {
      reject({ status: 60000, data: '必填信息为空' });
    }
    $axios({
      url: '/bs/api/email',
      method: 'POST',
      data: {
        to: to,
        type: type
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};


// 修改用户头像接口
/**
 * @params {String} uid
 * @params {String} avatar 文件信息数据
 *
 * @return PromiseFn
 */
const changeUserAvatar = ({ uid, avatar }) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    $axios({
      url: '/bs/api/avatar',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        uid: uid,
      },
      data: formData
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 制定计划的接口
/**
 * @params obj
 *  obj.uid 用户id
 *  obj.planTime 预估开始时间
 *  obj.startDate 开始日期 2019-5-14
 *  obj.endDate 结束日期 2019-5-14 23:59:59
 *  obj.title 标题
 *  obj.con 内容
 */
const addPlan = (obj) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/plan',
      method: 'POST',
      data: obj
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};


/**
 * 查询一个人今日的计划
 * @params uid {String} 用户id 
 */
const searchPlanToday = (uid) => {
  return new Promise((resolve, reject) => {
    $axios({
      method: 'GET',
      url: '/bs/api/todayPlan',
      params: {
        uid: uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 查询一个人昨天的计划
 * @params uid {String} 用户id
 * 
 */
const yesterdayPlan = (uid) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/yesterdayPlan',
      params: {
        uid: uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};


/**
 * 改变计划状态
 * @params obj
 *  obj.uid {String} 用户名
 *  obj.pid {String} 计划 id
 *  obj.type {String} 开始 start 完成 success
 */
const putPlanStatus = (obj) => {
  return new Promise((resovle, reject) => {
    $axios({
      url: '/bs/api/plan',
      method: 'PUT',
      data: obj
    })
      .then(res => {
        resovle(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 查询用户信息 通过 uid
 */
const getUserInfoByUid = (uid) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/user',
      params: {
        uid: uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
};

/**
 * 查询用户的计划、关注、好友、粉丝信息
 */
const getUserPlanNumAndMore = (uid) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/myInfo',
      method: 'GET',
      noLoadding: true,
      params: {
        uid: uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 查询用户推送的所有的记录
 * @params obj {Object}
 *  obj.uid
 *  obj.page
 */
const getAppPushLogs = (obj) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/planPushMsg',
      method: 'GET',
      params: {
        uid: obj.uid,
        page: obj.page
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 通过 planId 拿取计划详情
 */
const getPlanDetail = (planId) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/planPushMsgDetail',
      method: 'GET',
      params: {
        pushId: planId
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 根据日期和用户id查询用户当日计划的完成情况
 * @params uid {String} 用户id
 * @params date {String} 2019-5-27
 */
const getPlanByDate = (uid, date) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/planByDate',
      method: 'GET',
      params: {
        uid,
        date,
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 查询用户发表的说说
 * @params page {Nubmer} 第几页
 */
const getSs = (page) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ss',
      method: 'GET',
      params: {
        page: page
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 用户登录之后查询首页
 * @params page {String} 页码
 * @params uid {String} 用户id
 * @params flag 是否允许loadding
 */
const getSsLogin = (page, uid, flag = false) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ssLogin',
      method: 'GET',
      params: {
        page: page,
        uid: uid
      },
      noLoadding: flag
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 用户对说说进行点赞
 * @params uid {String} 用户 uuid
 * @params ssid {String} 说说 uuid
 */
const postSsLike = (uid, ssid) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ssLike',
      method: 'POST',
      data: {
        uid: uid,
        ssId: ssid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 用户对说说取消点赞
 */
const deleteSsLike = (ssLikeId) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ssLike',
      method: 'DELETE',
      data: {
        ssLikeId: ssLikeId
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 发表说说
 * 以form表单的形式发送
 */
const postSs = (formData) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ss',
      method: 'POST',
      headers: { 'Content': 'multipart/form-data' },
      data: formData
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 获取一个人的计划记录
 */
const getAllPlan = (uid, page) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/plan',
      params: {
        uid: uid,
        page: page
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
};

/**
 * 获取一个用户的所有说说记录
 */
const getAllSs = (uid, page, flag = false) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ssListByUid',
      method: 'GET',
      params: {
        uid: uid,
        page: page
      },
      noLoadding: flag
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
};

/**
 * 获取用户正在进行的计划列表
 * @params uid {String} 用户id
 * @params page {String} 页码
 */
const onPlan = (uid, page) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/onPlan',
      method: 'GET',
      params: {
        uid: uid,
        page: page
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
};

/**
 * 获取用户已经完成的计划列表
 * @params uid {String} 用户id
 * @params page {String} 页码
 */
const achievePlan = (uid, page) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/achievePlan',
      method: 'GET',
      params: {
        uid: uid,
        page: page
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
};

/**
 * 获取用户还未开始的计划列表
 * @params uid {String} 用户id
 * @params page {String} 页码
 */
const offNoneDonePlan = (uid, page) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/noDone',
      method: 'GET',
      params: {
        uid: uid,
        page: page
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
};

/**
 * 获取用户 id
 */
const getPlanByPid = (pid) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/planDetailByPid',
      method: 'GET',
      params: {
        pid: pid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
};

/**
 * 修改计划
 */
const updatePlanById = (obj) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/plan1',
      method: 'PUT',
      data: obj
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * 请求周成长数据
 */
const getChartsData = (uid) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/chartsWeek',
      method: 'GET',
      params: {
        uid: uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * 通过关键字对说说进行搜索 未登录
 * @params search {String} 关键字
 * @params page {int} 页码
 */
const getSsSearchAll = (search, page) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ssSearchAll',
      method: 'GET',
      params: {
        page: page,
        search: search
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 通过关键字对说说进行搜索 已登录
 * @params obj 
 *  obj.search {String} 关键字
 *  obj.page {int} 页码
 *  obj.uid {String} 用户 id
 */
const getSsSearchAllLogin = (obj) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ssSearchAllLogin',
      method: 'GET',
      params: {
        page: obj.page,
        search: obj.search,
        uid: obj.uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 关键字搜索一个用户的说说
  * @params obj 
 *  obj.search {String} 关键字
 *  obj.page {int} 页码
 *  obj.uid {String} 用户 id
 */
const getSsSearchUser = (obj) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ssSearchUser',
      method: 'GET',
      params: {
        page: obj.page,
        search: obj.search,
        uid: obj.uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 获取说说的详情
 * @params ssId {String} 说说id
 */
const getSsDetailById = (ssId) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ssDetail',
      method: 'GET',
      params: {
        ssId: ssId
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 获取说说的评论
 * @params ssId {String} 说说 uid
 * @parmas page {Int} 页码
 * @params loadding {Boolean} 是否加载 loadding 框
 */
const getSsComments = (ssId, page, isloadding = false) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ssComment',
      method: 'GET',
      params: {
        ssId: ssId,
        page: page
      },
      noLoadding: isloadding
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 用户对说说进行评论
 * @params obj {Object} 
 *  obj.uid {String} 用户id
 *  obj.ssId {String} 说说id
 *  obj.content {String} 评论内容
 */
const userComSs = (obj) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/ssComment',
      method: 'POST',
      data: {
        uid: obj.uid,
        ssId: obj.ssId,
        content: obj.content
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
}


export {
  sendAuthCode, // 发送验证码
  changeUserAvatar, // 修改用户头像
  addPlan,  // 添加计划
  searchPlanToday, // 查询用户今日计划
  yesterdayPlan, // 查询用户昨日的计划
  putPlanStatus, // 修改计划状态
  getUserInfoByUid, // 获取用户信息
  getUserPlanNumAndMore, // 查询用户的计划、关注、好友、粉丝信息
  getAppPushLogs, // 查询用户的历史推送记录
  getPlanDetail, // 根据计划 id 获取计划详情
  getPlanByDate, // 根据日期和用户 id 查询用户当日计划的完成情况
  getSs, // 首页查看用户发表说说
  getSsLogin, // 登录之后查询说说的数量
  postSsLike, // 用户对说说进行点赞
  deleteSsLike, // 用户对说说取消点赞
  postSs, // 发表说说
  getAllPlan, // 查询一个用户的计划
  getAllSs, // 查询一个用户所有的说说
  onPlan, // 返回用户正在进行的计划
  achievePlan, // 已经完成的计划
  offNoneDonePlan, //还未开始的计划
  getPlanByPid, // 通过计划 id 查询计划
  updatePlanById, // 更新计划
  getChartsData, // 请求一段时间内的成长数据
  getSsSearchAll, // 通过关键字对说说进行搜索 未登录
  getSsSearchAllLogin, // 通过关键字对说说进行搜索 已登录
  getSsSearchUser, // 通过关键字搜索一个用户的一些说说
  getSsDetailById, // 通过说说id获取说说详情
  getSsComments, // 查看说说的评论
  userComSs, // 用户评论说说
};
