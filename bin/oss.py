# encoding: utf-8

import os
import sys
import oss2


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


def uploadToOSS(isTest=True):
    env = getEnv()
    reginTest = 'auto-static-test'
    reginPro = 'auto-static-pro'
    endpoint = 'http://oss-cn-hangzhou.aliyuncs.com'

    if not 'BUILD_PATH' in env or not 'PUBLIC_URL' in env or not env['PUBLIC_URL'].startswith('http'):
        return

    access_key_id = env['ACCESS_KEY_ID']
    access_key_secret = env['ACCESS_KEY_SECRET']

    if access_key_id == '' or access_key_secret == '':
        print('注意：没有设置access_key_id或access_key_secret，无法将资源上传至OSS，请在.env文件中设置')
        return

    publicUrl = env['PUBLIC_URL']
    buildPath = env['BUILD_PATH']

    if len(publicUrl.split('atzuche.com/')) != 2:
        return
    prefix = publicUrl.split('atzuche.com/')[1]
    if prefix == '':
        return

    auth = oss2.Auth(access_key_id, access_key_secret)
    bucket = oss2.Bucket(auth, endpoint, reginTest if isTest else reginPro)
    path = os.path.abspath('./' + buildPath)
    files = allFiles(path)

    successCount = 0
    failCount = 0
    for file in files:
        if file.endswith('index.html'):
            continue
        with open(oss2.to_unicode(file), 'rb') as f:
            of = prefix + file.replace(path, '')
            bucket.put_object(of, f)
            meta = bucket.get_object_meta(of)
            if meta:
                print('[SUCCESS] upload to ' +
                      (reginTest if isTest else reginPro) + ': ' + of)
                successCount += 1
            else:
                print('[FAIL] upload to ' +
                      (reginTest if isTest else reginPro) + ': ' + of)
                failCount += 1
    print('上传成功: ' + str(successCount) + '个资源，失败: ' + str(failCount) + '个资源')


def main():
    isTest = len(sys.argv) > 1 and sys.argv[1] == 'test'
    uploadToOSS(isTest)


if __name__ == '__main__':
    main()
