import fs from 'fs'

const catalogPath = 'C:\\Users\\PC\\Documents\\Retrobox\\RETRO\\catalogo_produtos.json'
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'))

const inter = catalog.filter(p => p.time === 'Inter de Milán')

console.log('Total Inter de Milán no catálogo:', inter.length)
console.log()

inter.forEach(p => {
  console.log(`${p.id}. ${p.nome_completo}`)
  console.log(`   Pasta: ${p.pasta_album}`)
})
