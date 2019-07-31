# encoding: utf-8

import oss2
import os
import sys

reginTest = 'auto-static-test'
reginPro = 'auto-static-pro'
access_key_id = ''
access_key_secret = ''
endpoint = 'http://oss-cn-hangzhou.aliyuncs.com'


def allFiles(path):
    res = []
    f = os.listdir(path)
    for file in f:
        nf = path + '/' + file
        if os.path.isfile(nf):
            res.append(nf)
        else:
            res = res + allFiles(nf)
    return res


def getEnv():
    res = {}
    env = open(os.path.abspath('.env'))
    for line in env.readlines():
        if not line.strip().startswith('#'):
            kv = line.split('=')
            if len(kv) == 2:
                res[kv[0]] = kv[1].strip()
    return res


def main():
    if access_key_id =='' or access_key_secret == '':
        print('注意：没有设置access_key_id或access_key_secret，无法将资源上传至OSS')
        return

    env = getEnv()
    if not env.has_key('BUILD_PATH') or not env.has_key('PUBLIC_URL') or not env['PUBLIC_URL'].startswith('http'):
        return

    publicUrl = env['PUBLIC_URL']
    buildPath = env['BUILD_PATH']

    if len(publicUrl.split('atzuche.com/')) != 2:
        return
    prefix = publicUrl.split('atzuche.com/')[1]
    if prefix == '':
        return

    isTest = len(sys.argv) > 1 and sys.argv[1] == 'test'
    auth = oss2.Auth(access_key_id, access_key_secret)
    bucket = oss2.Bucket(auth, endpoint, reginTest if isTest else reginPro)
    path = os.path.abspath('./' + buildPath)
    files = allFiles(path)

    for file in files:
        if file.endswith('index.html'):
            continue
        with open(oss2.to_unicode(file), 'rb') as f:
            of = prefix + file.replace(path, '')
            bucket.put_object(of, f)
            meta = bucket.get_object_meta(of)
            if meta:
                print('[SUCCESS] upload to oss: ' + of)
            else:
                print('[FAIL] upload to oss: ' + of)


if __name__ == '__main__':
    main()
