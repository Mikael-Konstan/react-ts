import type { ModalFuncProps } from 'antd';
import { Modal, message, notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// 弹层全局配置
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});
notification.config({
  top: 80,
  placement: 'topRight',
  duration: 2,
});

export class Toast {
  private static _loadModal: any;

  // 成功消息
  static success(msg: string, title?: string) {
    if (title) {
      Modal.success({
        mask: true,
        centered: true,
        content: msg,
        title,
      });
    } else {
      message.success(msg);
    }
  }

  // 错误消息
  static error(msg: string, title?: string) {
    if (title) {
      Modal.error({
        mask: true,
        centered: true,
        content: msg,
        title,
      });
    } else {
      message.error(msg);
    }
  }

  // 轻提示
  static tips(msg: string) {
    message.info(msg);
  }

  // 通知弹框
  static notice(options: {
    title: string;
    desc: string;
    type?: 'success' | 'error' | 'warning' | 'open' | 'info';
  }) {
    notification[options.type || 'info']({
      message: options.title,
      description: options.desc,
    });
  }

  // 开始加载动画
  static loading(title = '玩儿命获取...') {
    this.loaded();

    this._loadModal = Modal.info({
      transitionName: '',
      keyboard: false,
      mask: false,
      centered: true,
      icon: null,
      width: 'auto',
      modalRender: () => {
        const loadIcon = <LoadingOutlined style={{ fontSize: 30 }} />;
        return (
          <Spin className="load-spining" tip={title} indicator={loadIcon} />
        );
      },
    });
  }

  // 关闭加载动画
  static loaded() {
    if (this._loadModal) {
      this._loadModal.destroy();
      this._loadModal = undefined;
    }
  }

  // 消息框
  static alert(msg: string, options?: ModalFuncProps) {
    return Modal.info({
      mask: false,
      centered: true,
      ...options,
      content: msg,
    });
  }

  // 警告框
  static warning(msg: string, options?: ModalFuncProps) {
    return Modal.warning({
      mask: true,
      centered: true,
      ...options,
      content: msg,
    });
  }

  // 确认框
  static confirm(msg: string, options?: ModalFuncProps) {
    return Modal.confirm({
      mask: true,
      centered: true,
      ...options,
      content: msg,
    });
  }

  // 销毁全部弹框
  static closeAll() {
    message.destroy();
    Modal.destroyAll();
  }
}

export default Toast;
