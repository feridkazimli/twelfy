"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceFetch = exports.ContentType = void 0;
const serviceList_1 = __importDefault(require("../configs/serviceList"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const xmlbuilder_1 = __importDefault(require("xmlbuilder"));
var ContentType;
(function (ContentType) {
    ContentType["JSON"] = "application/json";
    ContentType["XML"] = "application/xml";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
class ServiceFetch {
    static GET({ serviceKey, params = [], headers }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sf = new ServiceFetch();
            const tst = yield sf.setType('GET')
                .setUrl(serviceKey)
                .setParams(params)
                .setHeaders(Object.assign({}, headers))
                .run();
        });
    }
    static REQUEST({ serviceKey, type = 'POST', params = [], headers, body = '' }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sf = new ServiceFetch();
            const tst = yield sf.setType(type)
                .setHeaders(Object.assign({}, headers))
                .setUrl(serviceKey)
                .setParams(params)
                .setBody(body, headers === null || headers === void 0 ? void 0 : headers.contentType)
                .run();
        });
    }
    setBody(body, type = ContentType.JSON) {
        if (type === ContentType.JSON) {
            this.body = JSON.stringify(body);
        }
        else if (type === ContentType.XML) {
            this.body = xmlbuilder_1.default.create(body).end({ pretty: true });
        }
        return this;
    }
    setType(method) {
        this.method = method;
        return this;
    }
    setUrl(serviceKey) {
        this.link = serviceList_1.default[serviceKey];
        return this;
    }
    setParams(params) {
        this.link = params.reduce((prev, current) => {
            prev = prev.replace(`:${current.key}`, String(current.value));
            return prev;
        }, this.link);
        return this;
    }
    setHeaders({ contentType = ContentType.JSON }) {
        this.meta = {
            'Content-Type': contentType,
            'Accept': '*/*'
        };
        return this;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)(this.link, {
                method: this.method,
                headers: this.meta,
                body: this.body
            });
            const data = yield response.text();
        });
    }
}
exports.ServiceFetch = ServiceFetch;
