let express = require('express')
let { createServer } = require('http')
let path = require('path')
let { Socket } = require('socket.io')
let toBuffer = require('qrcode')
let fetch = require('node-fetch')

function connect(tio, PORT) {
    let app = global.app = express()
    console.log(app)
    let server = global.server = createServer((__, res) => res.end("Aowwkwwk"))
    // app.use(express.static(path.join(__dirname, 'views')))

/*    tio.ev.on('connection.update', function appQR({ qr }) {
        if (qr) _qr = qr
    })

    app.use(async (req, res) => {
        res.setHeader('content-type', 'image/png')
        res.end(await toBuffer(_qr))
    })*/

    // let io = new Socket(server)
    // io.on('connection', socket => {
    //     let { unpipeEmit } = pipeEmit(tio, socket, 'conn-')
    //     socket.on('disconnect', unpipeEmit)
    // })

    server.listen(PORT, () => {
        console.log('App listened on port', PORT)
        if (opts['keepalive']) keepAlive()
    })
}

function pipeEmit(event, event2, prefix = '') {
    let old = event.emit
    event.emit = function (event, ...args) {
        old.emit(event, ...args)
        event2.emit(prefix + event, ...args)
    }
    return {
        unpipeEmit() {
            event.emit = old
        }
    }
}

function keepAlive() {
    const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    if (/(\/\/|\.)undefined\./.test(url)) return
    setInterval(() => {
        fetch(url).catch(console.error)
    }, 5 * 1000 * 60)
}


module.exports = connect
