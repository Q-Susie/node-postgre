const path = require('path')
const { extend } = require('pg-extra')
const pg = extend(require('pg'))
const { promisify } = require('util')
const index = require('../index')
const readFile = promisify(require('fs').readFile)

const conString = index.conString

var pool = new pg.Pool(conString);

function slurpSql(filePath) {
    const relativePath = '../sql/' + filePath
    const fullPath = path.join(__dirname, relativePath)
    return readFile(fullPath, 'utf8')
}

async function seed() {
    await (async () => {
        const sql = await slurpSql('schema.sql')
        console.log('-- schema.sql...')
        await pool._query(sql)
    })()

    await (async () => {
        const sql = await slurpSql('datas.sql')
        console.log('-- datas.sql...')
        await pool._query(sql)
    })()

}

seed().then(
    () => {
        console.log('-- ok')
        process.exit(0)
    },
    (err) => {
        console.error('Error:', err, err.stack)
        process.exit(1)
    }
)