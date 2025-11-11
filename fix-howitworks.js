const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/blackfriday/HowItWorksPackLoco.jsx');

console.log('🔧 Corrigindo HowItWorksPackLoco.jsx...\n');

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Substituir o span problemático
  const oldText = '¿Cómo Funciona el <span className="text-orange-500">PACK LOCO?</span>';
  const newText = '¿Cómo Funciona el PACK LOCO?';
  
  if (content.includes(oldText)) {
    content = content.replace(oldText, newText);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Arquivo corrigido com sucesso!');
  } else {
    console.log('⚠️  Texto não encontrado - arquivo já pode estar correto');
  }
} catch (error) {
  console.log('❌ Erro:', error.message);
}
