#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

const spawn = require('react-dev-utils/crossSpawn')
const https = require('https')
const path = require('path')
const fs = require('fs')
const args = process.argv.slice(2)

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'eject' || x === 'start' || x === 'test'
)
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []


let updateSlotContent = new Promise(resolve => {
  if (script !== 'build' && script !== 'start') {
    resolve()
  }
  
  let env = 'dev'
  if (process.env.REACT_APP_PACKAGE === 'dev') {
    env = 'dev'
  } else {
    env = 'prod'
  }

  getSlotContent(env + '.head').then(function(data) {
    replaceSolt('index.' + env + '.html', 'HEADSLOT', data)

    getSlotContent(env + '.body').then(function(data) {
      replaceSolt('index.' + env + '.html', 'BODYSLOT', data)
      resolve()
    }).catch(err => {
      console.log(err)
      process.exit(1)
    })

  }).catch(err => {
    console.log(err)
    process.exit(1)
  })
})

function getSlotContent(name) {
  return new Promise(function(resolve, reject) {
    const url = 'https://m.atzuche.com/m/__slot/' + name + '.html'
    const req = https.get(url, function(res) {
      let resData = ''
      res.on('data', function(data) {
        resData += data
      })
      res.on('end', function() {
        req.end()
        resolve(resData)
      })
    })
    req.on('error', function(err) {
      req.end()
      reject(err)
    })
  })
}

function replaceSolt(htmlname, where, content) {
  const p = path.join(__dirname, '../../..', 'public')
  try {
    const data = fs.readFileSync(path.join(p, htmlname)).toString()
    const f = new RegExp('<!--\\s*' + where + '\\s*-->(\\d|\\D)*<!--\\s*END' + where + '\\s*-->', 'gi')
    const ndata = data.replace(f, '<!--' + where + '-->\r' + content + '\r<!--END' + where + '-->')
    fs.writeFileSync(path.join(p, htmlname), ndata)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

updateSlotContent.then(() => {
  switch (script) {
    case 'build':
    case 'eject':
    case 'start':
    case 'test': {
      const result = spawn.sync(
        'node',
        nodeArgs
          .concat(require.resolve('../scripts/' + script))
          .concat(args.slice(scriptIndex + 1)),
        { stdio: 'inherit' }
      )
      if (result.signal) {
        if (result.signal === 'SIGKILL') {
          console.log(
            'The build failed because the process exited too early. ' +
              'This probably means the system ran out of memory or someone called ' +
              '`kill -9` on the process.'
          )
        } else if (result.signal === 'SIGTERM') {
          console.log(
            'The build failed because the process exited too early. ' +
              'Someone might have called `kill` or `killall`, or the system could ' +
              'be shutting down.'
          )
        }
        process.exit(1)
      }
      process.exit(result.status)
      break
    }
    default:
      console.log('Unknown script "' + script + '".')
      console.log('Perhaps you need to update react-scripts?')
      console.log(
        'See: https://facebook.github.io/create-react-app/docs/updating-to-new-releases'
      )
      break
  }
}).catch(err => {
  console.log(err)
  process.exit(1)
})