import Model from '../ORM/Model';

export default class AuthUser extends Model {
  /**
   * 基于 RBAC 模型
   * 默认路由鉴权中会使用 role
   */
  role = String;
}
