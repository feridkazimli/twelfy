import serviceList from "../configs/serviceList";
import fetch, { Headers, BodyInit, HeadersInit } from 'node-fetch';
import builder from 'xmlbuilder';

export interface IParams {
    key: string
    value: string | number
}

export type Methods = 'GET' | 'POST';

export enum ContentType {
    JSON = 'application/json',
    XML = 'application/xml'
}

export type RequestOptions = {
    serviceKey: string,
    params?: IParams[],
    type?: Methods,
    body?: string | { [name: string]: Object; },
    headers?: {
        contentType: ContentType
    }
};

export class ServiceFetch {
    link: string;
    method: Methods;
    meta?: HeadersInit | undefined;
    body?: BodyInit | undefined;

    static async GET({ serviceKey, params = [], headers }: RequestOptions) {
        const sf = new ServiceFetch();
        const tst = await sf.setType('GET')
            .setUrl(serviceKey)
            .setParams(params)
            .setHeaders({ ...headers })
            .run()
    }

    static async REQUEST({ serviceKey, type = 'POST', params = [], headers, body = '' }: RequestOptions) {
        const sf = new ServiceFetch();
        const tst = await sf.setType(type)
            .setHeaders({ ...headers })
            .setUrl(serviceKey)
            .setParams(params)
            .setBody(body, headers?.contentType)
            .run();
    }

    setBody(body: string | { [name: string]: Object; }, type: ContentType = ContentType.JSON ) {
        if(type === ContentType.JSON) {
            this.body = JSON.stringify(body)
        } else if(type === ContentType.XML) {
            this.body = builder.create(body).end({pretty:true})
        }
        return this;
    }

    setType(method: Methods) {
        this.method = method;
        return this;
    }

    setUrl(serviceKey: string) {
        this.link = serviceList[serviceKey];
        return this;
    }

    setParams(params: IParams[]) {
        this.link = params.reduce((prev: string, current: IParams): string => {
            prev = prev.replace(`:${current.key}`, String(current.value));
            return prev;
        }, this.link);

        return this;
    }

    setHeaders({ contentType = ContentType.JSON }: {
        contentType?: ContentType
    }) {
        this.meta = {
            'Content-Type': contentType,
            'Accept': '*/*'
        }
        return this;
    }

    async run() {
        const response = await fetch(this.link, {
            method: this.method,
            headers: this.meta,
            body: this.body 
        });
        
        const data = await response.text();
    }
}