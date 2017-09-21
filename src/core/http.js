import 'whatwg-fetch'
import config from './config'
import { Message } from 'element-ui';

function compositeUrl(url, params = {}) {
    var keys = Object.keys(params)
    if (keys.length) {
        url += '?'
        var k = 0
        for (; k < keys.length - 1; k++) {
            url += keys[k] + '=' + params[keys[k]] + '&'
        }
        url += keys[k] + '=' + params[keys[k]]
    }
    return url
}

function getUrl(url) {
    /*if (!/^http/.test(url)) {
        url = url[0] === '/' ? url : '/' + url
        url = config.apiBaseUrl + url
    }*/
    return config.apiBaseUrl + url
}

async function parseResponse(resp) {
    var type = resp.headers.get('Content-Type')
    if (/text\/html/.test(type)) {
        return await resp.text()
    } else if (/application\/json/.test(type)) {
        return await resp.json()
    } else {
        return await resp.blob()
    }
}

function throwError(data) {
    if (data.success) return
    httpErrorCb(data.errCode)
    //alert(data.errMsg || data.message)
    var err = new Error(data.message || data.errMsg)
    err.name = data.status || data.errCode
    throw err
}

function throwMsg(data) {
    if (data.success) return
    Message(data.msg)
}

async function fetch(url, options = {}) {
    url = getUrl(url)
    options.headers = Object.assign({
            token: window.localStorage.username
    }, options.headers)
    options.headers['Content-Type'] = 'application/json'

    console.log(options)
    var resp = await window.fetch(url, options)
    var data = await parseResponse(resp)
    throwMsg(data)
    return data
}

export async function get(url, params = {}) {
    return await fetch(compositeUrl(url, params))
}

export async function post(url, options = {}) {
    options = Object.assign({
        method: 'POST',
        headers: {}
    }, options)
    options.body = typeof options.body == 'string' ? options.body : JSON.stringify(options.body)

    return await fetch(url, options)
}

export async function put(url, options = {}) {
    options = Object.assign({
        method: 'PUT',
        headers: {}
    }, options)
    options.body = typeof options.body == 'string' ? options.body : JSON.stringify(options.body)

    return await fetch(url, options)
}
export async function patch(url, options = {}) {
    options = Object.assign({
        method: 'PATCH',
        headers: {}
    }, options)
    options.body = typeof options.body == 'string' ? options.body : JSON.stringify(options.body)
    return await fetch(url, options)
}
export async function del(url, options = {}) {
    options = Object.assign({
        method: 'DELETE',
        headers: {}
    }, options)
    options.body = typeof options.body == 'string' ? options.body : JSON.stringify(options.body)
    return await fetch(url, options)
}


export default {
    get,
    post,
    put,
    patch,
    del
}