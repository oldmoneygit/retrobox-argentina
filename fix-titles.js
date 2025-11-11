const fs = require('fs');
const path = require('path');

// Correções a serem feitas
const fixes = [
  {
    file: 'src/components/blackfriday/HowItWorksPackLoco.jsx',
    find: '<h2 className="text-3xl md:text-5xl font-black text-white mb-3 md:mb-4 px-4">\n            ¿Cómo Funciona el <span className="text-orange-500">PACK LOCO?</span>\n          </h2>',
    replace: '<h2 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 px-4 text-white">\n            ¿Cómo Funciona el PACK LOCO?\n          </h2>'
  },
  {
    file: 'src/components/blackfriday/BlackFridayPopup.jsx',
    find: '<h2 className="text-2xl md:text-3xl font-black text-center uppercase mb-2">\n                  <span className="text-yellow-400">🔥 PACK LOCO</span>\n                  <br />\n                  <span className="text-white">BLACK FRIDAY</span>\n                </h2>',
    replace: '<h2 className="text-2xl md:text-3xl font-black text-center uppercase mb-2 text-yellow-400">\n                  🔥 PACK LOCO\n                  <br />\n                  BLACK FRIDAY\n                </h2>'
  }
];

console.log('🔧 Iniciando correções de títulos...\n');

let successCount = 0;
let errorCount = 0;

fixes.forEach((fix, index) => {
  const filePath = path.join(__dirname, fix.file);

  try {
    // Ler arquivo
    let content = fs.readFileSync(filePath, 'utf8');

    // Verificar se o texto a ser substituído existe
    if (content.includes(fix.find)) {
      // Fazer substituição
      content = content.replace(fix.find, fix.replace);

      // Salvar arquivo
      fs.writeFileSync(filePath, content, 'utf8');

      console.log(`✅ [${index + 1}/${fixes.length}] ${fix.file} - CORRIGIDO`);
      successCount++;
    } else {
      console.log(`⚠️  [${index + 1}/${fixes.length}] ${fix.file} - JÁ CORRIGIDO ou TEXTO NÃO ENCONTRADO`);
    }
  } catch (error) {
    console.log(`❌ [${index + 1}/${fixes.length}] ${fix.file} - ERRO: ${error.message}`);
    errorCount++;
  }
});

console.log('\n📊 Resumo:');
console.log(`   ✅ Corrigidos: ${successCount}`);
console.log(`   ⚠️  Já ok/não encontrado: ${fixes.length - successCount - errorCount}`);
console.log(`   ❌ Erros: ${errorCount}`);
console.log('\n✨ Processo finalizado!\n');
