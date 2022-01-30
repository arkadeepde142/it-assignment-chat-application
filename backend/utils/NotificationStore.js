import EventEmitter from "node:events";

class NotificationStore extends EventEmitter {
  constructor() {
    super();
    this._idSocketMap = new Map();
    this._socketIdMap = new Map();
  }

  addSocket(id, socket) {
    this._idSocketMap.set(id, socket);
    this._socketIdMap.set(socket, id);
  }

  removeSocket(socket) {
    this._idSocketMap.delete(this._socketIdMap.get(socket));
    const res = this._socketIdMap.delete(socket);
    return res;
  }

  on(event, cb) {
    super.on(event, (id) => {
      if (this._idSocketMap.has(id)) {
        cb(this._idSocketMap.get(id));
      }
    });
  }

  off(event, cb) {
    super.off(event, (id) => {
      if (this._idSocketMap.has(id)) {
        cb(this._idSocketMap.get(key));
      }
    });
  }
}

const notifier = new NotificationStore();
export default notifier;
