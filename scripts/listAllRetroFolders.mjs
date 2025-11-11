import fs from 'fs'
import path from 'path'

const RETRO_PATH = 'C:\\Users\\PC\\Documents\\Retrobox\\RETRO'

console.log('📁 TODAS AS PASTAS NO DIRETÓRIO RETRO\n')
console.log(`Caminho: ${RETRO_PATH}\n`)

try {
  // Verificar se o diretório existe
  if (!fs.existsSync(RETRO_PATH)) {
    console.log('❌ Diretório RETRO não existe!')
    process.exit(1)
  }

  const items = fs.readdirSync(RETRO_PATH, { withFileTypes: true })
  const folders = items.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
  const files = items.filter(dirent => !dirent.isDirectory()).map(dirent => dirent.name)

  console.log(`Total de pastas: ${folders.length}`)
  console.log(`Total de arquivos: ${files.length}\n`)

  if (folders.length > 0) {
    console.log('📂 PASTAS (primeiras 20):\n')
    folders.slice(0, 20).forEach(folder => {
      console.log(`   ${folder}`)
    })
  }

  if (files.length > 0) {
    console.log('\n📄 ARQUIVOS (primeiros 10):\n')
    files.slice(0, 10).forEach(file => {
      console.log(`   ${file}`)
    })
  }

  // Se tiver uma pasta "Serie A" ou "La Liga", vamos ver o que tem dentro
  const leagueFolders = folders.filter(f =>
    f.includes('Serie A') ||
    f.includes('La Liga') ||
    f.includes('Bundesliga') ||
    f.includes('Premier') ||
    f.includes('Primera')
  )

  if (leagueFolders.length > 0) {
    console.log('\n\n📁 ESTRUTURA DE LIGAS:\n')
    leagueFolders.forEach(league => {
      const leaguePath = path.join(RETRO_PATH, league)
      const teams = fs.readdirSync(leaguePath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
      console.log(`\n${league}/ (${teams.length} times)`)
      teams.slice(0, 5).forEach(team => {
        console.log(`   └─ ${team}`)
      })
      if (teams.length > 5) {
        console.log(`   ... e mais ${teams.length - 5} times`)
      }
    })
  }
} catch (error) {
  console.error('❌ Erro:', error.message)
}
