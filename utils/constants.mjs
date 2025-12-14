import process from 'node:process'

const os = process.platform

let osPath = '\\'
if (os === 'linux' || os === 'darwin') {
    osPath = '/'
}

export {osPath}
