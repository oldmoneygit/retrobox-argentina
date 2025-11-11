import fs from 'fs'
import path from 'path'

const RETRO_PATH = 'C:\\Users\\PC\\Documents\\Retrobox\\RETRO'

console.log('📁 PASTAS NO DIRETÓRIO RETRO\n')

try {
  const folders = fs.readdirSync(RETRO_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name =>
      name.includes('Inter') ||
      name.includes('Bayern') ||
      name.includes('Barcelona') ||
      name.includes('Boca') ||
      name.includes('River') ||
      name.includes('Independiente') ||
      name.includes('Instituto') ||
      name.includes('Real Madrid')
    )
    .sort()

  console.log(`Total de pastas relevantes: ${folders.length}\n`)

  folders.forEach(folder => {
    const folderPath = path.join(RETRO_PATH, folder)
    const images = fs.readdirSync(folderPath).filter(file =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    )
    console.log(`${folder} (${images.length} imagens)`)
  })
} catch (error) {
  console.error('❌ Erro:', error.message)
}
