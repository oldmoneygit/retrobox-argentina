import fs from 'fs'
import path from 'path'

const INTER_PATH = 'C:\\Users\\PC\\Documents\\Retrobox\\RETRO\\Serie A\\Inter de Milán'

console.log('📁 ESTRUTURA DO INTER DE MILÁN\n')
console.log(`Caminho: ${INTER_PATH}\n`)

try {
  if (!fs.existsSync(INTER_PATH)) {
    console.log('❌ Pasta do Inter não existe!')
    process.exit(1)
  }

  const products = fs.readdirSync(INTER_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  console.log(`Total de produtos: ${products.length}\n`)

  products.forEach(product => {
    const productPath = path.join(INTER_PATH, product)
    const images = fs.readdirSync(productPath).filter(file =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    )
    console.log(`${product}/ (${images.length} imagens)`)
    if (images.length > 0) {
      console.log(`   └─ ${images[0]}`)
    }
  })
} catch (error) {
  console.error('❌ Erro:', error.message)
}
